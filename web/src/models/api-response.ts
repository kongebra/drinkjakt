import { ErrorResponse } from "./error-response";

export type ApiResponse<T> = T | ErrorResponse;
