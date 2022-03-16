
import CommonRequest from "../types/commonRequest";
import { Currency, PaymentChannel, PaymentGroup } from "../types/iyzicoConstants";
import formatPrice from "../utils/formatPrice";
import { Address, AddressValidator } from "./address";
import BasketItem, { BasketItemValidator } from "./basketItem";
import Buyer, { BuyerValidator } from "./buyer";
import PaymentCard, { PaymentCardValidator } from "./paymentCard";

export default interface CreatePaymentRequest extends CommonRequest {
  price: string,
  paidPrice: string,
  installment?: string,
  paymentChannel: PaymentChannel,
  basketId: string,
  paymentGroup?: PaymentGroup,
  paymentCard: PaymentCard,
  buyer: Buyer,
  shippingAddress?: Address,
  billingAddress: Address,
  basketItems: BasketItem[],
  paymentSource?: "SHOPIFY" | "MAGENTO" | "PRESTASHOP" | "WOOCOMMERCE" | "OPENCART",
  currency: Currency,
  gsmNumber?: string,
  posOrderId?: string,
  connectorName?: string,
  callbackUrl?: string
}


export function CreatePaymentRequestValidator(data: CreatePaymentRequest) {
  return {
    locale: data["locale"],
    conversationId: data["conversationId"],
    price: formatPrice(data["price"]),
    paidPrice: formatPrice(data["paidPrice"]),
    installment: data["installment"],
    paymentChannel: data["paymentChannel"],
    basketId: data["basketId"],
    paymentGroup: data["paymentGroup"],
    paymentCard: PaymentCardValidator(data["paymentCard"]),
    buyer: BuyerValidator(data["buyer"]),
    shippingAddress: data["shippingAddress"] ? AddressValidator(data["shippingAddress"]) : undefined,
    billingAddress: AddressValidator(data["billingAddress"]),
    basketItems: data["basketItems"].map(function (basketItem) {
      return BasketItemValidator(basketItem);
    }),
    paymentSource: data["paymentSource"],
    currency: data["currency"],
    gsmNumber: data["gsmNumber"],
    posOrderId: data["posOrderId"],
    connectorName: data["connectorName"],
    callbackUrl: data["callbackUrl"]
  };
}