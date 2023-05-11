import { useAuthStore } from '~/store/auth';
import { useReportInfoStore } from '~/store/report-info';
export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore();
  const reportStore = useReportInfoStore();
  authStore
    .validateToken()
    .then((s) => {})
    .catch((err) => console.error(err));
  if (!authStore.getIsValidToken) {
    reportStore.clearReportInfo();
    return authStore.logout();
  }
});
