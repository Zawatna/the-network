<script setup>
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';



const editableSearchTerm = ref('')

async function searchPosts() {
    logger.log('searching for ' + editableSearchTerm.value)
    try {
        await postsService.searchPosts(editableSearchTerm.value)
    }
    catch (error) {
        logger.log('could not search posts', error)
        Pop.error(error);
    }
}
</script>


<template>
    <section @submit.prevent="searchPosts()">
        <form class="input-group mb-3">
            <input v-model="editableSearchTerm" type="text" class="form-control" placeholder="Search posts..."
                aria-label="Enter a search term" aria-describedby="search-button">
            <button class="btn btn-outline-primary" type="submit" id="search-button">
                Search <span class="mdi mdi-magnify"></span>
            </button>
        </form>
    </section>
</template>


<style lang="scss" scoped></style>