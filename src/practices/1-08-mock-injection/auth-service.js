// src/practices/1-08-mock-injection/auth-service.js
import { db } from '#db';
import { UserRepository } from '#repositories';
import { PasswordProvider, TokenProvider } from '#providers';
import { UnauthorizedException } from '#exceptions';
import { ERROR_MESSAGE } from '#constants';

export class AuthService {
  // TODO 1: 세 의존성을 클래스 안에서 만들지 말고 생성자로 전달받아 보관합니다.
  #userRepository = new UserRepository({ db });
  #passwordProvider = new PasswordProvider();
  #tokenProvider = new TokenProvider();

  async login({ email, password }) {
    const authUser = await this.#userRepository.findByEmail(email, {
      includePassword: true,
    });

    if (!authUser) {
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await this.#passwordProvider.compare(
      password,
      authUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }

    const user = await this.#userRepository.findById(authUser.id);
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND_FROM_TOKEN);
    }

    const tokens = this.#tokenProvider.generateTokens(user);

    return { user, tokens };
  }
}
