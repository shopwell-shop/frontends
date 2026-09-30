/**
 * Validates that the required environment variables are set for admin API authentication.
 *
 * If `SHOPWELL_ADMIN_CLIENT_SECRET` or `SHOPWELL_ADMIN_CLIENT_ID` is present,
 * assumes client_credentials grant type and requires `SHOPWELL_ADMIN_CLIENT_SECRET`.
 *
 * Otherwise, assumes password grant type and requires `SHOPWELL_ADMIN_USERNAME`
 * and `SHOPWELL_ADMIN_PASSWORD`.
 *
 * @returns array of missing environment variable names
 */
export function validateAdminEnvVars(
  env: Record<string, string | undefined>,
): string[] {
  const hasClientSecret = !!env.SHOPWELL_ADMIN_CLIENT_SECRET?.trim();
  const hasClientId = !!env.SHOPWELL_ADMIN_CLIENT_ID?.trim();

  if (hasClientSecret || hasClientId) {
    // client_credentials flow — both CLIENT_ID and CLIENT_SECRET are required
    const missing: string[] = [];
    if (!hasClientId) {
      missing.push("SHOPWELL_ADMIN_CLIENT_ID");
    }
    if (!hasClientSecret) {
      missing.push("SHOPWELL_ADMIN_CLIENT_SECRET");
    }
    return missing;
  }

  // password flow — both username and password are required
  const missing: string[] = [];
  if (!env.SHOPWELL_ADMIN_USERNAME) {
    missing.push("SHOPWELL_ADMIN_USERNAME");
  }
  if (!env.SHOPWELL_ADMIN_PASSWORD) {
    missing.push("SHOPWELL_ADMIN_PASSWORD");
  }
  return missing;
}
