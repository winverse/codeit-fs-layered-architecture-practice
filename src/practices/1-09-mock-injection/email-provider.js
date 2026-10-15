// src/practices/1-09-mock-injection/email-provider.js
// 실습용: 이메일 발송 라이브러리 대신 보낼 이메일을 터미널에 출력합니다.
export class EmailProvider {
  #email;

  constructor({ email }) {
    this.#email = email;
  }

  send(text) {
    console.log(`[이메일 → ${this.#email}] ${text}`);
  }
}
