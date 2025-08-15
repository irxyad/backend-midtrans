interface MidtransError {
  httpStatusCode?: number;
  ApiResponse?: { error_messages?: string[] };
  message?: string;
}
