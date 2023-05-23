import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { useReportInfoStore } from '~/store/report-info';
export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore();
  const authStoreRef = storeToRefs(authStore);
  const reportStore = useReportInfoStore();
  authStore
    .validateToken()
    .then((s) => {})
    .catch((err) => console.error(err));
  if (!authStoreRef.getIsValidToken) {
    reportStore.clearReportInfo();
    return authStore.logout();
  }
});
