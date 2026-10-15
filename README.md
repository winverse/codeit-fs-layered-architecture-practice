# Layered Architecture 마이그레이션 1장 실습

「Layered Architecture 마이그레이션」 1장 실습에서 쓰는 저장소입니다. 2장에서 만들 로그인 기능을 줄여, Express·PostgreSQL·bcrypt·JWT 없이 메모리 배열과 실습용 구현으로 `AuthService`의 `login`을 `node`로 실행합니다.

| 교재   | 완성할 내용                                                                                                               | 실습 폴더                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| 1장 05 | `AuthService`가 전달받은 의존성을 `#private` 필드에 보관해, 클래스 바깥에서 참조를 바꿔도 `login`이 영향을 받지 않게 하기 | `src/practices/1-05-private-dependencies` |
| 1장 08 | `AuthService`가 의존성을 생성자로 전달받게 바꾸고, `login`이 호출하는 메서드만 갖춘 모의 객체를 넘겨 실행하기             | `src/practices/1-08-mock-injection`       |

## 설치와 첫 실행

```bash
git clone https://github.com/winverse/codeit-fs-layered-architecture-practice.git
cd codeit-fs-layered-architecture-practice
pnpm install
pnpm practice:1-05
```

`pnpm install`은 코드 서식·검사 도구(Prettier, ESLint)만 설치하며, 실습 코드는 Node.js만으로 실행됩니다. 아직 아무것도 고치지 않았다면 `pnpm practice:1-05`의 출력은 다음과 같습니다. 마지막 줄의 `로그인 성공`이 1장 05 실습에서 고칠 문제입니다.

```text
바깥에서 보이는 속성: [ 'userRepository', 'passwordProvider', 'tokenProvider' ]
맞는 비밀번호: 로그인 성공 (김코드)
틀린 비밀번호: 로그인 실패 (이메일 또는 비밀번호가 올바르지 않습니다.)
바꾼 뒤 틀린 비밀번호: 로그인 성공 (김코드)
```

## 실습 진행 방식

| 교재   | 수정할 파일(작업 순서)                                                                                    | 실행                 |
| ------ | --------------------------------------------------------------------------------------------------------- | -------------------- |
| 1장 05 | `src/practices/1-05-private-dependencies/auth-service.js`                                                 | `pnpm practice:1-05` |
| 1장 08 | 1. `src/practices/1-08-mock-injection/auth-service.js`<br>2. `src/practices/1-08-mock-injection/mocks.js` | `pnpm practice:1-08` |

- 실습 폴더의 `README.md`에 목표, 수정할 파일과 시작 상태, 구현 내용, 확인 방법, 성공·실패 기준이 있습니다. 수정할 파일의 `TODO` 주석 자리를 구현합니다.
- 두 실습은 서로 이어지지 않으므로 각 폴더의 파일만 고치면 됩니다.
- 실행할 때마다 메모리 데이터베이스가 처음 상태(사용자 `kim@codeit.kr`, 비밀번호 `codeit1234`)로 시작합니다.

## 제공되는 코드와 직접 작성하는 코드

직접 작성하는 것은 위 표의 수정할 파일에 있는 `TODO`뿐입니다. 나머지 파일은 실습에 필요한 환경으로 제공되며 고치지 않습니다.

| 파일                                  | 역할                                                                                            |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 실습 폴더의 `main.js`                 | 실제 객체(또는 모의 객체)를 넘겨 `AuthService`를 만들고 `login`을 실행해 결과를 출력하는 진입점 |
| `src/db/memory-db.js`                 | PostgreSQL 대신 쓰는 메모리 데이터베이스(`db.users` 배열)                                       |
| `src/repositories/user-repository.js` | 메모리 배열에서 사용자를 찾는 `UserRepository`(`findByEmail`, `findById`)                       |
| `src/providers/password-provider.js`  | bcrypt 대신 Node.js 내장 `crypto`로 해시·비교하는 `PasswordProvider`(`hash`, `compare`)         |
| `src/providers/token-provider.js`     | jsonwebtoken 대신 서명 없는 문자열을 만드는 `TokenProvider`(`generateTokens`)                   |
| `src/common/`                         | 2장과 같은 `UnauthorizedException`과 `ERROR_MESSAGE`·`HTTP_STATUS` 상수                         |
| `package.json`의 `imports`            | `#repositories`, `#providers`, `#exceptions`, `#constants`, `#db`를 위 파일로 연결              |
| 실습 폴더의 `answers/`                | 정답과 해설                                                                                     |

정답은 직접 구현하고 실행 결과가 성공 기준과 같아진 뒤 실습 폴더의 `answers/`에서 비교합니다. `main.js`는 `answers/`의 파일을 불러오지 않습니다.
