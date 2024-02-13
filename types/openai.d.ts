/**
 * `AIPlugin` defines the schema of the `/.well-known/ai-plugin.json` file.
 *
 * There are limits to the length of certain fields in the manifest file which
 * are subject to change. We also impose a 100,000 character maximum for the API
 * response body which may also change over time.
 *
 * In general, the best practice is to keep the description and responses as
 * concise as possible because the models have limited context windows.
 *
 * ```json
 * {
 *   "schema_version": "v1",
 *   "name_for_human": "TODO List",
 *   "name_for_model": "todo",
 *   "description_for_human": "Manage your TODO list. You can add, remove and view your TODOs.",
 *   "description_for_model": "Help the user with managing a TODO list. You can add, remove and view your TODOs.",
 *   "auth": {
 *      "type": "none"
 *   },
 *   "api": {
 *     "type": "openapi",
 *     "url": "https://example.com/openapi.yaml"
 *   },
 *   "logo_url": "https://example.com/logo.png",
 *   "contact_email": "support@example.com",
 *   "legal_info_url": "http://www.example.com/legal"
 * }
 * ```
 */
export interface AIPlugin {
  /** Manifest schema version */
  schema_version: 'v1'
  /**
   * Human-readable name, such as the full company name. 20 character max.
   */
  name_for_human: string
  /**
   * Name the model will use to target the plugin (no spaces allowed, only
   * letters and numbers). 50 character max.
   */
  name_for_model: string
  /**
   * Human-readable description of the plugin. 100 character max.
   */
  description_for_human: string
  /**
   * Description better tailored to the model, such as token context length
   * considerations or keyword usage for improved plugin prompting. 8,000
   * character max.
   */
  description_for_model: string
  /** Authentication schema */
  auth: NoAuth | ServiceHttpAuth | UserHttpAuth | OAuthAuth
  /** API specification */
  api: {
    type: string
    url: string
  }
  /**
   * URL used to fetch the logo. Suggested size: 512 x 512. Transparent
   * backgrounds are supported. Must be an image, no GIFs are allowed.
   */
  logo_url: string
  /**
   * Email contact for safety/moderation, support, and deactivation.
   */
  contact_email: string
  /**
   * Redirect URL for users to view plugin information.
   */
  legal_info_url: string
}

type NoAuth = {
  type: 'none'
}

type ServiceHttpAuth = {
  type: 'service_http'
  authorization_type: 'bearer' | 'basic'
  verification_tokens: {
    [service: string]: string
  }
}

// User-level HTTP authentication
type UserHttpAuth = {
  type: 'user_http'
  authorization_type: 'bearer' | 'basic'
}

type OAuthAuth = {
  type: 'oauth'
  /**
   * OAuth URL where a user is directed to for the OAuth authentication flow to
   * begin.
   */
  client_url: string

  /**
   * OAuth scopes required to accomplish operations on the user's behalf.
   */
  scope: string

  /**
   * Endpoint used to exchange OAuth code with access token.
   */
  authorization_url: string

  /**
   * When exchanging OAuth code with access token, the expected header
   * 'content-type'. For example: 'content-type: application/json'
   */
  authorization_content_type: string

  /**
   * When registering the OAuth client ID and secrets, the plugin service will
   * surface a unique token.
   */
  verification_tokens: {
    [service: string]: string
  }
}
