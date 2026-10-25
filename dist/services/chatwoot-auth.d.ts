/**
 * Chatwoot JWT Authentication
 *
 * Chatwoot uses devise_token_auth which requires:
 * - uid (email)
 * - client
 * - access-token
 * - expiry
 */
export interface ChatwootAuthTokens {
    uid: string;
    client: string;
    accessToken: string;
    expiry: string;
}
export interface ChatwootLoginCredentials {
    email: string;
    password: string;
}
/**
 * Login to Chatwoot and get JWT tokens
 */
export declare function loginToChatwoot(baseUrl: string, credentials: ChatwootLoginCredentials): Promise<ChatwootAuthTokens>;
/**
 * Check if tokens are still valid
 */
export declare function areTokensValid(tokens: ChatwootAuthTokens): boolean;
//# sourceMappingURL=chatwoot-auth.d.ts.map