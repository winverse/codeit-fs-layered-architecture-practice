# 1장 05 실습 정답과 해설

`src/practices/1-05-private-dependencies/auth-service.js`의 필드 선언과 생성자를 다음과 같이 바꾸고, `login` 안의 `this.userRepository`·`this.passwordProvider`·`this.tokenProvider`를 모두 `this.#userRepository`·`this.#passwordProvider`·`this.#tokenProvider`로 바꿉니다.

```javascript
export class AuthService {
  #userRepository;
  #passwordProvider;
  #tokenProvider;

  constructor({ userRepository, passwordProvider, tokenProvider }) {
    this.#userRepository = userRepository;
    this.#passwordProvider = passwordProvider;
    this.#tokenProvider = tokenProvider;
  }
```

## 해설

- `#private` 필드는 인스턴스의 속성이 아니므로 `Object.keys(authService)`에 나타나지 않고, 클래스 바깥에서 읽거나 바꿀 수 없습니다. 그래서 첫 줄이 `바깥에서 보이는 속성: []`로 바뀝니다.
- `main.js`의 `authService.passwordProvider = { ... }`는 이제 `#passwordProvider`가 아니라 같은 이름의 새 일반 속성을 만들 뿐입니다. `login`은 생성자에서 보관한 `#passwordProvider`의 `compare`를 그대로 호출하므로, 바꾼 뒤에도 틀린 비밀번호로는 로그인에 실패합니다.
- 전달받은 객체를 어떤 필드에 보관하느냐가 바깥 접근을 정합니다. 생성자로 전달받았더라도 `this.passwordProvider`처럼 일반 속성에 보관하면 바깥 코드가 그 참조를 바꿔 `login`의 비밀번호 비교를 건너뛸 수 있습니다.

## 자주 하는 실수

- 세 의존성 가운데 일부만 `#private` 필드로 바꾸면 남은 이름이 `바깥에서 보이는 속성`에 표시됩니다. `passwordProvider`를 남겼다면 마지막 줄이 `로그인 성공 (김코드)`로 출력됩니다.
- 생성자만 `this.#passwordProvider = passwordProvider`로 바꾸고 `login`에서 `this.passwordProvider.compare`를 그대로 두면, `this.passwordProvider`가 `undefined`라서 맞는 비밀번호로도 `Cannot read properties of undefined (reading 'compare')`가 출력됩니다.
