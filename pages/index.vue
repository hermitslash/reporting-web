<template>
  <section>
    <p class="text-xl font-semibold text-primary-400" v-if="isAuthenticated">
      Welcome, {{ companyName }}&quot;s Dashboard! {{ firstName }}, {{ lastName }}
    </p>
    <p class="text-lg font-medium text-primary-400"><span class="font-semibold">After login</span> Please head to the services section by clicking on the <span class="text-primary-300">Services</span> link to Add/View/Download report information.</p>
    <p class="text-lg font-medium text-primary-400">From the services section you will also be able to read the end of day transaction information by providing a valid date.</p>
  </section>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
definePageMeta({
  middleware: 'auth',
});
const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);
const isAuthenticated = authStoreRefs.getIsValidToken;
const userInfo = authStore.getUserInfo;
const lastName = userInfo.lastName;
const firstName = userInfo.firstName;
const companyName = userInfo.companyName;

</script>
