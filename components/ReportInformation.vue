<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
        <h2
          class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white"
        >
          ReportInfo InvoiceNO:
          <span class="font-extrabold">{{ invoiceNo }}</span>
        </h2>

        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3">HSN/SAC Code</th>
                <th scope="col" class="px-6 py-3">Units</th>
                <th scope="col" class="px-6 py-3">Amount Per Item</th>
                <th scope="col" class="px-6 py-3">GST Amount</th>
                <th scope="col" class="px-6 py-3">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="(particular, index) in particulars"
                :key="index"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ particular.descriptionOfGoodsOrService }}
                </th>
                <td class="px-6 py-4">
                  {{ particular.hsnSacCode }}
                </td>
                <td class="px-6 py-4">
                  {{ particular.units }}
                </td>
                <td class="px-6 py-4">
                  {{ toRupee(particular.unitAmountInfo) + ' ' }}
                  {{ particular.unitAmountSummary }}
                </td>
                <td class="px-6 py-4">
                  {{ toRupee(particular.gstAmount) }}
                </td>
                <td class="px-6 py-4">
                  {{ toRupee(particular.amountInfo) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-row">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3">Rate</th>
                <th scope="col" class="px-6 py-3">GST Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="(gst, index) in gstAmounts"
                :key="index"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ gst.category }}
                </th>
                <td class="px-6 py-4">
                  {{ gst.percentageApplicable }}
                </td>
                <td class="px-6 py-4">{{ toRupee(gst.amountInfo) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-col">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  GST Amount
                </th>
                <td class="px-6 py-4">
                  {{
                    toRupee(
                      reportInfoById.applicableGsts.reduce(
                        (a, b) => a.amountInfo + b.amountInfo
                      )
                    )
                  }}
                </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Total Amount
                </th>
                <td class="px-6 py-4">
                  {{ toRupee(reportInfoById.amountChargeable) }}
                </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bank Information
                </th>
                <td class="px-6 py-4">
                  <p class="font-light">
                    <span class="font-medium">Bank Name:</span>
                    {{ reportInfoById.bankName }}
                    <span class="font-medium">Branch:</span>
                    {{ reportInfoById.branchName }}
                    <span class="font-medium">AccountNo:</span>
                    {{ reportInfoById.accountNo }}
                    <span class="font-medium">IFSC:</span>
                    {{ reportInfoById.ifscCode }}
                  </p>
                </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  PO NO
                </th>
                <td class="px-6 py-4">
                  {{ !reportInfoById.poNo ? 'NA' : reportInfoById.poNo }}
                </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Date of supply
                </th>
                <td class="px-6 py-4">
                  {{
                    !reportInfoById.dateOfSupply
                      ? 'NA'
                      : reportInfoById.dateOfSupply
                  }}
                </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Taxeable Amount
                </th>
                <td class="px-6 py-4">
                  {{
                    !reportInfoById.totalTaxableValue
                      ? 'NA'
                      : toRupee(reportInfoById.totalTaxableValue)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted } from 'vue';
import { useReportInfoStore } from '~/store/report-info';
const route = useRoute();
const invoiceNo = route.params.id;
const reportInfoStore = useReportInfoStore();
const reportInfoById = reportInfoStore.getReportInfoById;
const particulars = reportInfoById.particulars;
const gstAmounts = reportInfoById.applicableGsts;
onMounted(() => {
  reportInfoStore.findReportInfoByInvoiceNo(invoiceNo);
});
</script>
