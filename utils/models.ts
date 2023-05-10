export class AuthenticationResponse {
  constructor(public token: string, public isValid: boolean) {}
}
export class UnauthorizedError extends Error {
  constructor(
    public error: string,
    public message: string,
    public path: string,
    public status: number
  ) {
    super();
  }
}

export class AuthenticatedUser {
  constructor(
    public id: number,
    public companyName: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public roles: string[],
    public emailAddress: string,
    public phoneNumber: string
  ) {}
}

export class Particular {
  constructor(
    public descriptionOfGoodsOrService: string,
    public hsnSacCode: string,
    public quantityOrSize: number,
    public unitAmountInfo: number,
    public unitAmountSummary: string,
    public units: number,
    public amountInfo: number | undefined,
    public gstAmount: number | undefined
  ) {}
}

export class CompanyInfo {
  constructor(
    public addressLine: string,
    public companyName: string,
    public emailAddress: string,
    public gstNo: string,
    public panNo: string,
    public phoneNumber: string,
    public pinCode: string,
    public category: CompanyCategory | undefined = CompanyCategory.BILL_TO
  ) {}
}

export enum CompanyCategory {
  BILL_BY,
  BILL_TO,
}

export class ReportInfoData {
  constructor(
    public invoiceNo: string,
    public reportData: ReportData,
    public dateCreated: string,
    public lastUpdated: string
  ) {}
}
export class ReportData {
  constructor(
    public customerId: string,
    public accountNo: string,
    public bankName: string,
    public branchName: string,
    public downloadedAt: string,
    public ifscCode: string,
    public posCity: string,
    public posState: string,
    public taxPayableUnderReverseCharge = GeneralBEnum.NO,
    public amountChargeable: number,
    public amountChargeableInWords: string,
    public dateOfSupply: string,
    public totalTaxableValue: number,
    public isPaid = GeneralBEnum.NO,
    public poNo: string,
    public isPrintAllowed = false,
    public currentDate: string,
    public applicableGsts: ApplicableGst[],
    public companyInfos: CompanyInfo[],
    public particulars: Particular[],
    public reportTitle = ReportTitle.TAX_INVOICE
  ) {}
}

export class ReportInfo {
  constructor(
    public invoiceNo: string,
    public customerId: string,
    public accountNo: string,
    public bankName: string,
    public branchName: string,
    public downloadedAt: string,
    public ifscCode: string,
    public posCity: string,
    public posState: string,
    public taxPayableUnderReverseCharge = GeneralBEnum.NO,
    public amountChargeable: number,
    public amountChargeableInWords: string,
    public dateOfSupply: string,
    public totalTaxableValue: number,
    public isPaid = GeneralBEnum.NO,
    public poNo: string,
    public isPrintAllowed = false,
    public currentDate: string,
    public addressLine: string,
    public companyName: string,
    public emailAddress: string,
    public gstNo: string,
    public panNo: string,
    public phoneNumber: string,
    public pinCode: string,
    public billingAddressLine: string,
    public billingCompanyName: string,
    public billingEmailAddress: string,
    public billingGstNo: string,
    public billingPanNo: string,
    public billingPhoneNumber: string,
    public billingPinCode: string,
    public applicableGsts: ApplicableGst[],
    public particulars: Particular[],
    public reportTitle = ReportTitle.TAX_INVOICE
  ) {}
}
export enum ReportTitle {
  TAX_INVOICE,
}
export enum GeneralBEnum {
  YES,
  NO,
}
export enum GstCategory {
  CGST,
  SGST,
  IGST,
}
export class ApplicableGst {
  constructor(
    public amountInfo: number,
    public category: GstCategory,
    public percentageApplicable: number
  ) {}
}
