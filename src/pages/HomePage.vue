<script setup>
import { onMounted, computed } from 'vue';
import { postsService } from '@/services/PostsService.js';
import { AppState } from '@/AppState.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import PostCard from '@/components/PostCard.vue';
import { vladdiesService } from '@/services/VladdiesService.js';
import VladdyCard from '@/components/VladdyCard.vue';

const posts = computed(() => AppState.posts)
const vladdies = computed(() => AppState.vladdies)

onMounted(() => {
  getPosts();
  getVladdies();
})


async function getAcountDetails() {
  console.log('getting account details')
}


async function getPosts() {
  console.log('getting posts🔍📃')
  try {
    await postsService.getPosts()
  }
  catch (error) {
    logger.error('could not get posts', error)
    Pop.error(error);
  }
}

async function getVladdies() {
  console.log('getting Vladdies 🃏🃏')
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

    <h1>The Network</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2">
          Profile info and nav to Profile page </div>
        <div class="col-md-8 my-3">
          <div v-for="post in posts" :key="post.id">
            <PostCard :postProp="post" />

          </div>
        </div>
        <div class="col-2 my-5">
          <div v-for="vladdy in vladdies" :key="vladdy.id">
            <VladdyCard :vladdyProp="vladdy" />
          </div>
        </div>
      </div>
    </div>



  </section>
</template>

<style scoped lang="scss"></style>
