/**
 * Chatwoot conversation management tools
 */
import { z } from "zod";
import { ResponseFormat } from "../constants.js";
/**
 * Schema for listing conversations
 */
export declare const ListConversationsSchema: z.ZodObject<{
    account_id: z.ZodNumber;
} & {
    page: z.ZodDefault<z.ZodNumber>;
} & {
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof ResponseFormat>>;
} & {
    status: z.ZodDefault<z.ZodEnum<["open", "resolved", "pending", "snoozed", "all"]>>;
    assignee_type: z.ZodOptional<z.ZodEnum<["me", "unassigned", "all"]>>;
    inbox_id: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    account_id: number;
    page: number;
    status: "open" | "resolved" | "pending" | "all" | "snoozed";
    response_format: ResponseFormat;
    inbox_id?: number | undefined;
    assignee_type?: "all" | "me" | "unassigned" | undefined;
}, {
    account_id: number;
    inbox_id?: number | undefined;
    page?: number | undefined;
    status?: "open" | "resolved" | "pending" | "all" | "snoozed" | undefined;
    response_format?: ResponseFormat | undefined;
    assignee_type?: "all" | "me" | "unassigned" | undefined;
}>;
export type ListConversationsInput = z.infer<typeof ListConversationsSchema>;
/**
 * List conversations from Chatwoot
 */
export declare function listConversations(params: ListConversationsInput): Promise<{
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
        conversations: any;
        meta: {
            current_page: any;
            all_count: any;
            mine_count: any;
            unassigned_count: any;
        };
    };
}>;
/**
 * Schema for getting a single conversation
 */
export declare const GetConversationSchema: z.ZodObject<{
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
export type GetConversationInput = z.infer<typeof GetConversationSchema>;
/**
 * Get a single conversation with full details
 */
export declare function getConversation(params: GetConversationInput): Promise<{
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
        inbox_id: any;
        status: any;
        contact: {
            id: any;
            name: any;
            email: any;
            phone_number: any;
        };
        assignee: {
            id: any;
            name: any;
            email: any;
        } | null;
        unread_count: any;
        last_activity_at: any;
        messages_count: any;
        labels: any;
        custom_attributes: any;
    };
}>;
//# sourceMappingURL=conversations.d.ts.map