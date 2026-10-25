/**
 * Token cache to avoid storing passwords
 * Stores JWT tokens in a local file
 */
import type { ChatwootAuthTokens } from "./chatwoot-auth.js";
/**
 * Save tokens to cache
 */
export declare function saveTokens(baseUrl: string, email: string, tokens: ChatwootAuthTokens): Promise<void>;
/**
 * Load tokens from cache
 */
export declare function loadTokens(baseUrl: string, email: string): Promise<ChatwootAuthTokens | null>;
/**
 * Clear token cache
 */
export declare function clearTokens(): Promise<void>;
//# sourceMappingURL=token-cache.d.ts.map