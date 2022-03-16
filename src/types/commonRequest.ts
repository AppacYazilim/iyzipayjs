import { Locale } from "./iyzicoConstants";

export default interface CommonRequest {
  locale: Locale;
  conversationId: string;
}


export type RequestValidator<R extends CommonRequest> = (params: R) => object;