import CommonApiResponse from "../types/commonResponse";



export default interface InitialisePayWithIyzicoResponse extends CommonApiResponse {
  token: string;
  tokenExpireTime: number;
  payWithIyzicoPageUrl: string
}