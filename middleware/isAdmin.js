import { useAuthStore } from '~/store/auth';
import { storeToRefs } from 'pinia';
export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore();
  const authInfoFromStore = storeToRefs(authStore);
  if (
    authStore.getIsValidToken ||
    toRaw(authInfoFromStore.user.value).roles.search('ROLE_ADMIN') === -1
  )
    return navigateTo('/login');
});
