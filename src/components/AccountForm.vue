<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref, watch } from 'vue'


const account = computed(() => AppState.account)


const accountData = ref({

    name: '',
    picture: '',
    bio: '',
    linkedIn: '',
    gitHub: '',
    resume: '',
    class: '',
    coverImg: '',
})

watch(account, () => {
    logger.log(account.value);
    accountData.value.name = account.value.name
    accountData.value.picture = account.value.picture
    accountData.value.bio = account.value.bio
    accountData.value.linkedIn = account.value.linkedIn
    accountData.value.gitHub = account.value.gitHub
    accountData.value.resume = account.value.resume
    accountData.value.class = account.value.class
    accountData.value.coverImg = account.value.coverImg
}, { immediate: true })

async function saveAccount() {
    try {
        await accountService.saveAccount(accountData.value)
    }
    catch (error) {
        Pop.toast('Could not save Account', error);
        logger.error(error)
    }

}

</script>


<template>
    <form @submit.prevent="saveAccount()" class="row">
        <div class="col-4 mb-3">
            <label for="account-name">Name</label>
            <input v-model="accountData.name" type="text" id="account-name" name="account-name" class="form-control"
                required>
        </div>
        <div class="col-8 mb-3">
            <label for="account-picture">Picture url</label>
            <input v-model="accountData.picture" type="text" id="account-picture" name="account-picture"
                class="form-control" required>
        </div>
        <div class="col-12 mb-3">
            <label for="account-bio">Bio</label>
            <textarea v-model="accountData.bio" name="account-bio" id="account-bio" class="form-control"
                rows="4"></textarea>
        </div>
        <div class="col-6 mb-3">
            <label for="account-linkedIn">linkedIn url</label>
            <input v-model="accountData.linkedIn" type="text" id="account-linkedIn" name="account-linkedIn"
                class="form-control">
        </div>
        <div class="col-6 mb-3">
            <label for="account-gitHub">gitHub url</label>
            <input v-model="accountData.gitHub" type="text" id="account-gitHub" name="account-gitHub"
                class="form-control">
        </div>
        <div class="col-6 mb-3">
            <label for="account-resume">Resume</label>
            <input v-model="accountData.resume" type="text" id="account-resume" name="account-resume"
                class="form-control">
        </div>
        <div class="col-6 mb-3">
            <label for="account-class">Class</label>
            <input v-model="accountData.class" type="text" id="account-class" name="account-class" class="form-control">
        </div>
        <div class="col-12 mb-3">
            <label for="account-coverImg">Cover Image url</label>
            <input v-model="accountData.coverImg" type="text" id="account-coverImg" name="account-coverImg"
                class="form-control">
        </div>
        <div class="mb-3 text-end">
            <button class="btn btn-primary text-light p-2 px-5">save</button>
        </div>
    </form>

</template>


<style lang="scss" scoped></style>