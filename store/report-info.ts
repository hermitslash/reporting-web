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
import {
  initiateReportURL,
  allReportInfoURL,
  findReportInfoURL,
  downloadReportURL,
  eodtURL,
} from '~/utils/commonutils';
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
      const reportInfoInitiate = mande(initiateReportURL + '');
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
      try {
        const reportInfoList = mande(allReportInfoURL + '');
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
        const reportInfoURL = findReportInfoURL + encodeURIComponent(invoiceNo);
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
    async findEndOfDayTransaction(currentDate: string) {
      try {
        const authStore = useAuthStore();
        const eodt = await mande(eodtURL + encodeURIComponent(currentDate)).get(
          {
            headers: {
              Authorization: `Bearer ${authStore.getAccessToken}`,
              customerId: (authStore.getUserInfo as AuthenticatedUser)
                .companyName,
            },
          }
        );
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
      const authStore = useAuthStore();
      const downloadReportInfo = mande(
        downloadReportURL + encodeURIComponent(invoiceNo)
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
    getCompanyInfos: (state) => state.companyInfos,
    getParticulars: (state) => state.particulars,
    getReportInfoData: (state) => state.reportInfoData,
    getReportInfos: (state) => state.reportInfos,
    getReportInfoById: (state) => state.reportInfoById,
    getEndOfDayTransaction: (state) => state.endOfDayTransaction,
  },
});
