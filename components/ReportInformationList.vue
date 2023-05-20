<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="pb-4 bg-white dark:bg-gray-900">
          <section class="flex flex-row space-x-3">
            <NuxtLink to="/reportInfos/new" class="text-lg font-medium text-primary-600 dark:text-primary-500 hover:underline">Add Report Info</NuxtLink>
            <NuxtLink to="/reportInfos/eodt" class="text-lg font-medium text-primary-600 dark:text-primary-500 hover:underline">End of day transactions</NuxtLink>
          </section>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <!-- <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" class="sr-only"
                  >checkbox</label
                >
              </div>
            </th> -->
            <!-- <th scope="col" class="px-6 py-3"></th> -->
            <th scope="col" class="px-6 py-3">Invoice No</th>
            <th scope="col" class="px-6 py-3">Gst Amount</th>
            <th scope="col" class="px-6 py-3">Total Amount</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="rInfo in reportInfos"
          >
            <!-- <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td> -->
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ rInfo.invoiceNo }}
            </th>
            <td class="px-6 py-4">
              {{
                rInfo.applicableGsts
                  .map((ag) => ag.amountInfo)
                  .reduce((a, b) => a + b)
              }}
            </td>
            <td class="px-6 py-4">{{ rInfo.amountChargeable }}</td>
            <td class="px-6 py-4">
              <NuxtLink
                :href="'/reportInfos/' + encodeURIComponent(rInfo.invoiceNo)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                View
              </NuxtLink>
              <button
                @click="downloadReport(rInfo.invoiceNo)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useReportInfoStore } from '~/store/report-info';
const reportInfoStore = useReportInfoStore();
const reportInfoStoreRefs = storeToRefs(reportInfoStore);
reportInfoStore.findAllReportInfos();
const reportInfos = reportInfoStoreRefs.reportInfos;
const downloadReport = (invoiceNo) =>
   reportInfoStore.downloadReportInfoData(invoiceNo);
</script>
