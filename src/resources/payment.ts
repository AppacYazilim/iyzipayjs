import { createRequest } from "../iyzipayResource";
import { CreatePaymentRequestValidator } from "../models/createPaymentRequest";
import { RetrievePaymentRequestValidator } from "../models/retrievePaymentRequest";
import CommonApiResponse from "../types/commonResponse";
import { IyzicoCredentials } from "../types/iyzicoCredentials";
import DefaultResponseFormatter from "../utils/responseFormatter";


function Payment(credentials: IyzicoCredentials) {
  return {
    create: createRequest("POST", "/payment/auth", CreatePaymentRequestValidator, DefaultResponseFormatter<CommonApiResponse>(), credentials),
    retrieve: createRequest("POST", "/payment/detail", RetrievePaymentRequestValidator, DefaultResponseFormatter<CommonApiResponse>(), credentials),
  };
}


export default Payment;