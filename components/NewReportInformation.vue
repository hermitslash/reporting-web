<template>
    <section class="text-primary-500">
      <div class="grid md:grid-cols-2 md:gap-4">
            <div>
              <FormKit type="form"  @submit="submitReportInfoData" submit-label="Submit Tax Invoice Information">
                <p class="text-xl font-medium underline py-6">Company Information</p>
                <FormKit v-model="customerInfo" type="group">
                  <FormKit
                    type="text"
                    name="companyName"
                    label="Company Name"
                    id="companyName"
                    placeholder="Company Name"
                    validation="required|length:3"
                  />
                  <FormKit
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    validation="required|email"
                    label="Email Address"
                    placeholder="Email Address"
                  />
                  <FormKit
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    validation="required|matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/|length:10"
                    label="Phone Number"
                    placeholder="xxx-xxx-xxxx"
                    help="Format - xxx-xxx-xxxx"
                  />
                  <FormKit
                    type="text"
                    name="gstNo"
                    id="gstNo"
                    validation="required|length:15|alphanumeric"
                    label="GST No"
                    placeholder="29AAAAACCCB1AG"
                  />
                  <FormKit
                    type="text"
                    name="panNo"
                    id="panNo"
                    validation="required|length:10|alphanumeric"
                    label="PAN No"
                    placeholder="AAAAAAAAAA"
                  />
                  <FormKit
                    type="textarea"
                    name="addressLine"
                    id="addressLine"
                    rows="10"
                    label="Address Line"
                    validation="required"
                    placeholder="Address Line"
                  />
                  <FormKit
                    type="text"
                    name="pinCode"
                    id="pinCode"
                    validation="required|length:6|number"
                    label="Pincode"
                    placeholder="577204"
                  />
                </FormKit>
                <p class="text-xl font-medium underline py-6">Particulars</p>
                <FormKit v-model="particularInfo" type="group">
                  <FormKit
                    type="text"
                    name="descriptionOfGoodsOrService"
                    label="Description of Goods or Service"
                    placeholder="Description of Goods or Service"
                    validation="required|length:5"
                  />
                  <FormKit
                    type="text"
                    name="hsnSacCode"
                    label="HSN/SAC Code"
                    placeholder="HSN/SAC Code"
                    validation="required"
                  />
                  <FormKit
                    type="number"
                    name="quantityOrSize"
                    label="Quantity/Size"
                    placeholder="Quantity/Size"
                    validation="required|min:1"
                  />
                  <FormKit
                    type="number"
                    name="unitAmountInfo"
                    label="Unit Amount"
                    placeholder="Unit Amount.. 1200"
                    validation="required|min:1"
                  />
                  <FormKit
                    type="text"
                    name="unitAmountSummary"
                    label="Unit Amount Summary"
                    placeholder="Unit Amount Summary"
                    validation="required"
                  />
                  <FormKit
                    type="number"
                    name="units"
                    label="Units"
                    placeholder="Units... 12"
                    validation="required|min:1"
                  />
                  <FormKit
                    type="number"
                    name="amountInfo"
                    label="Total Amount"
                    disabled
                  />
                  <FormKit
                    type="number"
                    name="gstAmount"
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
                <p class="text-xl font-medium underline py-6">Other Report Information</p>
                <FormKit v-model="reportDataInfo"  type="group">
                  <FormKit
                    type="text"
                    name="poNo"
                    label="PO NO"
                    placeholder="PONO"
                    validation="required"
                  />
                  <FormKit
                    type="text"
                    name="posCity"
                    label="Place of supply City"
                    placeholder="Shimoga"
                    validation="required"
                  />
                  <FormKit
                    type="text"
                    name="posState"
                    label="Place of supply State"
                    placeholder="Karnataka"
                    validation="required"
                  />
                  <FormKit
                    type="date"
                    name="dateOfSupply"
                    label="Supply Date"
                  />
                </FormKit>
              </FormKit>
            </div>
            <div class="w-full max-w-md">
              <p class="text-lg font-medium">Some Instructions.</p>
              <ul>
                <li class="font-thin first-letter:capitalize text-red-500">All Fields are mandatory.</li>
              </ul>
            </div>
      </div>
    </section>
  </template>
  <script setup>
import dayjs from 'dayjs';
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
  const reportDataInfo = reactive({
    posCity: 'Shimoga',
    posState: 'Karnataka',
    poNo: '',
    dateOfSupply: dayjs().format("YYYY-MM-DD"),
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
    reportDataStore.addParticular(particularInfo);
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
    let reportInfoData = new ReportInfoData();
    const reportData = new ReportData();
    const companyInfo = customerInfo;
    reportDataStore.addCompanyInfo(companyInfo);
    if (reportDataStore.getParticulars.length === 0) {
      reportDataStore.addParticular(particularInfo);
    }
    reportData.companyInfos = reportDataStore.getCompanyInfos;
    reportData.particulars = reportDataStore.getParticulars;
    reportData.posCity = reportDataInfo.posCity;
    reportData.posState = reportDataInfo.posState;
    reportData.dateOfSupply = dayjs(reportDataInfo.dateOfSupply).format("YYYY-MM-DD");
    reportData.poNo = reportDataInfo.poNo;
    reportInfoData.reportData = reportData;
    reportInfoData = await reportDataStore.initiateReportData(reportInfoData);
    reportDataStore.clearReportInfo();
    reportDataStore.downloadReportInfoData(reportInfoData.invoiceNo);
  };
  
  </script>
  <style>
  [data-invalid] .formkit-inner {
    border-color: red;
    box-shadow: 0 0 0 1px red;
  }
  
  [data-complete] .formkit-inner {
    border-color: red;
    box-shadow: 0 0 0 1px green;
  }
  [data-complete] .formkit-inner::after {
    content: '✅';
    display: block;
    padding: 0.5em;
  }
  </style>