import { ItemType } from "../types/iyzicoConstants";
import formatPrice from "../utils/formatPrice";

export default interface BasketItem {
  id: string,
  price: string,
  name: string,
  category1: string,
  category2?: string,
  itemType: ItemType,
  subMerchantKey?: string,
  subMerchantPrice?: string
}


export function BasketItemValidator(data: BasketItem) {
  return {
    id: data["id"],
    price: formatPrice(data["price"]),
    name: data["name"],
    category1: data["category1"],
    category2: data["category2"] ?? undefined,
    itemType: data["itemType"],
    subMerchantKey: data["subMerchantKey"] ?? undefined,
    subMerchantPrice: data["subMerchantPrice"] ? formatPrice(data["subMerchantPrice"]) : undefined
  }
}