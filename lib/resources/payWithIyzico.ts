import { ApiDef, ApiList, createRequest } from "../iyzipayResource"
import CreatePaymentRequest, { CreatePaymentRequestValidator } from "../models/createPaymentRequest"
import InitialisePayWithIyzico, { InitialisePayWithIyzicoValidator } from "../models/initialisePayWithIyzico"
import InitialisePayWithIyzicoResponse from "../models/initilisePayWithIyzicoResponse"
import PaymentModel from "../models/paymentModel"
import RetrievePaymentRequest, { RetrievePaymentRequestValidator } from "../models/retrievePaymentRequest"
import RetrivePayWithIyzico, { RetrivePayWithIyzicoValidator } from "../models/retrivePayWithIyzico"
import CommonApiResponse from "../types/commonResponse"
import { IyzicoCredentials } from "../types/iyzicoCredentials"


interface PaymentApi extends ApiList {
  create: {
    model: InitialisePayWithIyzico,
    response: InitialisePayWithIyzicoResponse,
    path: '/payment/pay-with-iyzico/initialize'
  },
  retrive: {
    model: RetrivePayWithIyzico
    response: PaymentModel & CommonApiResponse,
    path: '/payment/iyzipos/checkoutform/auth/ecom/detail'
  }
};

function IyzicoPayment(credentials: IyzicoCredentials): ApiDef<PaymentApi> {
  return  {
    create: createRequest<PaymentApi['create']>('POST', '/payment/pay-with-iyzico/initialize', InitialisePayWithIyzicoValidator, credentials),
    retrive: createRequest<PaymentApi['retrive']>('POST', '/payment/iyzipos/checkoutform/auth/ecom/detail', RetrivePayWithIyzicoValidator, credentials)
  }
}
export default IyzicoPayment;