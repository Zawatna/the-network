<script setup>

defineProps({
    vladdyProp: { type: Object, required: true }
})

</script>


<template>
    <div class="vladdy card">
        <div class="card-body">
            <img :src="vladdyProp.tall" alt="">

        </div>
    </div>
</template>


<style lang="scss" scoped></style>