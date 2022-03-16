import { createRequest } from "../iyzipayResource";
import { CreateUniversalCardStorageInitializeRequestValidator } from "../models/createUniversalCardStorageInitializeRequest";
import CommonApiResponse from "../types/commonResponse";
import { IyzicoCredentials } from "../types/iyzicoCredentials";
import DefaultResponseFormatter from "../utils/responseFormatter";





export default function UniversalCardStorage(credentials: IyzicoCredentials) {
  return {
    create: createRequest("POST", "/v2/ucs/init", CreateUniversalCardStorageInitializeRequestValidator, DefaultResponseFormatter<CommonApiResponse>(), credentials),
  };
}