


export default function formatPrice(price: string): string {
  const resultPrice = parseFloat(price).toString();
  if (-1 === resultPrice.indexOf(".")) {
    return resultPrice + ".0";
  }
  return resultPrice;
}