import { createRequest } from "../iyzipayResource";
import { SubscriptionProductValidator } from "../models/subscriptionProduct";
import CommonApiResponse from "../types/commonResponse";
import EmptyValidator from "../types/emptyValidator";
import { IyzicoCredentials } from "../types/iyzicoCredentials";
import DefaultResponseFormatter from "../utils/responseFormatter";



export default function SubscriptionProduct(credentials: IyzicoCredentials) {
  return {
    create: createRequest("POST", "/v2/subscription/products", SubscriptionProductValidator, DefaultResponseFormatter<CommonApiResponse>(), credentials),
    update: createRequest("POST", "/v2/subscription/products/:productReferenceCode", SubscriptionProductValidator, DefaultResponseFormatter<CommonApiResponse>(), credentials),
    delete: createRequest("DELETE", "/v2/subscription/products/:productReferenceCode", EmptyValidator, DefaultResponseFormatter<CommonApiResponse>(), credentials),
    retrieve: createRequest("GET", "/v2/subscription/products/:productReferenceCode", EmptyValidator, DefaultResponseFormatter<CommonApiResponse>(), credentials),
    retrieveList: createRequest("GET", "/v2/subscription/products", EmptyValidator, DefaultResponseFormatter<CommonApiResponse>(), credentials),
  };
}