<script setup>

defineProps({
    vladdyProp: { type: Object, required: true }
})

</script>


<template>
    <div class="vladdy card mb-3">
        <div class="card-body">
            <img :src="vladdyProp.tall" alt="" class="img-fluid">

        </div>
    </div>
</template>


<style lang="scss" scoped>
.imgUrl {
    width: 100px;
    object-fit: cover;
}
</style>