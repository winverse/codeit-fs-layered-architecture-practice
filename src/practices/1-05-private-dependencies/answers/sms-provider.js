// src/practices/1-05-private-dependencies/answers/sms-provider.js
// 실습용: 문자 발송 라이브러리 대신 보낼 문자를 터미널에 출력합니다.
export class SmsProvider {
  #phone;

  constructor({ phone }) {
    this.#phone = phone;
  }

  send(text) {
    console.log(`[문자 → ${this.#phone}] ${text}`);
  }
}
