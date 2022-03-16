

export default interface PaymentCard {
  cardHolderName?: string,
  cardNumber?: string,
  expireYear?: string,
  expireMonth?: string,
  cvc?: string,
  registerCard?: string,
  cardAlias?: string,
  cardToken?: string,
  cardUserKey?: string,
  consumerToken?: string,
  registerConsumerCard?: boolean,
  ucsToken?: string
}

export function PaymentCardValidator(data: PaymentCard) {
  return {
    cardHolderName: data["cardHolderName"],
    cardNumber: data["cardNumber"],
    expireYear: data["expireYear"],
    expireMonth: data["expireMonth"],
    cvc: data["cvc"],
    registerCard: data["registerCard"],
    cardAlias: data["cardAlias"],
    cardToken: data["cardToken"],
    cardUserKey: data["cardUserKey"],
    consumerToken: data["consumerToken"],
    registerConsumerCard: data["registerConsumerCard"],
    ucsToken: data["ucsToken"]
  };
}