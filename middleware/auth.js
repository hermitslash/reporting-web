import { useAuthStore } from '~/store/auth';
import { useReportInfoStore } from '~/store/report-info';
export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore();
  const reportStore = useReportInfoStore();
  authStore
    .validateToken()
    .then((s) => console.log(authStore.getIsValidToken))
    .catch((err) => console.error(err));
  if (!authStore.getIsValidToken) {
    console.log('Clearing ReportInfos');
    reportStore.clearReportInfo();
    console.log('Logging Out');
    return authStore.logout();
  }
});
