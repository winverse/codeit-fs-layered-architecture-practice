// src/practices/1-10-mock-injection/main.js
import { MenuRepository } from '#repositories';
import { SmsProvider } from './sms-provider.js';
import { EmailProvider } from './email-provider.js';
import { OrderService } from './order-service.js';
import { mockMenuRepository, mockMessageProvider } from './mocks.js';

async function orderAmericano(orderService) {
  try {
    await orderService.order({ menuId: 1, quantity: 2 });
  } catch (error) {
    console.log(`주문 실패 (${error.message})`);
  }
}

// 같은 OrderService 클래스에 넘기는 객체만 바꿔 세 번 주문합니다.
const smsOrderService = new OrderService({
  menuRepository: new MenuRepository(),
  messageProvider: new SmsProvider({ phone: '010-1234-5678' }),
});
const emailOrderService = new OrderService({
  menuRepository: new MenuRepository(),
  messageProvider: new EmailProvider({ email: 'kim@codeit.kr' }),
});
const mockOrderService = new OrderService({
  menuRepository: mockMenuRepository,
  messageProvider: mockMessageProvider,
});

await orderAmericano(smsOrderService);
await orderAmericano(emailOrderService);
await orderAmericano(mockOrderService);
console.log('모의 객체에 기록된 메시지:', mockMessageProvider.sentTexts);
