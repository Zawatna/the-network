<script setup>

defineProps({
    profileProp: { type: Object, required: true }
})

</script>


<template>
    <div class="profile card">
        <div class="card-body">
            <!-- <img v-if="profileProp.coverImg" :src="profileProp.coverImg" alt="" class="coverImg"> -->
            <h3>Profile Card</h3>
            <img :src="profileProp.creatorPicture" alt="Creator Image" class="creator-img">
            <p>{{ profileProp.creatorName }} {{ profileProp.class }}</p>
            <p>{{ profileProp.bio }}</p>
            <!-- TODO github link is not showing up when it is filled out -->
            <!-- TODO no resume link if filled out -->
            <!-- TODO no 'graduated' status showing -->
            <p><i class="mdi mdi-github"></i>{{ profileProp.gitHub }} | <i class="mdi mdi-linkedin"></i> {{
                profileProp.linkedIn }}</p>
            <p>Likes {{ profileProp.likes }} <i class="mdi mdi-thumb-up-outline"></i></p>
            <p>{{ profileProp.createdAt }}</p>
            <!-- /**need router to the profile page using params */ -->

        </div>
    </div>
</template>


<style lang="scss" scoped></style>