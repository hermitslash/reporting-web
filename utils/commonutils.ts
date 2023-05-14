export const toRupee = (amount: number) => '₹' + amount + '/-';

export const authTokenURL = process.env.AUTH_TOKEN_URL;
export const authTokenValidateURL = process.env.AUTH_TOKEN_VALIDATE_URL;
export const userInfoURL = process.env.USER_INFO_URL;
export const initiateReportURL = process.env.INITIATE_REPORT_URL;
export const allReportInfoURL = process.env.ALL_REPORT_INFOS_URL;
export const findReportInfoURL = `${process.env.REPORT_INFO_BY_INVOICE_NO_URL}?invoiceNo=`;
export const downloadReportURL = `${process.env.DOWNLOAD_REPORT_INFO_URL}?invoiceNo=`;
export const eodtURL = `${process.env.END_OF_DAY_TRANCS_URL}?currentDate=`;