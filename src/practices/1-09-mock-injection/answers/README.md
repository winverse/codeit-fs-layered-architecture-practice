# 1장 09 실습 정답과 해설

## 1. `order-service.js`

필드를 선언하면서 객체를 만들던 두 줄을 다음 코드로 바꾸고, 더 이상 쓰지 않는 `MenuRepository`, `SmsProvider` `import`를 지웁니다. `order`는 그대로 둡니다.

```javascript
  #menuRepository;
  #messageProvider;

  constructor({ menuRepository, messageProvider }) {
    this.#menuRepository = menuRepository;
    this.#messageProvider = messageProvider;
  }
```

## 2. `mocks.js`

```javascript
export const mockMenuRepository = {
  async findById(id) {
    return { id, name: '모의 메뉴', price: 1000 };
  },
};

export const mockMessageProvider = {
  sentTexts: [],
  send(text) {
    this.sentTexts.push(text);
  },
};
```

## 해설

- 생성자 주입으로 바꾸면 `OrderService`는 어떤 객체를 쓸지 정하지 않고, `main.js`처럼 `OrderService`를 사용하는 쪽이 만들어 넘긴 객체를 씁니다. 그래서 `OrderService`를 고치지 않고도 `SmsProvider`를 넘기면 문자로, `EmailProvider`를 넘기면 이메일로 주문 메시지가 나갑니다.
- `order`가 호출하는 메서드는 `menuRepository`의 `findById`와 `messageProvider`의 `send`입니다. 이 두 메서드가 계약이므로, 모의 객체는 클래스로 만들지 않은 일반 객체라도 이 메서드만 갖추면 `OrderService`에 넣을 수 있습니다.
- `mockMessageProvider`는 메시지를 보내지 않고 `sentTexts`에 담기만 하므로, 셋째 주문은 터미널에 출력되지 않고 `OrderService`가 보내려던 문자열을 마지막 줄에서 확인할 수 있습니다. `모의 메뉴`와 `2000원`은 `mockMenuRepository`가 돌려준 이름과 가격 1000에 수량 2를 곱한 값입니다.

## 자주 하는 실수

- `constructor() { this.#menuRepository = new MenuRepository(); ... }`처럼 객체를 만드는 위치만 생성자로 옮기면 여전히 `OrderService`가 직접 만든 `SmsProvider`를 씁니다. `main.js`가 넘긴 객체는 쓰이지 않으므로 세 주문이 모두 문자로 출력되고, 기록된 메시지는 `[]`입니다.
- 생성자를 `constructor(menuRepository, messageProvider)`처럼 값 두 개를 따로 받도록 쓰면, `main.js`가 넘긴 객체 하나가 통째로 `menuRepository`에 담깁니다. 그 객체에는 `findById`가 없으므로 세 주문이 모두 `this[#menuRepository].findById is not a function`으로 실패합니다.
- 모의 객체의 메서드 이름이 계약과 다르면(`send` 대신 `sendMessage` 등) `OrderService` 인스턴스는 만들어지지만, `order`가 그 메서드를 호출하는 순간 `this[#messageProvider].send is not a function` 오류가 납니다.
