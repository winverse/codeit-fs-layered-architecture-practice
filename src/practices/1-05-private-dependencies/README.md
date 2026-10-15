# 1장 05 실습: AuthService의 의존성 참조 보호하기

## 목표

`AuthService`가 생성자로 전달받은 의존성을 `#private` 필드에 보관하도록 바꾸고, 클래스 바깥의 코드가 같은 이름의 속성에 다른 객체를 대입해도 `login`이 처음 전달받은 객체로 동작하는지 실행 결과로 확인합니다.

## 시작하기

루트 `README.md`의 '설치와 첫 실행'을 마친 상태에서 실행합니다.

```bash
pnpm practice:1-05
```

## 수정할 파일과 시작 상태

`src/practices/1-05-private-dependencies/auth-service.js` 하나를 수정합니다. 시작 상태의 `AuthService`는 전달받은 `userRepository`, `passwordProvider`, `tokenProvider`를 `this.userRepository`처럼 일반 속성에 보관하고, `login`도 그 속성을 사용합니다.

`main.js`는 실제 객체를 넘겨 `AuthService`를 만든 뒤 다음 순서로 실행합니다.

1. `Object.keys(authService)`로 인스턴스 바깥에서 보이는 속성을 출력합니다.
2. 맞는 비밀번호와 틀린 비밀번호로 한 번씩 로그인합니다.
3. 클래스 바깥에서 `authService.passwordProvider`에 어떤 비밀번호든 `true`로 비교하는 객체를 대입하고, 틀린 비밀번호로 다시 로그인합니다.

시작 상태에서는 3번의 대입이 `login`이 쓰는 참조를 바꾸므로 틀린 비밀번호로도 로그인에 성공합니다.

```text
바깥에서 보이는 속성: [ 'userRepository', 'passwordProvider', 'tokenProvider' ]
맞는 비밀번호: 로그인 성공 (김코드)
틀린 비밀번호: 로그인 실패 (이메일 또는 비밀번호가 올바르지 않습니다.)
바꾼 뒤 틀린 비밀번호: 로그인 성공 (김코드)
```

## 구현 내용

1. 클래스 본문에 `#userRepository`, `#passwordProvider`, `#tokenProvider` 필드를 선언합니다.
2. 생성자에서 전달받은 세 객체를 그 필드에 보관합니다.
3. `login`에서 세 의존성을 모두 `#private` 필드로 사용합니다.

`main.js`는 고치지 않습니다.

## 확인하기

```bash
pnpm practice:1-05
```

## 성공 기준

다음과 같이 출력됩니다. 바깥에서 보이는 속성이 없고, 바꾼 뒤에도 틀린 비밀번호로는 로그인에 실패합니다.

```text
바깥에서 보이는 속성: []
맞는 비밀번호: 로그인 성공 (김코드)
틀린 비밀번호: 로그인 실패 (이메일 또는 비밀번호가 올바르지 않습니다.)
바꾼 뒤 틀린 비밀번호: 로그인 실패 (이메일 또는 비밀번호가 올바르지 않습니다.)
```

## 실패 기준

- `바깥에서 보이는 속성`에 이름이 남아 있음: 그 의존성을 아직 일반 속성에 보관하고 있습니다. `passwordProvider`가 남아 있으면 마지막 줄도 `바꾼 뒤 틀린 비밀번호: 로그인 성공 (김코드)`로 출력됩니다.
- `맞는 비밀번호: 로그인 실패 (Cannot read properties of undefined (reading 'compare'))`: 생성자에서는 `#passwordProvider`에 보관했지만 `login`이 아직 `this.passwordProvider`를 사용합니다.

## 정답과 비교하기

정답 코드는 `answers/auth-service.js`, 해설은 `answers/README.md`에 있습니다.
