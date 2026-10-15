// src/practices/1-05-private-dependencies/answers/order-service.js
export class OrderService {
  #menuRepository;
  #messageProvider;

  constructor({ menuRepository, messageProvider }) {
    this.#menuRepository = menuRepository;
    this.#messageProvider = messageProvider;
  }

  async order({ menuId, quantity }) {
    const menu = await this.#menuRepository.findById(menuId);
    // 실습을 위해 메뉴가 없을 때의 예외 처리와 주문 저장은 생략합니다.
    this.#messageProvider.send(
      `${menu.name} ${quantity}잔 주문 완료(${menu.price * quantity}원)`,
    );
  }
}
