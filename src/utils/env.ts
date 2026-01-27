function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const GOOGLE_CLIENT_ID = getEnv('GOOGLE_CLIENT_ID');
export const GOOGLE_CLIENT_SECRET = getEnv('GOOGLE_CLIENT_SECRET');