<script setup>
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { AuthService } from '../services/AuthService.js';


const account = computed(() => AppState.account)


const editablePostData = ref({
    creatorName: '',
    creatorPicture: '',
    // createdAt: new Date().toLocaleDateString(),
    body: '',
    imgUrl: '',
})



const submitPost = async () => {
    // cannot create a post until you log in
    logger.log('get account')
    if (account.value) {
        try {
            await postsService.createPost(editablePostData.value)

            editablePostData.value = {
                creatorName: '',
                creatorPicture: '',
                // createdAt: new Date().toLocaleDateString(),
                body: '',
                imgUrl: '',
            }
        }
        catch (error) {
            Pop.error(error);
            logger.error('could not create post 🚫📃', error)
        }
    }
    else {
        logger.log('redirect')
        AuthService.loginWithRedirect()
    }
}

</script>


<template>
    <div class="post-form mb-3">

        <h4>Create a post...</h4>
        <div class="card-body">
            <form @submit.prevent="submitPost()">
                <div class="mb-3">
                    <label for="bodyTextarea" class="form-label"></label>
                    <textarea v-model="editablePostData.body" name="form-control" id="bodyTextarea" rows="3"
                        placeholder="Share your thoughts..." style="width: 100%;"></textarea>
                </div>
                <div class="mb-3">
                    <label for="imageUrl">Image or Movie</label>
                    <input v-model="editablePostData.imgUrl" type="url" class="form-control" id="imageUrl"
                        placeholder="Enter url here..." required>
                </div>
                <div>
                    <button type="submit" class="btn btn-outline-primary" data-bs-toggle="form"
                        data-bs-target="#postform">Submit</button>
                </div>
            </form>
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