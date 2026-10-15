// src/practices/1-05-private-dependencies/answers/main.js
import { MenuRepository } from '#repositories';
import { SmsProvider } from './sms-provider.js';
import { OrderService } from './order-service.js';

const orderService = new OrderService({
  menuRepository: new MenuRepository(),
  messageProvider: new SmsProvider({ phone: '010-1234-5678' }),
});

async function orderAmericano() {
  try {
    await orderService.order({ menuId: 1, quantity: 2 });
  } catch (error) {
    console.log(`주문 실패 (${error.message})`);
  }
}

console.log('바깥에서 보이는 속성:', Object.keys(orderService));
await orderAmericano();

// 클래스 바깥의 코드가 menuRepository를 가격이 0원인 메뉴를 돌려주는 객체로 바꿉니다.
orderService.menuRepository = {
  async findById(id) {
    return { id, name: '아메리카노', price: 0 };
  },
};

console.log('바깥에서 menuRepository를 바꾼 뒤');
await orderAmericano();
