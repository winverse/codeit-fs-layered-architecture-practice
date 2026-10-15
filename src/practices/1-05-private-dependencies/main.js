// src/practices/1-05-private-dependencies/main.js
import { db } from '#db';
import { UserRepository } from '#repositories';
import { PasswordProvider, TokenProvider } from '#providers';
import { AuthService } from './auth-service.js';

const authService = new AuthService({
  userRepository: new UserRepository({ db }),
  passwordProvider: new PasswordProvider(),
  tokenProvider: new TokenProvider(),
});

async function tryLogin(label, password) {
  try {
    const { user } = await authService.login({
      email: 'kim@codeit.kr',
      password,
    });
    console.log(`${label}: 로그인 성공 (${user.name})`);
  } catch (error) {
    console.log(`${label}: 로그인 실패 (${error.message})`);
  }
}

console.log('바깥에서 보이는 속성:', Object.keys(authService));

await tryLogin('맞는 비밀번호', 'codeit1234');
await tryLogin('틀린 비밀번호', 'wrong-password');

// 클래스 바깥의 코드가 passwordProvider를 어떤 비밀번호든 통과시키는 객체로 바꿉니다.
authService.passwordProvider = {
  async compare() {
    return true;
  },
};

await tryLogin('바꾼 뒤 틀린 비밀번호', 'wrong-password');
