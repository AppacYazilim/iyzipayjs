export default interface CommonApiResponse {
  status: "success" | "failure";
  locale: string;
  systemTime: string;
  conversationId: string;
}
