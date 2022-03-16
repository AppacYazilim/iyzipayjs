import CommonApiResponse from "../types/commonResponse";






export default function DefaultResponseFormatter<F extends CommonApiResponse>(): (data: F) => ((F & {status: "success"}) | {status: "failure", errorMessage: string} & CommonApiResponse) {
  return data => {



    return data as F & {errorMessage: string};

  }
}