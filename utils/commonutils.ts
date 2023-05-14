export const toRupee = (amount: number) => '₹' + amount + '/-';

export const authTokenURL = '/api/auth/token';
export const authTokenValidateURL = '/api/auth/token/validate';
export const userInfoURL = '/api/auth/userinfo';
export const initiateReportURL = '/api/reporting-svc/reportInfoData/initiate';
export const allReportInfoURL = '/api/reporting-svc/reportInfos';
export const findReportInfoURL = '/api/reporting-svc/reportInfo?invoiceNo=';
export const downloadReportURL = '/api/reporting-svc/download/reportInfo?invoiceNo=';
export const eodtURL = '/api/reporting-svc/end-of-day-transactions?currentDate=';