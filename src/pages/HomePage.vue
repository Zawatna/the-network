<script setup>
import { onMounted, computed } from 'vue';
import { postsService } from '@/services/PostsService.js';
import { AppState } from '@/AppState.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import PostCard from '@/components/PostCard.vue';
import { vladdiesService } from '@/services/VladdiesService.js';
import VladdyCard from '@/components/VladdyCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import PostForm from '@/components/PostForm.vue';

const posts = computed(() => AppState.posts)
const vladdies = computed(() => AppState.vladdies)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)
const currentSearch = computed(() => AppState.currentSearch)

onMounted(() => {
  getPosts();
  getVladdies();
})

logger.log('posters', posts)

async function changePage(pageNumber) {
  try {
    if (currentSearch.value) {
      logger.log('search query', currentSearch.value);
      await postsService.changeSearchPage(pageNumber, currentSearch.value)
    } else {
      await postsService.changePostsPage(pageNumber)
    }
  } catch (error) {
    logger.error('could not get next page posts', error)
    Pop.error(error);
  }

}

async function getPosts() {
  logger.log('getting posts🔍📃')
  try {
    await postsService.getPosts()
  }
  catch (error) {
    logger.error('could not get posts', error)
    Pop.error(error);
  }
}

async function getVladdies() {
  logger.log('getting Vladdies 🃏🃏')
  try {
    await vladdiesService.getVladdies()
  }
  catch (error) {
    Pop.error(error);
  }
}

// async function getAcountDetails() {
//   console.log('getting account details')
// }

</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-12 mt-3 p-0">

        <SearchBar />
      </div>
    </div>
    <div class="row my-2">
      <button :disabled="currentPage == 1" @click="changePage(currentPage - 1)" class="col-4 btn btn-outline-primary">
        <i class="mdi mdi-arrow-left"></i>
        newer
      </button>
      <div class="col-4 text-center">
        Page {{ currentPage }} of {{ totalPages }}
        <!-- <span>{{ currentSearch }}</span> -->
      </div>
      <button :disabled="currentPage == totalPages" @click="changePage(currentPage + 1)"
        class="col-4 btn btn-outline-primary">
        <i class="mdi mdi-arrow-right"></i>
        older
      </button>
    </div>
    <div class="row">
      <div class="container-fluid">
        <div class="row">


          <!--<MiniProfileCard :miniProfileProp="miniProfile" /> -->
          <!-- <RouterLink :to="{ name: 'Account' }">
              Account</RouterLink> -->


          <div class="col-md-9 my-3 p-0">
            <!-- put post form here -->
            <div>
              <PostForm />
            </div>

            <div v-for="post in posts" :key="post.id">
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
    </div>

  </section>
</template>

<style scoped lang="scss"></style>
