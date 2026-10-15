# 1장 06 실습 정답과 해설

`src/practices/1-06-controller-inheritance/auth-controller.js`의 `import`·클래스 선언·생성자를 바꾸고 `routes()`를 더합니다. `signUp`, `login`은 그대로 둡니다.

```javascript
import { BaseController } from '#controllers';
import { HTTP_STATUS } from '#constants';

export class AuthController extends BaseController {
  #authService;

  constructor({ authService }) {
    super();
    this.#authService = authService;
  }

  routes() {
    this.router.post('/signup', (req, res) => this.signUp(req, res));
    this.router.post('/login', (req, res) => this.login(req, res));
    return this.router;
  }
```

## 해설

- `super()`가 `BaseController`의 constructor를 실행해 `this.router`를 만듭니다. 라우터를 만드는 규칙은 `BaseController` 한 곳에 있고, `AuthController`와 `UserController`는 그 규칙으로 만든 `this.router`에 자기 경로만 등록합니다.
- 물려받은 클래스의 생성자에서는 `this`를 쓰기 전에 `super()`를 호출해야 합니다. 그래서 `super()`가 `this.#authService = authService;`보다 먼저 옵니다.
- `main.js`의 경로를 모으는 코드는 Controller의 종류를 구분하지 않고 똑같이 `routes()`를 호출합니다. 두 Controller가 각자 `routes()`를 다시 구현했으므로 `AuthController`는 `POST /signup, POST /login`을, `UserController`는 `GET /`을 등록합니다. 이것이 상속 기반 다형성입니다.
- `routes()`를 다시 구현하지 않으면 물려받은 `BaseController`의 `routes()`가 실행되어 `Method not implemented.` 오류가 납니다.
