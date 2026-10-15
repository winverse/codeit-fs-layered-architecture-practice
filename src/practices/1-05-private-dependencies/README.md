# 1장 05 실습: OrderService에 의존성 연결하고 보호하기

## 목표

카페 주문을 받는 `OrderService`에 메뉴를 찾는 `MenuRepository`와 주문 완료 문자를 보내는 `SmsProvider`를 연결합니다. 전달받은 두 객체를 `#private` 필드에 보관해 쓰면, 클래스 바깥의 코드가 같은 이름의 속성에 다른 객체를 대입해도 주문 결과가 바뀌지 않는지 실행 결과로 확인합니다.

## 시작하기

루트 `README.md`의 '설치와 첫 실행'을 마친 상태에서 실행합니다.

```bash
pnpm practice:1-05
```

다음 두 줄이 출력됩니다. 주문 메시지를 보내는 코드가 아직 없어 메시지 줄은 출력되지 않습니다.

```text
바깥에서 보이는 속성: []
바깥에서 menuRepository를 바꾼 뒤
```

## 수정할 파일과 시작 상태

다음 순서로 세 파일을 수정합니다. 할 일은 각 파일의 `TODO` 주석에 적혀 있습니다.

1. `src/practices/1-05-private-dependencies/sms-provider.js`: `SmsProvider` 클래스의 본문이 비어 있습니다.
2. `src/practices/1-05-private-dependencies/order-service.js`: `OrderService`는 생성자로 `menuRepository`와 `messageProvider`를 전달받지만 아직 보관하지 않고, `order`도 비어 있습니다.
3. `src/practices/1-05-private-dependencies/main.js`: `new OrderService({})`처럼 아무 객체도 넘기지 않습니다.

제공되는 `MenuRepository`(`#repositories`)의 `findById(id)`는 메뉴 객체(`id`, `name`, `price`)를 돌려주며, 1번 메뉴는 가격이 4500인 아메리카노입니다. `main.js`의 나머지 코드는 제공되며, `Object.keys(orderService)`로 바깥에서 보이는 속성을 출력하고 아메리카노 2잔을 주문한 뒤 다음 코드로 `menuRepository`를 바꾸고 다시 주문합니다. 이 대입 코드는 고치지 않습니다.

```javascript
// 클래스 바깥의 코드가 menuRepository를 가격이 0원인 메뉴를 돌려주는 객체로 바꿉니다.
orderService.menuRepository = {
  async findById(id) {
    return { id, name: '아메리카노', price: 0 };
  },
};
```

## 구현 내용

1. `sms-provider.js`: 받는 전화번호를 보관할 `#phone` 필드를 선언하고, 생성자에서 `{ phone }`으로 전달받은 값을 보관합니다. `send(text)`는 `[문자 → 전화번호] text` 형식의 한 줄을 출력합니다.
2. `order-service.js`: `#menuRepository`, `#messageProvider` 필드를 선언하고, 생성자에서 전달받은 두 객체를 보관합니다.
3. `order-service.js`: `order`에서 바깥에서 받아 필드에 보관한 두 객체를 호출합니다. `#menuRepository`의 `findById(menuId)`는 Promise를 돌려주므로 `await`로 메뉴를 받고, `#messageProvider`의 `send(text)`로 `아메리카노 2잔 주문 완료(9000원)`처럼 메뉴 이름, 수량, 금액(가격 × 수량)을 담은 문자열을 보냅니다.
4. `main.js`: `MenuRepository`(`#repositories`)와 `SmsProvider`(`./sms-provider.js`) 객체를 만들어 `OrderService` 생성자에 `menuRepository`, `messageProvider`라는 이름으로 넘깁니다. `SmsProvider`에는 `{ phone: '010-1234-5678' }`을 넘깁니다.

## 확인하기

```bash
pnpm practice:1-05
```

`sms-provider.js`와 `order-service.js`만 마친 상태에서 실행하면 `main.js`가 아직 객체를 넘기지 않으므로 `주문 실패 (Cannot read properties of undefined (reading 'findById'))`가 표시됩니다. `main.js`까지 마친 뒤 다시 실행합니다.

## 성공 기준

다음과 같이 출력됩니다. 메시지 줄은 `findById`가 찾은 가격 4500에 수량 2를 곱한 금액을 `SmsProvider`의 `send`가 출력한 것이고, `menuRepository`를 바꾼 뒤에도 같습니다.

```text
바깥에서 보이는 속성: []
[문자 → 010-1234-5678] 아메리카노 2잔 주문 완료(9000원)
바깥에서 menuRepository를 바꾼 뒤
[문자 → 010-1234-5678] 아메리카노 2잔 주문 완료(9000원)
```

## 실패 기준

- `바깥에서 보이는 속성`에 이름이 표시됨: 그 객체를 `#private` 필드가 아닌 일반 속성에 보관했습니다. `menuRepository`를 일반 속성에 두면 마지막 줄이 `[문자 → 010-1234-5678] 아메리카노 2잔 주문 완료(0원)`으로 바뀝니다.
- `주문 실패 (Cannot read properties of undefined (reading 'send'))`: `main.js`에서 `messageProvider`를 넘기지 않았거나 `smsProvider`처럼 다른 이름으로 넘겼습니다. `OrderService`는 넘겨받은 객체에서 `menuRepository`, `messageProvider`라는 이름의 값만 꺼냅니다.
- `[문자 → undefined]`: `SmsProvider`가 생성자로 받은 `phone`을 `#phone`에 보관하지 않았거나, `main.js`에서 `{ phone: '010-1234-5678' }`을 넘기지 않았습니다.
- `주문 실패 (this[#messageProvider].send is not a function)`: `SmsProvider`에 `send` 메서드가 없거나 이름이 다릅니다.

## 정답과 비교하기

정답 코드는 `answers/sms-provider.js`, `answers/order-service.js`, `answers/main.js`, 해설은 `answers/README.md`에 있습니다.
