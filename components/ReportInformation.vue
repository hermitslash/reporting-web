<template>
  <section>
    <div class="grid grid-flow-row">
      <FormKit type="multi-step" tab-style="progress">
        <FormKit type="step" name="customerInfo">
          <FormKit
            type="text"
            v-model="customerInfo.companyName"
            label="Company Name"
            id="companyName"
            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Company Name"
            validation="required"
          />
          <FormKit
            type="email"
            v-model="customerInfo.emailAddress"
            id="emailAddress"
            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            validation="required|email"
            label="Email Address"
          />
          <FormKit
            type="text"
            v-model="customerInfo.gstNo"
            id="gstNo"
            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            validation="required"
            label="GST No"
          />
          <FormKit
            type="text"
            v-model="customerInfo.panNo"
            id="panNo"
            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            validation="required"
            label="PAN No"
          />
          <FormKit
            type="textarea"
            v-model="customerInfo.addressLine"
            id="addressLine"
            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            rows="10"
            label="Address Line"
          />
          <FormKit
            type="text"
            v-model="customerInfo.pinCode"
            id="pinCode"
            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            validation="required"
            label="Pincode"
          />
        </FormKit>
        <FormKit type="step" name="particularInfo">
          <FormKit
            type="text"
            v-model="particularInfo.descriptionOfGoodsOrService"
            label="Description of Goods or Service"
            placeholder="Description of Goods or Service"
            validation="required"
          />
          <FormKit
            type="text"
            v-model="particularInfo.hsnSacCode"
            label="HSN/SAC Code"
            placeholder="HSN/SAC Code"
            validation="required"
          />
          <FormKit
            type="number"
            v-model="particularInfo.quantityOrSize"
            label="Quantity/Size"
            placeholder="Quantity/Size"
            validation="required"
          />
          <FormKit
            type="number"
            v-model="particularInfo.unitAmountInfo"
            label="Unit Amount"
            placeholder="Unit Amount.. 1200"
            validation="required"
          />
          <FormKit
            type="text"
            v-model="particularInfo.unitAmountSummary"
            label="Unit Amount Summary"
            placeholder="Unit Amount Summary"
            validation="required"
          />
          <FormKit
            type="number"
            v-model="particularInfo.units"
            label="Units"
            placeholder="Units... 12"
            validation="required"
          />
          <FormKit
            type="number"
            v-model="particularInfo.amountInfo"
            label="Total Amount"
            disabled
          />
          <FormKit
            type="number"
            v-model="particularInfo.gstAmount"
            label="GST Amount"
            disabled
          />
          <FormKit
            type="button"
            label="Add More"
            prefix-icon="add"
            @click="addParticular"
          />
        </FormKit>
        <FormKit type="step" name="reportDataInfo">
          <FormKit
            type="text"
            v-model="reportInfoData.poNo"
            label="PO NO"
            placeholder="PONO"
            validation="required"
          />
          <FormKit
            type="text"
            v-model="reportInfoData.posCity"
            label="Place of supply City"
            placeholder="Shimoga"
            validation="required"
          />
          <FormKit
            type="text"
            v-model="reportInfoData.posState"
            label="Place of supply State"
            placeholder="Karnataka"
            validation="required"
          />
          <FormKit
            type="date"
            v-model="reportInfoData.dateOfSupply"
            label="Supply Date"
          />
        </FormKit>
      </FormKit>
      <FormKit type="button" @submit="submitReportInfoData" />
    </div>
  </section>
</template>
<script setup>
import { useReportInfoStore } from '~/store/report-info';
const customerInfo = reactive({
  companyName: '',
  emailAddress: '',
  phoneNumber: '',
  panNo: '',
  gstNo: '',
  addressLine: '',
  pinCode: '',
});
const particularInfo = reactive({
  descriptionOfGoodsOrService: '',
  hsnSacCode: '',
  quantityOrSize: 0,
  unitAmountInfo: 0.0,
  unitAmountSummary: '',
  units: 0,
  amountInfo: 0.0,
  gstAmount: 0.0,
});
const reportInfoData = reactive({
  posCity: '',
  posState: 'Karnataka',
  poNo: '',
  dateOfSupply: '',
});
watch(
  () => [particularInfo.units, particularInfo.unitAmountInfo],
  () => {
    const taxableAmount = particularInfo.unitAmountInfo * particularInfo.units;
    particularInfo.gstAmount = taxableAmount * (18 / 100);
    particularInfo.amountInfo = taxableAmount + particularInfo.gstAmount;
  }
);
const reportDataStore = useReportInfoStore();
const addParticular = () => {
  const particular = new Particular(
    particularInfo.descriptionOfGoodsOrService,
    particularInfo.hsnSacCode,
    particularInfo.quantityOrSize,
    particularInfo.unitAmountInfo,
    particularInfo.unitAmountSummary,
    particularInfo.units,
    particularInfo.amountInfo,
    particularInfo.gstAmount
  );
  reportDataStore.addParticular(particular);
  clearParticularInfo();
};
const clearParticularInfo = () => {
  particularInfo.descriptionOfGoodsOrService = '';
  particularInfo.hsnSacCode = '';
  particularInfo.quantityOrSize = 0;
  particularInfo.unitAmountInfo = 0.0;
  particularInfo.unitAmountSummary = '';
  particularInfo.units = 0;
  particularInfo.amountInfo = 0.0;
  particularInfo.gstAmount = 0.0;
};

const submitReportInfoData = async () => {
  const reportInfoData = new ReportInfoData();
  const reportData = new ReportData();
  // const companyInfo = new CompanyInfo(
  //   customerInfo.addressLine,
  //   customerInfo.companyName,
  //   customerInfo.emailAddress,
  //   customerInfo.gstNo,
  //   customerInfo.panNo,
  //   customerInfo.phoneNumber,
  //   customerInfo.pinCode
  // );
  const companyInfo = new [...customerInfo]();
  reportDataStore.addCompanyInfo(companyInfo);
  if (reportDataStore.getParticulars.length === 0) {
    reportDataStore.addParticular(new [...particularInfo]());
  }
  reportData.companyInfos.push(reportDataStore.getCompanyInfo);
  reportData.particulars = reportDataStore.getParticulars;
  reportInfoData.reportData = reportData;
  reportDataStore.initiateReportData(reportInfoData);
};
</script>
