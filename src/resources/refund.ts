import { createRequest } from "../iyzipayResource";
import { CreateRefundRequestValidator } from "../models/createRefundRequest";
import CommonApiResponse from "../types/commonResponse";
import { IyzicoCredentials } from "../types/iyzicoCredentials";
import DefaultResponseFormatter from "../utils/responseFormatter";



export default function Refund(credentials: IyzicoCredentials) {
  return {
    create: createRequest("POST", "/payment/refund", CreateRefundRequestValidator, DefaultResponseFormatter<CommonApiResponse>(), credentials),
  };
}