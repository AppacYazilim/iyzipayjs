import ItemTransaction from "./itemTransactionModel";


export default interface PaymentModel {
  status: string;
  locale: string;
  systemTime: number;
  conversationId: string;
  price: number;
  paidPrice: number;
  installment: number;
  paymentId: string;
  fraudStatus: number;
  merchantCommissionRate: number;
  merchantCommissionRateAmount: number;
  iyziCommissionRateAmount: number;
  iyziCommissionFee: number;
  cardType: string;
  cardAssociation: string;
  cardFamily: string;
  binNumber: string;
  lastFourDigits: string;
  basketId: string;
  currency: string;
  itemTransactions: ItemTransaction[];
  authCode: string;
  phase: string;
  mdStatus: number;
  hostReference: string;
  token: string;
  callbackUrl: string;
  paymentStatus: "SUCCESS" | "FAILURE";
}