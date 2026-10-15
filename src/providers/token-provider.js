import { Buffer } from 'node:buffer';

// 실습용: jsonwebtoken 대신 서명 없이 토큰 내용을 Base64URL 문자열로 바꿉니다.
function encode(payload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export class TokenProvider {
  generateTokens(user) {
    return {
      accessToken: encode({ userId: user.id, type: 'access' }),
      refreshToken: encode({ userId: user.id, type: 'refresh' }),
    };
  }
}
