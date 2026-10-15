# 1장 10 실습: 생성자 주입으로 Provider와 모의 객체 바꿔 넣기

## 목표

클래스 안에서 의존성을 만들던 `OrderService`를 생성자로 전달받게 바꿉니다. `OrderService` 코드를 고치지 않은 채 문자 Provider, 이메일 Provider, 모의 객체를 바꿔 넣었을 때 주문 결과가 어떻게 달라지는지 실행 결과로 확인합니다.

## 시작하기

루트 `README.md`의 '설치와 첫 실행'을 마친 실습 저장소 폴더에서 실행합니다.

```bash
pnpm practice:1-10
```

## 수정할 파일과 시작 상태

다음 순서로 두 파일을 수정합니다. 할 일은 `TODO 1`·`TODO 2` 주석에 적혀 있습니다.

1. `src/practices/1-10-mock-injection/order-service.js`: 시작 상태의 `OrderService`는 필드를 선언하면서 `MenuRepository`와 `SmsProvider`를 직접 만듭니다. `order`는 고치지 않습니다.
2. `src/practices/1-10-mock-injection/mocks.js`: 두 모의 객체 `mockMenuRepository`, `mockMessageProvider`가 아직 빈 객체입니다.

`main.js`는 같은 `OrderService` 클래스에 넘기는 객체만 바꿔 세 번 주문합니다. 첫째는 `SmsProvider`, 둘째는 이메일을 보내는 `EmailProvider`, 셋째는 두 모의 객체를 넘기고, 마지막 줄에 `mockMessageProvider.sentTexts`를 출력합니다. 시작 상태에서 실행하면 다음이 출력됩니다.

```text
[문자 → 010-1234-5678] 아메리카노 2잔 주문 완료(9000원)
[문자 → 010-1234-5678] 아메리카노 2잔 주문 완료(9000원)
[문자 → 010-1234-5678] 아메리카노 2잔 주문 완료(9000원)
모의 객체에 기록된 메시지: undefined
```

시작 상태의 `OrderService`는 생성자로 넘긴 객체를 쓰지 않고 직접 만든 `SmsProvider`를 쓰므로, 세 주문이 모두 같은 문자로 출력됩니다.

## 구현 내용

1. `order-service.js`의 `TODO 1`: 05 실습의 `OrderService`처럼 생성자에서 `{ menuRepository, messageProvider }` 객체 하나를 전달받아 두 값을 `#menuRepository`, `#messageProvider`에 보관합니다. 더 이상 쓰지 않는 `import`는 지웁니다.
2. `mocks.js`의 `TODO 2`: `order`가 호출하는 메서드를 찾아 두 모의 객체에 넣습니다.

- `mockMenuRepository`: 메뉴를 찾을 때 받은 `id`와 이름 `'모의 메뉴'`, 가격 `1000`을 담은 메뉴 객체(`{ id, name, price }`)를 돌려줍니다. 받은 `id`가 무엇이든 이름과 가격은 같습니다.
- `mockMessageProvider`: 메시지를 출력하지 않고, 받은 문자열을 `sentTexts` 배열에 차례로 담습니다.

## 확인하기

```bash
pnpm practice:1-10
```

## 성공 기준

다음과 같이 출력됩니다. `OrderService` 코드는 그대로인데 넘긴 Provider에 따라 문자·이메일로 출력되고, 모의 객체를 넘긴 주문은 아무것도 출력하지 않은 채 `mockMessageProvider`에 메시지가 기록됩니다.

```text
[문자 → 010-1234-5678] 아메리카노 2잔 주문 완료(9000원)
[이메일 → kim@codeit.kr] 아메리카노 2잔 주문 완료(9000원)
모의 객체에 기록된 메시지: [ '모의 메뉴 2잔 주문 완료(2000원)' ]
```

## 실패 기준

- 세 주문이 모두 `[문자 → 010-1234-5678]`로 출력됨: `OrderService`가 생성자로 전달받은 객체를 쓰지 않습니다. 객체를 만드는 코드를 `constructor` 안으로 옮기기만 해도 이렇게 출력됩니다.
- `is not a function`이 담긴 `주문 실패`: 셋째 주문만 실패하면 오류에 표시된 메서드가 모의 객체에 없거나 이름이 다릅니다. `mocks.js`를 비워 둔 채 실행하면 `주문 실패 (this[#menuRepository].findById is not a function)`가 표시됩니다. 세 주문이 모두 이 오류로 실패하면 생성자가 `{ menuRepository, messageProvider }` 객체 하나가 아니라 값 두 개를 따로 받도록 작성되었습니다.
- 셋째 주문이 `모의 메뉴 2잔 주문 완료(2000원)`으로 출력되고 기록된 메시지가 `undefined`: `mockMessageProvider`의 `send`가 받은 문자열을 `sentTexts`에 담지 않고 출력합니다.

## 정답과 비교하기

정답 코드는 `answers/order-service.js`와 `answers/mocks.js`, 해설은 `answers/README.md`에 있습니다.
