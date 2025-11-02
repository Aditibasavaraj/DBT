export type DBTCheckPayload = {
  name: string;
  aadhaar: string;
  account: string;
  bank?: string;
};

export type DBTCheckResponse = {
  message: string;
  status?: 'ready' | 'not-ready';
};

export type DBTStatus = {
  isReady: boolean;
  message: string;
};