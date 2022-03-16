import CommonRequest from "../types/commonRequest";




export default interface CreateUniversalCardStorageInitializeRequest extends CommonRequest {
  email: string,
  gsmNumber: string,
}




export function CreateUniversalCardStorageInitializeRequestValidator(data: CreateUniversalCardStorageInitializeRequest) {
  return {
    locale: data["locale"],
    conversationId: data["conversationId"],
    email: data["email"],
    gsmNumber: data["gsmNumber"],
  };
}