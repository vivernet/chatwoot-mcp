/**
 * Common Zod schemas used across multiple tools
 */
import { z } from "zod";
import { ResponseFormat } from "../constants.js";
/**
 * Pagination schema for list operations
 */
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
}, {
    page?: number | undefined;
}>;
/**
 * Response format schema
 */
export declare const ResponseFormatSchema: z.ZodObject<{
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof ResponseFormat>>;
}, "strip", z.ZodTypeAny, {
    response_format: ResponseFormat;
}, {
    response_format?: ResponseFormat | undefined;
}>;
/**
 * Account ID schema
 */
export declare const AccountIdSchema: z.ZodObject<{
    account_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    account_id: number;
}, {
    account_id: number;
}>;
//# sourceMappingURL=common.d.ts.map