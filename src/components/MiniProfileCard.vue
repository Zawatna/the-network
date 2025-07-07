<script setup>
import { onMounted } from 'vue';




defineProps({
    miniProfileProp: { type: Object, required: true }
})

</script>


<template>
    <div class="mini profile card">
        <div class="card-body">
            <h3>Mini Profile Card</h3>
            <img v-if="miniProfileProp.picture" :src="miniProfileProp.picture" alt="Creator Image" class="creator-img">
            <p>{{ miniProfileProp.creatorName }}</p>
            <p class="mdi mdi-facebook">{{ miniProfileProp.linkedIn }}</p>
            <p class="mdi mdi-linkedin">{{ miniProfileProp.gitHub }}</p>

        </div>
    </div>
</template>


<style lang="scss" scoped>
.creator-img {
    width: 75px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
}

// .mini-profile-card {
//     margin-bottom: 1rem;
//     border-radius: 8px;
//     overflow: hidden;
//     transition: all;

//     &:hover {
//         filter: brightness(1.2);
//         transform: scale(1.1);
//     }
// <!-- // }</style> -->