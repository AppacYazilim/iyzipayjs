export default interface Buyer {
  id: string,
  name: string,
  surname: string,
  identityNumber: string,
  email: string,
  gsmNumber: string,
  registrationDate: string,
  lastLoginDate: string,
  registrationAddress: string,
  city: string,
  country: string,
  zipCode: string,
  ip: string
}


export function BuyerValidator(data: Buyer) {
  return {
    id: data["id"],
    name: data["name"],
    surname: data["surname"],
    identityNumber: data["identityNumber"],
    email: data["email"],
    gsmNumber: data["gsmNumber"],
    registrationDate: data["registrationDate"],
    lastLoginDate: data["lastLoginDate"],
    registrationAddress: data["registrationAddress"],
    city: data["city"],
    country: data["country"],
    zipCode: data["zipCode"],
    ip: data["ip"]
  };
}