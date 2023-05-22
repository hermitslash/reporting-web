import { defineStore } from 'pinia';
import { mande } from 'mande';
import {
  AuthenticatedUser,
  CompanyInfo,
  EndOfDayTransaction,
  Particular,
  ReportInfo,
  ReportInfoData,
} from '~/utils/models';
import { useAuthStore } from './auth';
import { toast } from 'vue3-toastify';
export const useReportInfoStore = defineStore('reportInfoStore', {
  state: () => ({
    companyInfos: [] as CompanyInfo[],
    particulars: [] as Particular[],
    reportInfoData: {} as ReportInfoData,
    reportInfos: [] as ReportInfo[],
    reportInfoById: {} as ReportInfo,
    endOfDayTransaction: {} as EndOfDayTransaction,
  }),
  persist: true,
  actions: {
    clearReportInfo() {
      this.companyInfos = [];
      this.particulars = [];
      this.reportInfoData = {} as ReportInfoData;
      this.reportInfos = [];
    },
    addCompanyInfo(ci: CompanyInfo) {
      this.companyInfos.push(ci);
    },
    addParticular(particular: Particular) {
      this.particulars.push(particular);
    },
    async initiateReportData(reportInfoData: ReportInfoData) {
      const runtimeConfig = useRuntimeConfig();
      const reportInfoInitiate = mande(
        runtimeConfig.public.INITIATE_REPORT_URL
      );
      const authStore = useAuthStore();
      try {
        reportInfoData.reportData.customerId = (
          authStore.getUserInfo as AuthenticatedUser
        ).companyName;
        const initiatedReport = await reportInfoInitiate.post<ReportInfoData>(
          reportInfoData,
          {
            headers: {
              Authorization: `Bearer ${authStore.getAccessToken}`,
            },
          }
        );
        toast.info('Added ReportInfo');
      } catch (err) {
        toast.error('Unable to add');
      }
    },
    async findAllReportInfos() {
      const runtimeConfig = useRuntimeConfig();
      try {
        const reportInfoList = mande(runtimeConfig.public.ALL_REPORT_INFOS_URL);
        const authStore = useAuthStore();
        const allReportInfo = await reportInfoList.get<ReportInfo[]>({
          headers: {
            Authorization: `Bearer ${authStore.getAccessToken}`,
            customerId: (authStore.getUserInfo as AuthenticatedUser)
              .companyName,
          },
        });
        this.reportInfos = allReportInfo;
      } catch (err) {
        console.error(err);
      }
    },
    async findReportInfoByInvoiceNo(invoiceNo: string) {
      const runtimeConfig = useRuntimeConfig();
      try {
        const authStore = useAuthStore();
        const reportInfoURL =
          runtimeConfig.public.REPORT_INFO_BY_INVOICE_NO_URL;
        const reportInfo = mande(reportInfoURL);
        this.reportInfoById = await reportInfo.get({
          query: {
            invoiceNo: invoiceNo,
          },
          headers: {
            Authorization: `Bearer ${authStore.getAccessToken}`,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
    async findEndOfDayTransaction(currentDate: string) {
      const runtimeConfig = useRuntimeConfig();
      try {
        const authStore = useAuthStore();
        const eodt = await mande(
          runtimeConfig.public.END_OF_DAY_TRANCS_URL
        ).get({
          query: {
            currentDate: encodeURIComponent(currentDate),
          },
          headers: {
            Authorization: `Bearer ${authStore.getAccessToken}`,
            customerId: (authStore.getUserInfo as AuthenticatedUser)
              .companyName,
          },
        });
        this.endOfDayTransaction = new EndOfDayTransaction(
          (authStore.getUserInfo as AuthenticatedUser).companyName,
          eodt as number,
          currentDate
        );
      } catch (err) {
        console.error(err);
      }
    },
    async downloadReportInfoData(invoiceNo: string) {
      const runtimeConfig = useRuntimeConfig();
      const authStore = useAuthStore();
      const downloadReportInfo = mande(
        runtimeConfig.public.DOWNLOAD_REPORT_INFO_URL
      );
      try {
        const fileResourceResp = await downloadReportInfo.get({
          query: {
            invoiceNo: invoiceNo,
          },
          headers: {
            Authorization: `Bearer ${authStore.getAccessToken}`,
            Accept: 'application/octet-stream',
          },
          responseAs: 'response',
        });
        if (fileResourceResp.status === 200) {
          const fileNameHeader = fileResourceResp.headers
            .get('content-disposition')!
            .split('filename=')[1]
            .split(';')[0];
          const trimFileName = fileNameHeader
            .substring(fileNameHeader.lastIndexOf('/') + 1)
            .replaceAll('"', '');
          var fileURL = window.URL.createObjectURL(
            new Blob([await fileResourceResp.blob()], {
              type: 'application/octet-stream',
            })
          );
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', trimFileName);
          document.body.appendChild(fileLink);
          fileLink.click();
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
  getters: {
    getCompanyInfos: (state) => state.companyInfos,
    getParticulars: (state) => state.particulars,
    getReportInfoData: (state) => state.reportInfoData,
    getReportInfos: (state) => state.reportInfos,
    getReportInfoById: (state) => state.reportInfoById,
    getEndOfDayTransaction: (state) => state.endOfDayTransaction,
  },
});
