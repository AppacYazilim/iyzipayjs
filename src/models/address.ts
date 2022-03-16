export interface Address {
  address: string,
  zipCode: string,
  contactName: string,
  city: string,
  country: string
}


export function AddressValidator(data: Address) {
  return {
    address: data["address"],
    zipCode: data["zipCode"],
    contactName: data["contactName"],
    city: data["city"],
    country: data["country"]
  };
}