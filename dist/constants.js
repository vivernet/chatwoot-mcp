/**
 * Shared constants for the Chatwoot MCP server
 */
/** Maximum response size in characters */
export const CHARACTER_LIMIT = 25000;
/** Response format options */
export var ResponseFormat;
(function (ResponseFormat) {
    ResponseFormat["MARKDOWN"] = "markdown";
    ResponseFormat["JSON"] = "json";
})(ResponseFormat || (ResponseFormat = {}));
/** Default pagination limit */
export const DEFAULT_LIMIT = 20;
/** Maximum pagination limit */
export const MAX_LIMIT = 100;
//# sourceMappingURL=constants.js.map