# 1장 06 실습: BaseController를 물려받는 AuthController 만들기

## 목표

라우터를 스스로 만들던 `AuthController`가 `BaseController`를 물려받아 `super()`로 `this.router`를 받게 바꾸고, `routes()`를 다시 구현합니다. 경로를 모으는 코드가 Controller의 종류를 구분하지 않고 같은 `routes()`를 호출해도 Controller마다 다른 경로가 등록되는지 실행 결과로 확인합니다.

## 시작하기

루트 `README.md`의 '설치와 첫 실행'을 마친 실습 저장소 폴더에서 실행합니다.

```bash
pnpm practice:1-06
```

## 수정할 파일과 시작 상태

`src/practices/1-06-controller-inheritance/auth-controller.js` 하나를 수정합니다. 시작 상태의 `AuthController`는 다른 클래스를 물려받지 않고 생성자에서 `express.Router()`로 라우터를 직접 만들며, `routes()`가 없습니다. 할 일은 `TODO 1`·`TODO 2` 주석에 적혀 있습니다.

같은 폴더의 `user-controller.js`에는 `BaseController`를 물려받은 `UserController`가 완성되어 있고, `BaseController`는 `#controllers`에서 가져옵니다. `main.js`는 서버를 띄우지 않고 두 Controller를 만들어 `routes()`를 호출한 뒤, 돌려받은 라우터에 등록된 경로와 `BaseController`를 물려받았는지를 출력합니다. 시작 상태에서 실행하면 다음이 출력됩니다.

```text
AuthController: 경로 등록 실패 (controller.routes is not a function)
UserController(BaseController 상속): GET /
```

## 구현 내용

1. `AuthController`가 `BaseController`를 물려받게 하고, 생성자에서 라우터를 직접 만드는 줄 대신 `super()`로 `BaseController`의 constructor를 실행합니다. 쓰지 않게 된 `express` `import`는 `BaseController` `import`로 바꿉니다.
2. `routes()`를 다시 구현해 `POST /signup`은 `signUp`, `POST /login`은 `login`이 처리하도록 `this.router`에 등록하고 `this.router`를 돌려줍니다.

## 확인하기

```bash
pnpm practice:1-06
```

1번만 마친 상태에서 실행하면 `AuthController: 경로 등록 실패 (Method not implemented.)`가 표시됩니다. `routes()`를 다시 구현하지 않아 `BaseController`의 `routes()`가 실행되었기 때문입니다.

## 성공 기준

다음과 같이 출력됩니다. 두 Controller 모두 `BaseController`를 물려받았고, 같은 `routes()` 호출로 Controller마다 다른 경로가 등록됩니다.

```text
AuthController(BaseController 상속): POST /signup, POST /login
UserController(BaseController 상속): GET /
```

## 실패 기준

- `경로 등록 실패 (Must call super constructor in derived class before accessing 'this' or returning from derived constructor)`: 생성자에서 `super()`를 호출하지 않았거나, `this.#authService`에 값을 넣은 뒤에 호출했습니다.
- `AuthController(상속 없음): …`: `routes()`는 구현했지만 `BaseController`를 물려받지 않고 라우터를 직접 만들고 있습니다.
- `경로 등록 실패 (Method not implemented.)`: `routes()`를 구현하지 않았거나 `route()`처럼 이름을 다르게 적었습니다.
- `경로 등록 실패 (Cannot read properties of undefined (reading 'stack'))`: `routes()`가 `this.router`를 돌려주지 않습니다.

## 정답과 비교하기

정답 코드는 `answers/auth-controller.js`, 해설은 `answers/README.md`에 있습니다.
