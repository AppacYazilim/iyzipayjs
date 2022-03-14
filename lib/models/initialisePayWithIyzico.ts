
import CommonRequest from "../types/commonRequest";
import { Currency, PaymentChannel, PaymentGroup } from "../types/iyzicoConstants";
import formatPrice from "../utils/formatPrice";
import { Address, AddressValidator } from "./address";
import BasketItem, { BasketItemValidator } from "./basketItem";
import Buyer, { BuyerValidator } from "./buyer";
import PaymentCard, { PaymentCardValidator } from "./paymentCard";

export default interface InitialisePayWithIyzico extends CommonRequest {
  price: string,
  paidPrice: string,
  paymentChannel: PaymentChannel,
  basketId: string,
  paymentGroup?: PaymentGroup,
  buyer: Buyer,
  shippingAddress?: Address,
  billingAddress: Address,
  basketItems: BasketItem[],
  paymentSource?: 'SHOPIFY' | 'MAGENTO' | 'PRESTASHOP' | 'WOOCOMMERCE' | 'OPENCART',
  currency: Currency,
  posOrderId?: string,
  callbackUrl: string
}


export function InitialisePayWithIyzicoValidator(data: InitialisePayWithIyzico) {
  return {
    locale: data['locale'],
    conversationId: data['conversationId'],
    price: formatPrice(data['price']),
    basketId: data['basketId'],
    paymentGroup: data['paymentGroup'],
    buyer: BuyerValidator(data['buyer']),
    shippingAddress: data['shippingAddress'] ? AddressValidator(data['shippingAddress']) : undefined,
    billingAddress: AddressValidator(data['billingAddress']),
    basketItems: data['basketItems'].map(function (basketItem) {
      return BasketItemValidator(basketItem);
    }),
    callbackUrl: data['callbackUrl'],
    paymentSource: data['paymentSource'],
    currency: data["currency"],
    posOrderId: data['posOrderId'],
    paidPrice: formatPrice(data['paidPrice']),




  }
}