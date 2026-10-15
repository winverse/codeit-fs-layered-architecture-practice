import { createHash } from 'node:crypto';

// 실습용: bcrypt 대신 Node.js 내장 crypto 모듈의 SHA-256으로 해시합니다.
export class PasswordProvider {
  async hash(password) {
    return createHash('sha256').update(password).digest('hex');
  }

  async compare(password, hashedPassword) {
    const hashedInput = await this.hash(password);
    return hashedInput === hashedPassword;
  }
}
