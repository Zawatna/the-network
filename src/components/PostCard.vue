<script setup>
import { Post } from '@/models/Post.js';

defineProps({
    postProp: { type: Post, required: true }
})
</script>


<template>

    <div class="post card">
        <div class="card-body ">
            <h3>{{ postProp.body }}</h3>
            <img v-if="postProp.imgUrl" :src="postProp.imgUrl" alt="" class="imgUrl">
            <p>{{ postProp.creatorName }}</p>
            <img :src="postProp.creatorPicture" alt="Creator Image" class="creator-img">
            <p>Likes {{ postProp.likes }} <i class="mdi mdi-thumb-up-outline"></i></p>
            <p>{{ postProp.createdAt }}</p>
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