import { createRequest } from "../iyzipayResource";
import { InitialisePayWithIyzicoValidator } from "../models/initialisePayWithIyzico";
import InitialisePayWithIyzicoResponse from "../models/initilisePayWithIyzicoResponse";
import PaymentModel from "../models/paymentModel";
import  { RetrivePayWithIyzicoValidator } from "../models/retrivePayWithIyzico";
import CommonApiResponse from "../types/commonResponse";
import { IyzicoCredentials } from "../types/iyzicoCredentials";
import DefaultResponseFormatter from "../utils/responseFormatter";



function IyzicoPayment(credentials: IyzicoCredentials) {
  return  {
    create: createRequest("POST", "/payment/pay-with-iyzico/initialize", InitialisePayWithIyzicoValidator, DefaultResponseFormatter<InitialisePayWithIyzicoResponse>(), credentials),
    retrive: createRequest("POST", "/payment/iyzipos/checkoutform/auth/ecom/detail", RetrivePayWithIyzicoValidator, DefaultResponseFormatter<PaymentModel & CommonApiResponse>(), credentials)
  };
}

export default IyzicoPayment;