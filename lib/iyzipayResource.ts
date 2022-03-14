import CreatePaymentRequest from "./models/createPaymentRequest";
import CommonRequest from "./types/commonRequest"
import CommonApiResponse from "./types/commonResponse";
import HttpMethods from "./types/httpMethods";
import { IyzicoCredentials } from "./types/iyzicoCredentials";
import crypto from "crypto";
import request from "request";

export type Api = {
  model: CommonRequest,
  response: CommonApiResponse,
  path: string
}

export type ApiList = {
  create?: Api,
  retrieve?: Api,
  retrieveList?: Api,
  delete?: Api,
  update?: Api,
}

interface EmptyDictionary {
  [key: string]: string;
}

type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;


type GetRouteParameter<S extends string> = RemoveTail<RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>, `.${string}`>;

// prettier-ignore
type RouteParameters<Route extends string> = string extends Route
  ? EmptyDictionary
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
  : {};



export type ApiDef<List extends ApiList> = {
  [key in keyof List]: List[key] extends Api ? ((data: List[key]['model']) => Promise<List[key]['response']>) : never
}

function IyzipayResource() {
}


IyzipayResource.RANDOM_STRING_SIZE = 8;
IyzipayResource.RANDOM_HEADER_NAME = 'x-iyzi-rnd';
IyzipayResource.CLIENT_VERSION = 'x-iyzi-client-version';
IyzipayResource.AUTHORIZATION = 'Authorization';
IyzipayResource.IYZI_WS_HEADER_NAME = 'IYZWS';
IyzipayResource.IYZI_WS_HEADER_NAME_V2 = 'IYZWSv2';
IyzipayResource.SEPARATOR = ':';
function generateAuthorizationHeader(iyziWsHeaderName: string, apiKey: string, separator: string, secretKey: string, body: string, randomString: string) {
  return iyziWsHeaderName + ' ' + apiKey + separator + generateHash(apiKey, randomString, secretKey, body);
}

function generateAuthorizationHeaderV2(iyziWsHeaderName: string, apiKey: string, separator: string, secretKey: string, uri: string, body: any, randomString: string) {
  return iyziWsHeaderName + ' ' + generateHashV2(apiKey, separator, uri, randomString, secretKey, body);
}

function generateRandomString(size: number) {
  return process.hrtime()[0] + Math.random().toString(size).slice(2);
}

function generateHash(apiKey: string, randomString: string, secretKey: string, body: string) {
  var shaSum = crypto.createHash('sha1');
  shaSum.update(apiKey + randomString + secretKey + body, 'utf8');
  return shaSum.digest('base64');
}


function generateHashV2(apiKey: string, separator: string, uri: string, randomString: string, secretKey: string, body: any) {
  var signature = crypto
    .createHmac('sha256', secretKey)
    .update(randomString + uri + JSON.stringify(body))
    .digest('hex');

  var authorizationParams = [
    'apiKey' + separator + apiKey,
    'randomKey' + separator + randomString,
    'signature' + separator + signature
  ];
  return new Buffer(authorizationParams.join('&')).toString('base64');
}

function generateRequestString(request: any) {
  var isArray = Array.isArray(request);
  var requestString = '[';
  for (var i in request) {
    var val = request[i];
    if (typeof val !== 'undefined' && typeof val !== 'function') {
      // Eliminate number keys of array elements
      if (!isArray) {
        requestString += i + '=';
      }
      if (typeof val === 'object') {
        requestString += generateRequestString(val);
      } else {
        requestString += val;
      }
      requestString += isArray ? ', ' : ',';
    }
  }
  requestString = requestString.slice(0, (isArray ? -2 : -1));
  requestString += ']';
  return requestString;
}

function prepareHeaders(path: string, body: any, credentials: IyzicoCredentials) {
  var headers: {
    [key: string]: string;
  } = {};
  var randomString = generateRandomString(IyzipayResource.RANDOM_STRING_SIZE);
  var v2AuthUrlRegex = RegExp(/\/v2\//);
  headers['x-iyzi-rnd'] = randomString;
  headers['Content-Type'] = 'application/json';
  headers[IyzipayResource.CLIENT_VERSION] = "iyzipayjs-1.0.0";
  if (v2AuthUrlRegex.test(path)) {
    headers['Authorization'] = generateAuthorizationHeaderV2(
      IyzipayResource.IYZI_WS_HEADER_NAME_V2,
      credentials.apiKey,
      IyzipayResource.SEPARATOR,
      credentials.secretKey,
      path,
      body,
      randomString
    );
  } else {
    headers['Authorization'] = generateAuthorizationHeader(
      IyzipayResource.IYZI_WS_HEADER_NAME,
      credentials.apiKey,
      IyzipayResource.SEPARATOR,
      credentials.secretKey,
      generateRequestString(body),
      randomString
    );

    // console.log(generateRequestString(body));
  }
  return headers;
}

export function createRequest<T extends Api>(method: HttpMethods, path: T['path'], validator: ((data: T['model']) => any), credentials: IyzicoCredentials): (data: T['model'] & RouteParameters<T['path']>) => Promise<T['response']> {

  return (data: T['model'] & RouteParameters<T['path']>) => {


    const url = path.replace(/\/:([^\/]*)/g, (match, p1: keyof RouteParameters<T['path']>) => (`/${data[p1]}`));

    // const body = '{"locale":"tr","conversationId":"123456789","price":"1.0","paidPrice":"1.2","installment":"1","paymentChannel":"WEB","basketId":"B67832","paymentGroup":"PRODUCT","paymentCard":{"cardHolderName":"John Doe","cardNumber":"5528790000000008","expireYear":"2030","expireMonth":"12","cvc":"123","registerCard":"0"},"buyer":{"id":"BY789","name":"John","surname":"Doe","identityNumber":"74300864791","email":"email@email.com","gsmNumber":"+905350000000","registrationDate":"2013-04-21 15:12:09","lastLoginDate":"2015-10-05 12:43:35","registrationAddress":"Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1","city":"Istanbul","country":"Turkey","zipCode":"34732","ip":"85.34.78.112"},"shippingAddress":{"address":"Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1","zipCode":"34742","contactName":"Jane Doe","city":"Istanbul","country":"Turkey"},"billingAddress":{"address":"Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1","zipCode":"34742","contactName":"Jane Doe","city":"Istanbul","country":"Turkey"},"basketItems":[{"id":"BI101","price":"0.3","name":"Binocular","category1":"Collectibles","category2":"Accessories","itemType":"PHYSICAL"},{"id":"BI102","price":"0.5","name":"Game code","category1":"Game","category2":"Online Game Items","itemType":"VIRTUAL"},{"id":"BI103","price":"0.2","name":"Usb","category1":"Electronics","category2":"Usb / Cable","itemType":"PHYSICAL"}],"currency":"TRY"}';// JSON.stringify(data);
    const headers = prepareHeaders(url, validator(data), credentials);

    // return httpsRequest(new URL(`${credentials.uri}${url}`), method, Buffer.from(body), headers).then(response => {
    //   return JSON.parse(response.toString('utf8'));
    // })


    var options = {
      method: method,
      url: `${credentials.uri}${url}`,
      headers: headers,
      qs: {},
      json: data
    };
    // console.log(options);
    // console.log(JSON.stringify(this._getBody(method)));
    // cb('test', 'test', 'test');


    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        // cb(error, response, body);
        // console.log(error, response, body);
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });


    // return Promise.resolve({
    //   status: '200',
    //   conversationId: '',
    //   locale: 'TR',
    //   systemTime: '',
    //   errorMessage: '',
    // });
  }
}
