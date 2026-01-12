export interface SuccessResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

export function successResponse<T>(
  data: T,
  message = 'Request successful',
  statusCode = 200,
): SuccessResponse<T> {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
}
