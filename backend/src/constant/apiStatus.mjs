const API_STATUS_CODES = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  AUTHORIZATION_FAILED: 401,
  ERROR_CODE: 400,
  INTERNAL_SERVER_ERROR: 500,
  DUPLICATE_ENTRY: 11000,
};

const RESPONSE_MESSAGES = {
  SUCCESS: "Success",
  AUTHORIZATION_FAILED: "Authorization failed",
  DUPLICATE_ENTRY: "email already exist.",
  DATA_ADDED: "Data Added Successfully",
  DATA_UPDATE: "Data Updated",
  NOT_FOUND: "Data Not Found",
  SERVER_ERROR: "Server Error",
  NOT_MATCH: "Not Match",
  NOT_CREATED: "Eror Data not Create",
  PAYMENT_UPDATE: "Payment Updated",
  PAYMENT_NOT_UPDATE: "Payment not Updated",
  PURCHASED_SUBSCRIPTION: "You already purchased",
  MATCHED_AND_CREATED: "Email is matched and entry created",
  EMAIL_NOT_FOUND: "Email not found",
  UNEXPECTED_ERROR: "An unexpected error occurred",
  MISSING_PARAMETERS: "Missing required parameters",
  MESSAGE_POSTED: "Msg posted",
  SUCCESS_DELETED: "Data Deleted",
  FIELD_REQUIRED: "All Fields are required",
  ERROR_HASHING_PASSWORD: "Error hashing password",
  ERROR_COMPARE_PASSWORD: "Error comparing passwords",
  SIGNED_UP: "Signed up successfully",
  LOGIN: "Logged in successfully",
  FORBIDDEN: "Access denied. You do not have the required permissions.",
  INVALID_INPUT: "Invalid input: Expected an array of user objects.",
};

export { API_STATUS_CODES, RESPONSE_MESSAGES };
