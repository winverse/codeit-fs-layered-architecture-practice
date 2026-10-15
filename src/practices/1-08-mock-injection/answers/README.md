# 1장 08 실습 정답과 해설

## 1. `auth-service.js`

필드를 선언하면서 객체를 만들던 세 줄을 다음 코드로 바꾸고, 더 이상 쓰지 않는 `#db`, `#repositories`, `#providers` `import`를 지웁니다. `login`은 그대로 둡니다.

```javascript
  #userRepository;
  #passwordProvider;
  #tokenProvider;

  constructor({ userRepository, passwordProvider, tokenProvider }) {
    this.#userRepository = userRepository;
    this.#passwordProvider = passwordProvider;
    this.#tokenProvider = tokenProvider;
  }
```

## 2. `mocks.js`

```javascript
export const mockUserRepository = {
  async findByEmail(email) {
    return { id: 7, email, password: 'hashed-1234' };
  },
  async findById(id) {
    return { id, name: '모의 사용자' };
  },
};

export const mockPasswordProvider = {
  async compare(password, hashedPassword) {
    return hashedPassword === `hashed-${password}`;
  },
};

export const mockTokenProvider = {
  generateTokens(user) {
    return {
      accessToken: `mock-access-${user.id}`,
      refreshToken: `mock-refresh-${user.id}`,
    };
  },
};
```

## 해설

- 생성자 주입으로 바꾸면 `AuthService`는 어떤 객체를 쓸지 정하지 않고, `main.js`처럼 `AuthService`를 사용하는 쪽이 만들어 넘긴 객체를 씁니다. 그래서 같은 `AuthService` 코드에 실제 객체를 넘기면 메모리 데이터베이스와 `crypto`로, 모의 객체를 넘기면 정해 둔 값으로 `login`이 실행됩니다.
- `login`이 호출하는 메서드는 `findByEmail`, `compare`, `findById`, `generateTokens` 네 개입니다. 모의 객체는 이 네 메서드만 계약대로 갖추면 되고, `login`이 호출하지 않는 `PasswordProvider`의 `hash`는 없어도 됩니다.
- 모의 객체 쪽 첫 줄의 `모의 사용자`는 `mockUserRepository.findById`가, `mock-access-7`은 `mockTokenProvider.generateTokens`가 돌려준 값입니다. 둘째 줄은 `mockPasswordProvider.compare`가 `hashed-0000`과 `hashed-1234`를 비교해 `false`를 돌려주므로 로그인에 실패합니다.

## 자주 하는 실수

- `constructor() { this.#userRepository = new UserRepository({ db }); ... }`처럼 객체를 만드는 위치만 생성자로 옮기면 여전히 `AuthService`가 실제 객체를 직접 만듭니다. `main.js`가 넘긴 모의 객체는 쓰이지 않으므로 모의 객체 쪽 두 줄이 `로그인 실패 (이메일 또는 비밀번호가 올바르지 않습니다.)`로 출력됩니다.
- JavaScript는 생성자에 객체를 넘길 때 필요한 메서드가 있는지 확인하지 않습니다. 모의 객체의 메서드 이름이 계약과 다르면 `AuthService` 인스턴스는 만들어지지만, `login`이 그 메서드를 호출하는 순간 `this[#passwordProvider].compare is not a function` 같은 오류가 납니다.
- 비밀번호 비교 모의 객체가 항상 `true`를 돌려주면 틀린 비밀번호로도 `모의 사용자 mock-access-7`이 출력됩니다.
