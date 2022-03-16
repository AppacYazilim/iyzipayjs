import CommonRequest from "../types/commonRequest";




export default interface SubscriptionProduct extends CommonRequest {
  name: string;
  description?: string;
}




export function SubscriptionProductValidator(data: SubscriptionProduct) {
  return {
    locale: data["locale"],
    conversationId: data["conversationId"],
    name: data["name"],
    description: data["description"]
  };
}


