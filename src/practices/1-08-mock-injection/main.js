// src/practices/1-08-mock-injection/main.js
import { db } from '#db';
import { UserRepository } from '#repositories';
import { PasswordProvider, TokenProvider } from '#providers';
import { AuthService } from './auth-service.js';
import {
  mockUserRepository,
  mockPasswordProvider,
  mockTokenProvider,
} from './mocks.js';

async function tryLogin(label, authService, { email, password }) {
  try {
    const { user, tokens } = await authService.login({ email, password });
    console.log(`${label}: ${user.name} ${tokens.accessToken}`);
  } catch (error) {
    console.log(`${label}: 로그인 실패 (${error.message})`);
  }
}

// 실제 객체를 넘겨 AuthService를 만듭니다.
const authService = new AuthService({
  userRepository: new UserRepository({ db }),
  passwordProvider: new PasswordProvider(),
  tokenProvider: new TokenProvider(),
});

// 모의 객체를 넘겨 AuthService를 만듭니다.
const authServiceWithMocks = new AuthService({
  userRepository: mockUserRepository,
  passwordProvider: mockPasswordProvider,
  tokenProvider: mockTokenProvider,
});

await tryLogin('실제 객체', authService, {
  email: 'kim@codeit.kr',
  password: 'codeit1234',
});
await tryLogin('모의 객체', authServiceWithMocks, {
  email: 'mock@example.com',
  password: '1234',
});
await tryLogin('모의 객체, 틀린 비밀번호', authServiceWithMocks, {
  email: 'mock@example.com',
  password: '0000',
});
