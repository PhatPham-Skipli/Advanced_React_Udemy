import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

// Secret key for JWT signing (in production, use process.env.JWT_SECRET)
const JWT_SECRET = 'my-super-secret-key-12345';

/**
 * Hash password with salt using PBKDF2
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
}

/**
 * Verify password against stored hash and salt
 */
export function verifyPassword(
  password: string,
  storedHash: string,
  storedSalt: string,
): boolean {
  const hash = crypto
    .pbkdf2Sync(password, storedSalt, 1000, 64, 'sha512')
    .toString('hex');
  return hash === storedHash;
}

export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token using jsonwebtoken library
 */
export function signJwt(payload: { sub: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

/**
 * Verify a JWT token using jsonwebtoken library
 */
export function verifyJwt(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}

/* =========================================================================
 * MANUAL JWT IMPLEMENTATION
 * =========================================================================
 *
 * export function signJwtManual(payload: { sub: string; email: string }): string {
 *   const header = {
 *     alg: 'HS256',
 *     typ: 'JWT',
 *   };
 *
 *   const now = Math.floor(Date.now() / 1000);
 *   const fullPayload: JwtPayload = {
 *     ...payload,
 *     iat: now,
 *     exp: now + 60 * 60 * 24, // 24 hours
 *   };
 *
 *   const base64UrlEncode = (obj: object) =>
 *     Buffer.from(JSON.stringify(obj))
 *       .toString('base64')
 *       .replace(/=/g, '')
 *       .replace(/\+/g, '-')
 *       .replace(/\//g, '_');
 *
 *   const encodedHeader = base64UrlEncode(header);
 *   const encodedPayload = base64UrlEncode(fullPayload);
 *
 *   const signature = crypto
 *     .createHmac('sha256', JWT_SECRET)
 *     .update(`${encodedHeader}.${encodedPayload}`)
 *     .digest('base64')
 *     .replace(/=/g, '')
 *     .replace(/\+/g, '-')
 *     .replace(/\//g, '_');
 *
 *   return `${encodedHeader}.${encodedPayload}.${signature}`;
 * }
 *
 * export function verifyJwtManual(token: string): JwtPayload | null {
 *   try {
 *     const parts = token.split('.');
 *     if (parts.length !== 3) return null;
 *
 *     const [encodedHeader, encodedPayload, signature] = parts;
 *
 *     const expectedSignature = crypto
 *       .createHmac('sha256', JWT_SECRET)
 *       .update(`${encodedHeader}.${encodedPayload}`)
 *       .digest('base64')
 *       .replace(/=/g, '')
 *       .replace(/\+/g, '-')
 *       .replace(/\//g, '_');
 *
 *     if (signature !== expectedSignature) {
 *       return null;
 *     }
 *
 *     const payloadJson = Buffer.from(encodedPayload, 'base64').toString('utf-8');
 *     const payload: JwtPayload = JSON.parse(payloadJson);
 *
 *     // Check expiration
 *     if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
 *       return null;
 *     }
 *
 *     return payload;
 *   } catch {
 *     return null;
 *   }
 * }
 * ========================================================================= */
