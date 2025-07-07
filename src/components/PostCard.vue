<script setup>
import { AppState } from '@/AppState.js';
import { Post } from '@/models/Post.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const props = defineProps({
    postProp: { type: Post, required: true }
})

const account = computed(() => AppState.account)

async function likePost(postId) {
    logger.log('like Post 👍📝', postId)
    try {
        await postsService.likePost(postId)
    } catch (error) {
        logger.error('could not update likes', error);
        Pop.error(error);
    }
}


async function deleteCar() {
    const confirmed = await Pop.confirm(`Are you sure you want to delete ${props.postProp.body}`)

    if (!confirmed) {
        return
    }
    try {
        await postsService.deletePost(props.postProp.id)
    } catch (error) {
        Pop.error(error);
        logger.error('Could not delete post! 🚫💥📃', error)
    }
}

</script>


<template>

    <div class="post card mb-3">
        <div class="card-body">
            <h3>{{ postProp.body }}</h3>
            <img v-if="postProp.imgUrl" :src="postProp.imgUrl" alt="" class="imgUrl">
            <p>{{ postProp.creatorName }}</p>
            <RouterLink :to="{ name: 'PostDetails', params: { id: postProp.creatorId } }">
                <img :src="postProp.creatorPicture" alt="Creator Image" class="creator-img selectable">
            </RouterLink>
            <!-- <RouterLink :to="{ name: 'Profile Page', params: { profileId: post.profileId } }">
              <img :src="post.creatorPicture" alt="Creator" />
            </RouterLink> -->
            <!-- <span>Profile Page </span> -->
            <div>
                <p>{{ postProp.likes }}<i type="button" class="mdi mdi-thumb-up-outline p-1"
                        @click="likePost(postProp.id)"></i></p>
                <p v-if="postProp.likes.length" class="p-1">{{ postProp.likes.length }}</p>
            </div>
            <p>{{ postProp.createdAtDateString }}</p>
            <button @click="deleteCar()" v-if="account?.id == postProp.creatorId" class="btn btn-outline-primary"
                title="Delete Car" type="button">
                <span class="mdi mdi-delete"></span>

            </button>
            <!-- /**need router to the profile page using params */ -->
        </div>
    </div>
</template>


<style lang="scss" scoped>
.creator-img {
    width: 50px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
}

.imgUrl {
    width: 300px;
    aspect-ratio: 1/1;
    object-fit: cover;
}
</style>