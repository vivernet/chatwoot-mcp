/**
 * Chatwoot message management tools
 */
import { z } from "zod";
import { ResponseFormat } from "../constants.js";
/**
 * Schema for listing messages in a conversation
 */
export declare const ListMessagesSchema: z.ZodObject<{
    account_id: z.ZodNumber;
} & {
    conversation_id: z.ZodNumber;
} & {
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    account_id: number;
    conversation_id: number;
    response_format: ResponseFormat;
}, {
    account_id: number;
    conversation_id: number;
    response_format?: ResponseFormat | undefined;
}>;
export type ListMessagesInput = z.infer<typeof ListMessagesSchema>;
/**
 * List all messages in a conversation
 */
export declare function listMessages(params: ListMessagesInput): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent?: undefined;
} | {
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent: {
        conversation_id: number;
        messages: any;
    };
}>;
/**
 * Schema for creating a message
 */
export declare const CreateMessageSchema: z.ZodObject<{
    account_id: z.ZodNumber;
} & {
    conversation_id: z.ZodNumber;
    content: z.ZodString;
    message_type: z.ZodDefault<z.ZodEnum<["outgoing", "incoming"]>>;
    private: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    account_id: number;
    conversation_id: number;
    content: string;
    message_type: "outgoing" | "incoming";
    private: boolean;
}, {
    account_id: number;
    conversation_id: number;
    content: string;
    message_type?: "outgoing" | "incoming" | undefined;
    private?: boolean | undefined;
}>;
export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;
/**
 * Create a new message in a conversation
 */
export declare function createMessage(params: CreateMessageInput): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent?: undefined;
} | {
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent: {
        id: any;
        content: any;
        message_type: any;
        created_at: any;
        conversation_id: number;
        private: any;
    };
}>;
//# sourceMappingURL=messages.d.ts.map