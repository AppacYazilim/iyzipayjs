import CommonRequest from "../types/commonRequest";


export default interface RetrievePaymentRequest extends CommonRequest {
  paymentId: string,
  paymentConversationId: string
}



export function RetrievePaymentRequestValidator(data: RetrievePaymentRequest) {
  return {
    locale: data['locale'],
    conversationId: data['conversationId'],
    paymentId: data['paymentId'],
    paymentConversationId: data['paymentConversationId']
  };
}