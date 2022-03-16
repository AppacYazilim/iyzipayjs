

import CommonRequest from "../types/commonRequest";
import { Currency, REFUND_REASON } from "../types/iyzicoConstants";
import formatPrice from "../utils/formatPrice";

export default interface CreateRefundRequest extends CommonRequest {
  paymentTransactionId: string,
  price: string,
  ip: string,
  currency: Currency,
  reason: REFUND_REASON,
}


export function CreateRefundRequestValidator(data: CreateRefundRequest) {
  return {
    locale: data["locale"],
    conversationId: data["conversationId"],
    paymentTransactionId: data["paymentTransactionId"],
    price: formatPrice(data["price"]),
    ip: data["ip"],
    currency: data["currency"],
    reason: data["reason"]
  };
}