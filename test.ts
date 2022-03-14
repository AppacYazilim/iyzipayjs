import Iyzipay from "./lib/iyzipay";


// Example:
const iyzipay = new Iyzipay({
  uri: "https://sandbox-api.iyzipay.com",
  apiKey: "sandbox-pAJb0pQvHFSPdaWLO08qFFiwy9CDuUPW",
  secretKey: "sandbox-GHrr3GwwoDCOgHjIeiWvbdPvWEgVX8HH"
});


async function test() {

  // const payment = await iyzipay.iyzicoPayment.create({
  //   locale: 'tr',
  //   conversationId: '123456789',
  //   price: '1.0',
  //   paidPrice: '1.0',
  //   basketId: 'B67832',
  //   paymentChannel: 'WEB',
  //   paymentGroup: 'PRODUCT',
  //   buyer: {
  //     id: 'BY789',
  //     name: 'John',
  //     surname: 'Doe',
  //     gsmNumber: '+905350000000',
  //     email: 'email@email.com',
  //     identityNumber: '74300864791',
  //     lastLoginDate: '2015-10-05 12:43:35',
  //     registrationDate: '2013-04-21 15:12:09',
  //     registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
  //     ip: '85.34.78.112',
  //     city: 'Istanbul',
  //     country: 'Turkey',
  //     zipCode: '34732'
  //   },
  //   shippingAddress: {
  //     contactName: 'Jane Doe',
  //     city: 'Istanbul',
  //     country: 'Turkey',
  //     address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
  //     zipCode: '34742'
  //   },
  //   billingAddress: {
  //     contactName: 'Jane Doe',
  //     city: 'Istanbul',
  //     country: 'Turkey',
  //     address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
  //     zipCode: '34742'
  //   },
  //   basketItems: [
  //     {
  //       id: 'BI101',
  //       name: 'Binocular',
  //       category1: 'Collectibles',
  //       category2: 'Accessories',
  //       itemType: 'PHYSICAL',
  //       price: '0.3'
  //     },
  //     {
  //       id: 'BI102',
  //       name: 'Game code',
  //       category1: 'Game',
  //       category2: 'Online Game Items',
  //       itemType: 'VIRTUAL',
  //       price: '0.5'
  //     },
  //     {
  //       id: 'BI103',
  //       name: 'Usb',
  //       category1: 'Electronics',
  //       category2: 'Usb / Cable',
  //       itemType: 'PHYSICAL',
  //       price: '0.2'
  //     }
  //   ],
  //   currency: Iyzipay.CURRENCY.TRY,
  //   callbackUrl: 'https://appac.ltd/test',
  // })


  // if(payment.status === 'success') {
  //   console.log(payment.payWithIyzicoPageUrl);
  // } else {
  //   console.log(payment.errorMessage);
  // }


  const token = '0962f57c-9738-4766-8383-46fcf7b7bad3';


  const paymentDetails = await iyzipay.iyzicoPayment.retrive({
    token: token,
    locale: 'tr',
    conversationId: '123456789'
  });

  // paymentDetails.paymentStatus

  console.log(paymentDetails);


  if(paymentDetails.status === 'failure') {
    // console.log(paymentDetails);
  }


}














test();
/*
{
  locale: 'tr',
  conversationId: '123456789',
  price: '1',
  paidPrice: '1.2',
  currency: 'TRY',
  installment: '1',
  basketId: 'B67832',
  paymentChannel: 'WEB',
  paymentGroup: 'PRODUCT',
  paymentCard: {
    cardHolderName: 'John Doe',
    cardNumber: '5528790000000008',
    expireMonth: '12',
    expireYear: '2030',
    cvc: '123',
    registerCard: '0'
  },
  buyer: {
    id: 'BY789',
    name: 'John',
    surname: 'Doe',
    gsmNumber: '+905350000000',
    email: 'email@email.com',
    identityNumber: '74300864791',
    lastLoginDate: '2015-10-05 12:43:35',
    registrationDate: '2013-04-21 15:12:09',
    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    ip: '85.34.78.112',
    city: 'Istanbul',
    country: 'Turkey',
    zipCode: '34732'
  },
  shippingAddress: {
    contactName: 'Jane Doe',
    city: 'Istanbul',
    country: 'Turkey',
    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    zipCode: '34742'
  },
  billingAddress: {
    contactName: 'Jane Doe',
    city: 'Istanbul',
    country: 'Turkey',
    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    zipCode: '34742'
  },
  basketItems: [
    {
      id: 'BI101',
      name: 'Binocular',
      category1: 'Collectibles',
      category2: 'Accessories',
      itemType: 'PHYSICAL',
      price: '0.3'
    },
    {
      id: 'BI102',
      name: 'Game code',
      category1: 'Game',
      category2: 'Online Game Items',
      itemType: 'VIRTUAL',
      price: '0.5'
    },
    {
      id: 'BI103',
      name: 'Usb',
      category1: 'Electronics',
      category2: 'Usb / Cable',
      itemType: 'PHYSICAL',
      price: '0.2'
    }
  ]
}
*/