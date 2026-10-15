// src/practices/1-10-mock-injection/order-service.js
import { MenuRepository } from '#repositories';
import { SmsProvider } from './sms-provider.js';

export class OrderService {
  // TODO 1: 두 의존성을 클래스 안에서 만들지 말고 생성자로 전달받아 보관합니다.
  #menuRepository = new MenuRepository();
  #messageProvider = new SmsProvider({ phone: '010-1234-5678' });

  async order({ menuId, quantity }) {
    const menu = await this.#menuRepository.findById(menuId);
    // 실습을 위해 메뉴가 없을 때의 예외 처리와 주문 저장은 생략합니다.
    this.#messageProvider.send(
      `${menu.name} ${quantity}잔 주문 완료(${menu.price * quantity}원)`,
    );
  }
}
