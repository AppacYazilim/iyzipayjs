import Payment from "./resources/payment";
import IyzicoPayment from "./resources/payWithIyzico";
import Refund from "./resources/refund";
import SubscriptionProduct from "./resources/subscriptionProduct";
import UniversalCardStorage from "./resources/universalCardStorage";
import { IyzicoCredentials } from "./types/iyzicoCredentials";

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
    this.refund = Refund(this._config);
    this.subscriptionProduct = SubscriptionProduct(this._config);
    this.universalCardStorage = UniversalCardStorage(this._config);
  }

  public payment: ReturnType<typeof Payment>;
  public iyzicoPayment: ReturnType<typeof IyzicoPayment>;
  public refund: ReturnType<typeof Refund>;
  public subscriptionProduct: ReturnType<typeof SubscriptionProduct>
  public universalCardStorage: ReturnType<typeof UniversalCardStorage>;

  private _validateIyzipayOptions() {
    if (typeof this._config["uri"] === "undefined" || this._config["uri"] === "") throw new TypeError("uri cannot be empty");
    if (typeof this._config["apiKey"] === "undefined" || this._config["apiKey"] === "") throw new TypeError("apiKey cannot be empty");
    if (typeof this._config["secretKey"] === "undefined" || this._config["secretKey"] === "") throw new TypeError("secretKey cannot be empty");
  }
}