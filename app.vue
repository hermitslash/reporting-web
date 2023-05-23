<template>
  <div>
    <HeadNavbar />
    <LazyNuxtLoadingIndicator />
    <section class="container mx-4">
      <LazyNuxtPage />
    </section>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
import { useAuthStore } from './store/auth';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);
onMounted(() => {
  initFlowbite();
  authStore.validateToken();
  if(!authStoreRefs.getIsValidToken) {
    authStore.logout();
  }
});
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
