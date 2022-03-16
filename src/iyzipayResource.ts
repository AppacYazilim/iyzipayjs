import CommonRequest from "./types/commonRequest";
import CommonApiResponse from "./types/commonResponse";
import HttpMethods from "./types/httpMethods";
import { IyzicoCredentials } from "./types/iyzicoCredentials";
import crypto from "crypto";
import request from "request";



type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;


type GetRouteParameter<S extends string> = RemoveTail<RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>, `.${string}`>;

// prettier-ignore
type RouteParameters<Route extends string> = string extends Route
  ? never
  : Route extends `${string}:${infer Rest}`
  ? (
    GetRouteParameter<Rest> extends never
    ? EmptyDictionary
    : GetRouteParameter<Rest> extends `${infer ParamName}?`
    ? { [P in ParamName]?: string }
    : { [P in GetRouteParameter<Rest>]: string }
  ) &
  (Rest extends `${GetRouteParameter<Rest>}${infer Next}`
    ? RouteParameters<Next> : unknown)
  // eslint-disable-next-line @typescript-eslint/ban-types
  : {};




export interface Api {
  model: CommonRequest
  response: CommonApiResponse
}

export type ApiList = {
  create?: Api,
  retrieve?: Api,
  retrieveList?: Api,
  delete?: Api,
  update?: Api,
}

export interface EmptyDictionary {
  [key: string]: string;
}

export type ApiDef<List extends ApiList> = {
  [key in keyof List]: List[key] extends Api ? ((data: List[key]["model"]) => Promise<List[key]["response"]>) : never
}

function generateAuthorizationHeader(iyziWsHeaderName: string, apiKey: string, separator: string, secretKey: string, body: string, randomString: string) {
  return iyziWsHeaderName + " " + apiKey + separator + generateHash(apiKey, randomString, secretKey, body);
}

function generateAuthorizationHeaderV2<B>(iyziWsHeaderName: string, apiKey: string, separator: string, secretKey: string, uri: string, body: B, randomString: string) {
  return iyziWsHeaderName + " " + generateHashV2(apiKey, separator, uri, randomString, secretKey, body);
}

function generateRandomString(size: number) {
  return process.hrtime()[0] + Math.random().toString(size).slice(2);
}

function generateHash(apiKey: string, randomString: string, secretKey: string, body: string) {
  const shaSum = crypto.createHash("sha1");
  shaSum.update(apiKey + randomString + secretKey + body, "utf8");
  return shaSum.digest("base64");
}


function generateHashV2<B>(apiKey: string, separator: string, uri: string, randomString: string, secretKey: string, body: B) {
  const params = [
    "apiKey" + separator + apiKey,
    "randomKey" + separator + randomString,
    "signature" + separator + (
      crypto.createHmac("sha256", secretKey)
        .update(randomString + uri + JSON.stringify(body)).digest("hex")
    )
  ].join("&");

  return Buffer.from(params).toString("base64");
}

function generateRequestString<B>(request: B) {
  const isArray = Array.isArray(request);
  let requestString = "[";
  for (const i in request) {
    const val = request[i];
    if (typeof val !== "undefined" && typeof val !== "function") {

      if (!isArray) {
        requestString += i + "=";
      }
      if (typeof val === "object") {
        requestString += generateRequestString(val);
      } else {
        requestString += val;
      }
      requestString += isArray ? ", " : ",";
    }
  }
  requestString = requestString.slice(0, (isArray ? -2 : -1));
  requestString += "]";
  return requestString;
}

function prepareHeaders<B>(path: string, body: B, credentials: IyzicoCredentials) {

  const randomString = generateRandomString(8);

  const authHeader = /\/v2\//.test(path) ? 
    generateAuthorizationHeaderV2("IYZWSv2", credentials.apiKey, ":", credentials.secretKey, path, body, randomString) : 
    generateAuthorizationHeader("IYZWS", credentials.apiKey, ":", credentials.secretKey, generateRequestString(body), randomString);
  
  return {
    "x-iyzi-rnd": randomString,
    "Content-Type": "application/json",
    "x-iyzi-client-version": "iyzipayjs-1.0.0",
    "Authorization": authHeader
  };
}

export function createRequest<M, R extends CommonApiResponse, P extends string, F, B> (
  method: HttpMethods,
  path: string & P,
  validator: ((data: M) => B),
  formatter: ((data: R) => F),
  credentials: IyzicoCredentials):
  (data: M & RouteParameters<P>) => Promise<F> {
    
  return (data: M & RouteParameters<P>) => {
      
    const url = path.replace(/\/:([^/]*)/g, (match, p1: keyof M) => (`/${data[p1]}`));

    const validatedData = validator(data);
    const headers = prepareHeaders(url, validatedData, credentials);


    const options = {
      method: method,
      url: `${credentials.uri}${url}`,
      headers: headers,
      qs: {},
      json: validatedData
    };
    

    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(formatter(body));
        }
      });
    });
  };
}
