export type ApiValidationError = {
  field: string;
  message: string;
};

export type ApiError = {
  success: false;
  message: string;
  errors?: ApiValidationError[];
};
