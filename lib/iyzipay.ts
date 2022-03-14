import Payment from "./resources/payment";
import IyzicoPayment from "./resources/payWithIyzico";
import { APM_TYPE, Currency, ItemType, Locale, PaymentChannel, PaymentGroup, REFUND_REASON, SUBSCRIPTION_INITIAL_STATUS, SUBSCRIPTION_PRICING_PLAN_INTERVAL, SUBSCRIPTION_STATUS, SUB_MERCHANT_TYPE } from "./types/iyzicoConstants";
import { IyzicoCredentials } from "./types/iyzicoCredentials";
import { GroupToEnum, GroupToEnumUpper } from "./utils/ts/groupToEnum";

export default class Iyzipay {
   
  private readonly _config: IyzicoCredentials;

  constructor(credentials?: IyzicoCredentials) {
    this._config = credentials ?? {
      uri: process.env.IYZIPAY_URI ?? "https://api.iyzipay.com",
      apiKey: process.env.IYZIPAY_API_KEY ?? "",
      secretKey: process.env.IYZIPAY_SECRET_KEY ?? ""
    };

    this.payment = Payment(this._config);
    this.iyzicoPayment = IyzicoPayment(this._config);
  }

  public payment: ReturnType<typeof Payment>;
  public iyzicoPayment: ReturnType<typeof IyzicoPayment>;

  _validateIyzipayOptions() {
    if (typeof this._config['uri'] === 'undefined' || this._config['uri'] === '') throw new TypeError('uri cannot be empty');
    if (typeof this._config['apiKey'] === 'undefined' || this._config['apiKey'] === '') throw new TypeError('apiKey cannot be empty');
    if (typeof this._config['secretKey'] === 'undefined' || this._config['secretKey'] === '') throw new TypeError('secretKey cannot be empty');
  }

  static LOCALE: { TR: Locale, EN: Locale } = {TR: 'tr', EN: 'en'};

  static PAYMENT_GROUP: GroupToEnum<PaymentGroup> = {
    LISTING: 'LISTING',
    PRODUCT: 'PRODUCT',
    SUBSCRIPTION: 'SUBSCRIPTION'
  };

  static BASKET_ITEM_TYPE: GroupToEnum<ItemType> = {
    VIRTUAL: 'VIRTUAL',
    PHYSICAL: 'PHYSICAL'
  }

  static PAYMENT_CHANNEL: GroupToEnum<PaymentChannel> = {
    WEB: 'WEB',
    MOBILE: 'MOBILE',
    MOBILE_ANDROID: 'MOBILE_ANDROID',
    MOBILE_IOS: 'MOBILE_IOS',
    MOBILE_PHONE: 'MOBILE_PHONE',
    MOBILE_TABLET: 'MOBILE_TABLET',
    MOBILE_WEB: 'MOBILE_WEB',
    MOBILE_WINDOWS: 'MOBILE_WINDOWS'
  }

  static SUB_MERCHANT_TYPE: GroupToEnum<SUB_MERCHANT_TYPE> = {
    LIMITED_OR_JOINT_STOCK_COMPANY: 'LIMITED_OR_JOINT_STOCK_COMPANY',
    PERSONAL: 'PERSONAL',
    PRIVATE_COMPANY: 'PRIVATE_COMPANY'
  }
  static CURRENCY: GroupToEnum<Currency> = {
    CHF: 'CHF',
    EUR: 'EUR',
    GBP: 'GBP',
    IRR: 'IRR',
    NOK: 'NOK',
    RUB: 'RUB',
    TRY: 'TRY',
    USD: 'USD'
  }
  static APM_TYPE: GroupToEnum<APM_TYPE> = {
    GIROPAY: 'GIROPAY',
    IDEAL: 'IDEAL',
    QIWI: 'QIWI',
    SOFORT: 'SOFORT'
  }

  static REFUND_REASON: GroupToEnumUpper<REFUND_REASON> = {
    BUYER_REQUEST: 'buyer_request',
    DOUBLE_PAYMENT: 'double_payment',
    FRAUD: 'fraud',
    OTHER: 'other'
  }

  static PLAN_PAYMENT_TYPE: { RECURRING: "RECURRING" } = { RECURRING: "RECURRING" };

  static SUBSCRIPTION_PRICING_PLAN_INTERVAL: GroupToEnum<SUBSCRIPTION_PRICING_PLAN_INTERVAL> = {
    DAILY: 'DAILY',
    MONTHLY: 'MONTHLY',
    WEEKLY: 'WEEKLY',
    YEARLY: 'YEARLY'
  }
  static SUBSCRIPTION_UPGRADE_PERIOD: { NOW: 'NOW' } = { NOW: 'NOW' };

  static SUBSCRIPTION_STATUS: GroupToEnum<SUBSCRIPTION_STATUS> = {
    ACTIVE: 'ACTIVE',
    CANCELED: 'CANCELED',
    EXPIRED: 'EXPIRED',
    PENDING: 'PENDING',
    UNPAID: 'UNPAID',
    UPGRADED: 'UPGRADED'
  }

  static SUBSCRIPTION_INITIAL_STATUS: GroupToEnum<SUBSCRIPTION_INITIAL_STATUS> = {
    ACTIVE: 'ACTIVE',
    PENDING: 'PENDING'
  }

}