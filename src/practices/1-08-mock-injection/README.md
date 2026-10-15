# 1장 08 실습: 생성자 주입과 모의 객체로 login 실행하기

## 목표

`AuthService`가 의존성을 클래스 안에서 만들지 않고 생성자로 전달받게 바꾼 뒤, `login`이 호출하는 메서드만 갖춘 모의 객체를 만들어 넘깁니다. `AuthService`를 고치지 않고 실제 객체와 모의 객체 양쪽으로 `login`이 실행되는지 확인합니다.

## 시작하기

루트 `README.md`의 '설치와 첫 실행'을 마친 실습 저장소 폴더에서 실행합니다.

```bash
pnpm practice:1-08
```

## 수정할 파일과 시작 상태

다음 순서로 두 파일을 수정합니다.

1. `src/practices/1-08-mock-injection/auth-service.js`: 시작 상태의 `AuthService`는 필드를 선언하면서 `UserRepository`, `PasswordProvider`, `TokenProvider`를 직접 만듭니다. `login`은 교재에서 본 `login`과 같고 고치지 않습니다.
2. `src/practices/1-08-mock-injection/mocks.js`: 세 모의 객체 `mockUserRepository`, `mockPasswordProvider`, `mockTokenProvider`가 아직 빈 객체입니다.

시작 상태에서 실행하면 다음이 출력됩니다.

```text
실제 객체: 김코드 eyJ1c2VySWQiOjEsInR5cGUiOiJhY2Nlc3MifQ
모의 객체: 로그인 실패 (이메일 또는 비밀번호가 올바르지 않습니다.)
모의 객체, 틀린 비밀번호: 로그인 실패 (이메일 또는 비밀번호가 올바르지 않습니다.)
```

`main.js`는 실제 객체를 넘긴 `AuthService`와 모의 객체를 넘긴 `AuthService`를 하나씩 만듭니다. 실제 객체 쪽은 `kim@codeit.kr`과 `codeit1234`로, 모의 객체 쪽은 `mock@example.com`과 비밀번호 `1234`·`0000`으로 로그인합니다. 시작 상태의 `AuthService`는 생성자로 넘긴 객체를 쓰지 않고 직접 만든 실제 객체를 쓰므로, 메모리 데이터베이스에 없는 `mock@example.com`은 로그인에 실패합니다.

## 구현 내용

1. `auth-service.js`: 세 의존성을 생성자로 전달받아 `#userRepository`, `#passwordProvider`, `#tokenProvider`에 보관합니다. 더 이상 쓰지 않는 `import`는 지웁니다.
2. `mocks.js`: `login`이 호출하는 메서드를 `auth-service.js`의 `login`에서 찾아 세 모의 객체에 넣습니다. 각 메서드는 DB·해시·토큰 없이 아래 값을 돌려줍니다.

- `mockUserRepository`: 이메일로 찾으면 그 이메일에 `id` `7`과 비밀번호 `'hashed-1234'`를 담은 사용자를, `id`로 찾으면 그 `id`에 이름 `'모의 사용자'`를 담은 사용자를 돌려줍니다.
- `mockPasswordProvider`: 저장된 비밀번호가 `hashed-` 뒤에 입력한 비밀번호를 이은 문자열과 같을 때만 `true`를 돌려줍니다.
- `mockTokenProvider`: `accessToken`은 `mock-access-`, `refreshToken`은 `mock-refresh-` 뒤에 사용자 `id`를 붙인 문자열로 돌려줍니다.

## 확인하기

```bash
pnpm practice:1-08
```

## 성공 기준

다음과 같이 출력됩니다. 실제 객체 쪽 결과는 시작 상태와 같고, 모의 객체 쪽은 모의 객체가 돌려준 값으로 로그인 결과가 정해집니다.

```text
실제 객체: 김코드 eyJ1c2VySWQiOjEsInR5cGUiOiJhY2Nlc3MifQ
모의 객체: 모의 사용자 mock-access-7
모의 객체, 틀린 비밀번호: 로그인 실패 (이메일 또는 비밀번호가 올바르지 않습니다.)
```

## 실패 기준

- 모의 객체 쪽 두 줄이 `로그인 실패 (이메일 또는 비밀번호가 올바르지 않습니다.)`: `AuthService`가 생성자로 전달받은 객체를 쓰지 않습니다. 객체를 만드는 코드를 `constructor` 안으로 옮기기만 해도 이렇게 출력됩니다.
- `is not a function`이 담긴 `로그인 실패`: 오류에 표시된 메서드가 모의 객체에 없거나 이름이 다릅니다. `mocks.js`를 비워 둔 채 실행하면 `this[#userRepository].findByEmail is not a function`이 표시됩니다.
- `모의 객체, 틀린 비밀번호: 모의 사용자 mock-access-7`: `mockPasswordProvider`가 입력한 비밀번호와 관계없이 `true`를 돌려줍니다.

## 정답과 비교하기

정답 코드는 `answers/auth-service.js`와 `answers/mocks.js`, 해설은 `answers/README.md`에 있습니다.
