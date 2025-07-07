<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { postsService } from '@/services/PostsService.js';
import { AppState } from '@/AppState.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import PostCard from '@/components/PostCard.vue';
import { vladdiesService } from '@/services/VladdiesService.js';
import VladdyCard from '@/components/VladdyCard.vue';
import PostForm from '@/components/PostForm.vue';
import { useRoute } from 'vue-router';
import { profilesService } from '@/services/ProfilesService.js';
import ProfileCard from '@/components/ProfileCard.vue';
import { Account } from '@/models/Account.js';
import MiniProfileCard from '@/components/MiniProfileCard.vue';


const posts = computed(() => AppState.posts)
const vladdies = computed(() => AppState.vladdies)
// const miniProfile = computed(() => AppState.profile)
const route = useRoute()
const userId = ref(null)
const profile = computed(() => AppState.activeProfile)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)
const account = computed(() => AppState.account)

// const account = computed(() => AppState.account)
// const post = computed(() => AppState.activePost)

onMounted(() => {
    getVladdies();
    userId.value = route.params.id;
    getPostsByUserId();
    logger.log('post', userId.value);
    getProfileById();
})

watch(route, () => {
    getProfileById();
    getPostsByUserId();
})

// async function changePage(pageNumber) {
//   try {
//     await postsService.changePostsPage(pageNumber)
//   } catch (error) {
//     logger.error('could not get next page posts', error)
//     Pop.error(error);
//   }

async function getProfileById() {
    try {
        await profilesService.getProfileById(route.params.id)
    }
    catch (error) {
        Pop.toast('Could not get profile', 'error');
        logger.error(error)
    }
}

// async function getPostById() {
//     try {
//         // logger.log('🔍🃏🪪', route, route.params.postId)
//         // const postIdFromRouteParams = route.params.postId
//         // const postId = route.params.postId
//         await postsService.getPostById(route.params.creatorId)
//     }
//     catch (error) {
//         logger.error(error);
//         Pop.toast(error, 'could not get postsById 🚫🪪');
//     }
// }

// TODO this function mimics to home page changePage exactly, so we get older/newer of home page
// TODO we need a new service function specifically for changing a 'profile' page, so that it gets the older/newer for the profile
// NOTE this **service function** needs to take in the profile id, and the new page number
async function changePage(pageNumber) {
    try {
        await postsService.changePostsPage(pageNumber)
    } catch (error) {
        logger.error('could not get next page posts', error)
        Pop.error(error);
    }
}
async function getPostsByUserId() {
    logger.log('getting posts by user id🔍📃', userId.value)
    try {
        await postsService.getPostsByUserId(userId.value)
    }
    catch (error) {

        logger.error('could not get posts', error)
        Pop.error(error);
    }
}


async function getVladdies() {
    try {
        await vladdiesService.getVladdies()
    }
    catch (error) {
        Pop.error(error);
    }
}


</script>

<template>
    <section class="container">
        <div class="container-fluid">
            <div class="row">
                <div class="col-3">
                    <!-- this is the mini profile -->
                    <div v-if="profile" class="row container">
                        <div class="card-body">
                            <div class="mx-1 my-5">
                                <img class="fluid mt-1 creator-img-mini" :src="profile.picture" alt="Creator Image">
                            </div>
                            <div>
                                <b>
                                    {{ profile.name }}
                                </b>

                            </div>
                            <div>
                                {{ profile.graduated ? 'Graduated' : '' }}
                            </div>
                            <div>
                                <small>
                                    {{ profile.class }}
                                </small>
                            </div>
                            <div>
                                <a v-if="profile.linkedIn" href="profile.linkedIn" target="_blank"><i
                                        class="mdi mdi-linkedin fs-4"></i>{{ profile.linkedIn }} </a>
                                <a v-if="profile.gitHub" href="profile.gitHub" target="_blank"><i
                                        class="mdi mdi-github fs-4"></i></a>
                                {{ profile.gitHub }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 my-3">
                    <div v-if="profile" class="row">
                        <div class="card-body">
                            <img class="fluid profile-cover" :src="profile.coverImg" alt="">
                            <div class="mx-1 my-1">
                                <img class="fluid creator-img" :src="profile.picture" alt="Creator Image">
                                {{ profile.name }}
                            </div>
                            <div>
                                {{ profile.class }} {{ profile.graduated ? 'Graduated' : '' }}
                            </div>
                            <div class="card-body text-start">
                                <p>{{ profile.bio }} </p>
                            </div>
                            <div>
                                <a v-if="profile.linkedIn" href="profile.linkedIn" target="_blank"><i
                                        class="mdi mdi-linkedin fs-4"></i>{{ profile.linkedIn }} </a>
                                <a v-if="profile.gitHub" href="profile.gitHub" target="_blank"><i
                                        class="mdi mdi-github fs-4"></i></a>
                                {{ profile.gitHub }}
                            </div>
                        </div>
                    </div>
                    <!-- This is the post creator form -->
                    <div>
                        <PostForm v-if="profile?.id == account?.id && account" />
                    </div>
                    <div class="row mt-2">
                        <button :disabled="currentPage == 1" @click="changePage(currentPage - 1)"
                            class="col-4 btn btn-outline-primary">
                            <i class="mdi mdi-arrow-left"></i>
                            newer
                        </button>
                        <div class="col-4 text-center">
                            Page {{ currentPage }} of {{ totalPages }}
                        </div>
                        <button @click="changePage(currentPage + 1)" class="col-4 btn btn-outline-primary">
                            <i class="mdi mdi-arrow-right"></i>
                            older
                        </button>
                    </div>
                    <div v-for="post in posts" :key="post.id" class="mt-3">
                        <PostCard :postProp="post" />
                    </div>
                </div>
                <div class="col-3 my-5">
                    <div v-for="vladdy in vladdies" :key="vladdy.id">
                        <VladdyCard :vladdyProp="vladdy" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.profile-cover {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.creator-img {
    width: 50px;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
}

.creator-img-mini {
    width: 100px;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
}
</style>