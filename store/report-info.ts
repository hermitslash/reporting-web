import { defineStore } from 'pinia';
import { mande } from 'mande';
import {
  AuthenticatedUser,
  CompanyInfo,
  Particular,
  ReportInfo,
  ReportInfoData,
} from '~/utils/models';
import { useAuthStore } from './auth';
import { toast } from 'vue3-toastify';
export const useReportInfoStore = defineStore('reportInfoStore', {
  state: () => ({
    companyInfo: {} as CompanyInfo,
    particulars: [] as Particular[],
    reportInfoData: {} as ReportInfoData,
    reportInfos: [] as ReportInfo[],
    reportInfoById: {} as ReportInfo,
  }),
  persist: true,
  actions: {
    clearReportInfo() {
      this.companyInfo = {} as CompanyInfo;
      this.particulars = [];
      this.reportInfoData = {} as ReportInfoData;
      this.reportInfos = [];
    },
    addCompanyInfo(ci: CompanyInfo) {
      this.companyInfo = ci;
    },
    addParticular(particular: Particular) {
      this.particulars.push(particular);
    },
    async initiateReportData(reportInfoData: ReportInfoData) {
      const reportInfoInitiate = mande(
        'http://localhost:9809/api/reporting-svc/reportInfoData/initiate'
      );
      const authStore = useAuthStore();
      try {
        reportInfoData.reportData.customerId = (
          authStore.getUserInfo as AuthenticatedUser
        ).companyName;
        // const initiatedReport = await reportInfoInitiate.post<ReportInfoData>(
        //   reportInfoData,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${authStore.getAccessToken}`,
        //     },
        //   }
        // );
        toast.info('Added ReportInfo');
        console.log(reportInfoData);
      } catch (err) {
        console.error(err);
      }
    },
    async findAllReportInfos() {
      try {
        const reportInfoList = mande(
          'http://localhost:9809/api/reporting-svc/reportInfos'
        );
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
      try {
        const authStore = useAuthStore();
        const reportInfoURL = `http://localhost:9809/api/reporting-svc/reportInfo?invoiceNo=${encodeURIComponent(
          invoiceNo
        )}`;
        const reportInfo = mande(reportInfoURL);
        this.reportInfoById = await reportInfo.get({
          headers: {
            Authorization: `Bearer ${authStore.getAccessToken}`,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
    async downloadReportInfoData(invoiceNo: string) {
      const authStore = useAuthStore();
      const downloadReportInfo = mande(
        'http://localhost:9809/api/reporting-svc/download/reportInfo?invoiceNo=' +
          encodeURIComponent(invoiceNo)
      );
      try {
        const fileResourceResp = await downloadReportInfo.get({
          headers: {
            Authorization: `Bearer ${authStore.getAccessToken}`,
            Accept: 'application/octet-stream',
          },
          responseAs: 'response',
        });
        if (fileResourceResp.status === 200) {
          toast.info('File downloaded, Please check your downloads folder.');
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
  getters: {
    getCompanyInfo: (state) => state.companyInfo,
    getParticulars: (state) => state.particulars,
    getReportInfoData: (state) => state.reportInfoData,
    getReportInfos: (state) => state.reportInfos,
    getReportInfoById: (state) => state.reportInfoById,
  },
});
