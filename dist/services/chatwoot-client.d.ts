/**
 * Chatwoot API Client
 *
 * Supports both JWT (email/password) and API token authentication.
 * JWT tokens are cached to avoid re-authentication on every request.
 */
import createClient from "openapi-fetch";
import type { paths } from "../chatwoot-types.js";
export interface ChatwootClientConfig {
    /** Base URL of your Chatwoot instance */
    baseUrl: string;
    /** Method 1: API Access Token (recommended if available) */
    apiAccessToken?: string;
    /** Method 2: JWT Authentication (fallback) */
    email?: string;
    password?: string;
}
/**
 * Creates a configured Chatwoot API client.
 * Tries API token first, falls back to JWT authentication.
 */
export declare function createChatwootClient(config: ChatwootClientConfig): Promise<import("openapi-fetch").Client<paths, `${string}/${string}`>>;
export declare function initializeClient(config: ChatwootClientConfig): Promise<void>;
export declare function getClient(): ReturnType<typeof createClient<paths>>;
//# sourceMappingURL=chatwoot-client.d.ts.map