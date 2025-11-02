export interface DBTCheckPayload {
  name: string;
  aadhaar: string;
  account: string;
  bank?: string;
}

export interface DBTCheckResponse {
  message: string;
  status?: 'ready' | 'not-ready';
}