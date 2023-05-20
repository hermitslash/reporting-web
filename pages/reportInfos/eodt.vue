<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        End of day transactions
      </h1>
      <div
        v-if="currDate.endOfDayTransc"
        class="p-4 mb-4 text-xl text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 font-light"
        role="alert"
      >
        <p>Amount Info: {{ currDate.endOfDayTransc.amountInfo }}</p>
      </div>
      <p
        v-if="currDate.todayStr"
        class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
      >
        Selected date: {{ currDate.today }}
      </p>
      <div
        class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
      >
      <FormKit type="date" v-model="currDate.today" />
        <button
          @click="eodts"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
        End of day transactions
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReportInfoStore } from '~/store/report-info';
import { toast } from 'vue3-toastify';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
definePageMeta({
  middleware: 'auth',
});
const reportInfoStore = useReportInfoStore();
const reportInfoStoreRefs = storeToRefs(reportInfoStore);
const currDate = reactive({
  today: '',
  endOfDayTransc: null,
});
const eodts = async () => {
  if (currDate.today.length == 0 || dayjs(currDate.today).isAfter(dayjs())) {
    currDate.endOfDayTransc = null;
    toast.warning('Please select a valid date!');
  } else {
    await reportInfoStore.findEndOfDayTransaction(currDate.today);
    currDate.endOfDayTransc = reportInfoStoreRefs.getEndOfDayTransaction;
    if (currDate.endOfDayTransc.amountInfo == 0) {
      currDate.endOfDayTransc = null;
      toast.warning('No information for selected date.');
    }
  }
};
</script>
