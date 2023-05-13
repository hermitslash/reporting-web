export const toRupee = (amount: number) => '₹' + amount + '/-';

export const authTokenURL = 'http://localhost:9809/api/auth/token';
export const authTokenValidateURL =
  'http://localhost:9809/api/auth/token/validate';
export const userInfoURL = 'http://localhost:9809/api/auth/userinfo';
export const initiateReportURL =
  'http://localhost:9809/api/reporting-svc/reportInfoData/initiate';
export const allReportInfoURL =
  'http://localhost:9809/api/reporting-svc/reportInfos';
export const findReportInfoURL =
  'http://localhost:9809/api/reporting-svc/reportInfo?invoiceNo=';
export const downloadReportURL =
  'http://localhost:9809/api/reporting-svc/download/reportInfo?invoiceNo=';
export const eodtURL =
  'http://localhost:9809/api/reporting-svc/end-of-day-transactions?currentDate=';