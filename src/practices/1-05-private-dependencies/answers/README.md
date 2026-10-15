# 1장 05 실습 정답과 해설

## 1. `sms-provider.js`

```javascript
export class SmsProvider {
  #phone;

  constructor({ phone }) {
    this.#phone = phone;
  }

  send(text) {
    console.log(`[문자 → ${this.#phone}] ${text}`);
  }
}
```

## 2. `order-service.js`

```javascript
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
```

## 3. `main.js`

맨 위에 두 `import`를 더하고, `new OrderService({})` 줄을 다음 코드로 바꿉니다.

```javascript
import { MenuRepository } from '#repositories';
import { SmsProvider } from './sms-provider.js';
import { OrderService } from './order-service.js';

const orderService = new OrderService({
  menuRepository: new MenuRepository(),
  messageProvider: new SmsProvider({ phone: '010-1234-5678' }),
});
```

## 해설

- `OrderService`는 메뉴를 어디서 찾는지, 메시지를 어떻게 보내는지 직접 정하지 않습니다. `main.js`가 만든 `MenuRepository`와 `SmsProvider` 객체를 생성자로 받아 필드에 보관하고, `order`는 그 필드의 `findById`와 `send`를 호출할 뿐입니다. 그래서 출력되는 메시지의 가격은 `MenuRepository`가, `[문자 → 010-1234-5678]` 형식은 `SmsProvider`가 정합니다.
- `#private` 필드는 인스턴스의 속성이 아니므로 `Object.keys(orderService)`에 나타나지 않고, 클래스 바깥에서 읽거나 바꿀 수 없습니다. `main.js`의 `orderService.menuRepository = { ... }`는 `#menuRepository`가 아니라 같은 이름의 새 일반 속성을 만들 뿐이므로, `order`는 처음 보관한 `MenuRepository`로 계속 9000원을 계산합니다.
- 생성자로 전달받은 객체를 `this.menuRepository`처럼 일반 속성에 보관하면 바깥 코드가 그 참조를 바꿀 수 있어, 바꾼 뒤의 주문이 0원으로 출력됩니다.

## 자주 하는 실수

- `main.js`에서 `messageProvider` 대신 `smsProvider`처럼 다른 이름으로 넘기면, `OrderService`의 생성자는 `messageProvider`를 `undefined`로 받아 `Cannot read properties of undefined (reading 'send')`가 납니다.
- `findById` 앞의 `await`를 빠뜨리면 `menu`에 메뉴 대신 Promise가 담겨 `[문자 → 010-1234-5678] undefined 2잔 주문 완료(NaN원)`이 출력됩니다.
- `SmsProvider`의 생성자에서 `phone`을 보관하지 않거나 `main.js`에서 `{ phone: ... }`을 넘기지 않으면 `[문자 → undefined]`로 출력됩니다.
