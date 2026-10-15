# Layered Architecture 마이그레이션 1장 실습

「Layered Architecture 마이그레이션」 1장 실습에서 쓰는 저장소입니다. 2장에서 계층형 구조로 옮기기 전에, 1장에서 배운 원칙을 작은 클래스로 직접 만들고 `node`로 실행해 확인합니다. 데이터베이스·환경 변수는 쓰지 않고 서버도 띄우지 않습니다.

| 교재   | 완성할 내용                                                                                                                        | 실습 폴더                                   |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 1장 05 | 문자를 보내는 `SmsProvider`를 만들고, `OrderService`가 전달받은 Repository·Provider를 `#private` 필드에 보관해 호출하도록 연결하기 | `src/practices/1-05-private-dependencies`   |
| 1장 07 | `AuthController`가 `BaseController`를 물려받아 `super()`로 라우터를 받고, `routes()`를 다시 구현하기                               | `src/practices/1-07-controller-inheritance` |
| 1장 10 | `OrderService`가 의존성을 생성자로 전달받게 바꾸고, 문자·이메일 Provider와 모의 객체를 바꿔 넣어 실행하기                          | `src/practices/1-10-mock-injection`         |

## 설치와 첫 실행

```bash
git clone https://github.com/winverse/codeit-fs-layered-architecture-practice.git
cd codeit-fs-layered-architecture-practice
pnpm install
pnpm practice:1-05
```

아직 아무것도 고치지 않았다면 `pnpm practice:1-05`의 출력은 다음 두 줄입니다. 주문 메시지를 보내는 코드가 아직 없어 메시지 줄이 출력되지 않습니다.

```text
바깥에서 보이는 속성: []
바깥에서 menuRepository를 바꾼 뒤
```

## 실습 진행 방식

| 교재   | 수정할 파일(작업 순서)                                                                                                                                                                | 실행                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 1장 05 | 1. `src/practices/1-05-private-dependencies/sms-provider.js`<br>2. `src/practices/1-05-private-dependencies/order-service.js`<br>3. `src/practices/1-05-private-dependencies/main.js` | `pnpm practice:1-05` |
| 1장 07 | `src/practices/1-07-controller-inheritance/auth-controller.js`                                                                                                                        | `pnpm practice:1-07` |
| 1장 10 | 1. `src/practices/1-10-mock-injection/order-service.js`<br>2. `src/practices/1-10-mock-injection/mocks.js`                                                                            | `pnpm practice:1-10` |

- 실습 폴더의 `README.md`에 목표, 수정할 파일과 시작 상태, 구현 내용, 확인 방법, 성공·실패 기준이 있습니다. 수정할 파일의 `TODO` 주석 자리를 구현합니다.
- 세 실습은 서로 이어지지 않으므로 각 폴더의 파일만 고치면 됩니다.

## 제공되는 코드와 직접 작성하는 코드

직접 작성하는 것은 위 표의 수정할 파일에 있는 `TODO`뿐입니다. 나머지 파일은 실습에 필요한 환경으로 제공되며 고치지 않습니다.

| 파일                                                                     | 역할                                                                                                                                             |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 실습 폴더의 `main.js`                                                    | 실습 코드를 실행해 결과를 출력하는 진입점. 1장 05에서는 `TODO 6` 자리만 직접 작성                                                                |
| `src/repositories/menu-repository.js`                                    | 데이터베이스 대신 메모리 배열에서 메뉴를 찾는 `MenuRepository`(`findById`). 1번 메뉴는 4500원인 아메리카노                                       |
| `src/practices/1-10-mock-injection/sms-provider.js`, `email-provider.js` | 문자·이메일 발송 라이브러리 대신 보낼 내용을 터미널에 출력하는 `SmsProvider`, `EmailProvider`(`send`)                                            |
| `src/controllers/base-controller.js`                                     | 2장과 같은 `BaseController`. 생성자에서 `express.Router()`로 `this.router`를 만들고, `routes()`는 자식 클래스가 다시 구현하지 않으면 오류를 던짐 |
| `src/practices/1-07-controller-inheritance/user-controller.js`           | `BaseController`를 물려받아 완성된 `UserController`                                                                                              |
| `src/practices/1-07-controller-inheritance/list-routes.js`               | 서버 없이 Express 라우터에 등록된 경로를 `메서드 경로` 목록으로 바꾸는 출력용 코드(Express 라우터 내부의 `stack`을 읽으므로 따라 쓰지 않음)      |
| `src/common/constants/`                                                  | 2장과 같은 `HTTP_STATUS` 상수                                                                                                                    |
| `package.json`의 `imports`                                               | `#repositories`, `#controllers`, `#constants`를 위 파일로 연결                                                                                   |
| 실습 폴더의 `answers/`                                                   | 정답과 해설                                                                                                                                      |

정답은 직접 구현하고 실행 결과가 성공 기준과 같아진 뒤 실습 폴더의 `answers/`에서 비교합니다. `pnpm practice:*` 명령은 `answers/`의 파일을 실행하지 않습니다.
