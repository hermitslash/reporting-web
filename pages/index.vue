<template>
  <section>
    <p class="text-2xl font-bold">
      Welcome to the dashboard! {{ lastName }}, {{ firstName }}
    </p>
    <ReportInformation />
  </section>
</template>
<script setup>
import { useAuthStore } from '~/store/auth';
import { useReportInfoStore } from '~/store/report-info';
definePageMeta({
  middleware: 'auth',
});

const authStore = useAuthStore();
const reportDataStore = useReportInfoStore();
const userInfo = authStore.getUserInfo;
const lastName = userInfo.lastName;
const firstName = userInfo.firstName;
const initiateReportInfo = () => reportDataStore.initiateReportData();
</script>
