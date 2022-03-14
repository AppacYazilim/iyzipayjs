export default interface CommonApiResponse {
  errorMessage?: string;
  status: 'success' | 'failure';
  locale: string;
  systemTime: string;
  conversationId: string;
}