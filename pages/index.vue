<template>
  <section>
    <p class="text-xl font-semibold text-primary-400" v-if="isAuthenticated">
      Welcome, {{ companyName }}&quot;s Dashboard! {{ firstName }}, {{ lastName }}
    </p>
    <p class="text-lg font-medium text-primary-400">
      <span class="font-semibold">Please <NuxtLink
              to="/login"
              active-class="active"
              class="uppercase text-teal-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Login</NuxtLink
            ></span> to start using our services </p>
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
