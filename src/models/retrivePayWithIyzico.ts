import CommonRequest from "../types/commonRequest";




export default interface RetrivePayWithIyzico extends CommonRequest {
  token: string;
}




export function RetrivePayWithIyzicoValidator(data: RetrivePayWithIyzico) {
  return {
    locale: data["locale"],
    conversationId: data["conversationId"],
    token: data["token"],
  };
}


