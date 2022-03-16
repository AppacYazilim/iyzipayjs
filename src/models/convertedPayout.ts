



export default interface ConvertedPayout {
  paidPrice: number;
  iyziCommissionRateAmount: number;
  iyziCommissionFee: number;
  blockageRateAmountMerchant: number;
  blockageRateAmountSubMerchant: number;
  subMerchantPayoutAmount: number;
  merchantPayoutAmount: number;
  iyziConversionRate: number;
  iyziConversionRateAmount: number;
  currency: string;
}
