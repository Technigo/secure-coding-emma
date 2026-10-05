import crypto from 'node:crypto';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const actual = Buffer.from(hashPassword(password), 'hex');
  const expected = Buffer.from(storedHash, 'hex');
  return (
    actual.length === expected.length &&
    crypto.timingSafeEqual(actual, expected)
  );
}
