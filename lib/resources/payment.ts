import { ApiDef, ApiList, createRequest } from "../iyzipayResource"
import CreatePaymentRequest, { CreatePaymentRequestValidator } from "../models/createPaymentRequest"
import RetrievePaymentRequest, { RetrievePaymentRequestValidator } from "../models/retrievePaymentRequest"
import CommonApiResponse from "../types/commonResponse"
import { IyzicoCredentials } from "../types/iyzicoCredentials"


interface PaymentApi extends ApiList {
  create: {
    model: CreatePaymentRequest,
    response: CommonApiResponse,
    path: '/payment/auth'
  },
  retrieve: {
    model: RetrievePaymentRequest,
    response: CommonApiResponse,
    path: '/payment/detail'
  }
};

function Payment(credentials: IyzicoCredentials): ApiDef<PaymentApi> {
  return  {
    create: createRequest<PaymentApi['create']>('POST', '/payment/auth', CreatePaymentRequestValidator, credentials),
    retrieve: createRequest<PaymentApi['retrieve']>('POST', '/payment/detail', RetrievePaymentRequestValidator, credentials),
  }
}
export default Payment;