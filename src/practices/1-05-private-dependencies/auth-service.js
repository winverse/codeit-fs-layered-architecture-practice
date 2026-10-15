// src/practices/1-05-private-dependencies/auth-service.js
import { UnauthorizedException } from '#exceptions';
import { ERROR_MESSAGE } from '#constants';

export class AuthService {
  // TODO: 전달받은 세 의존성을 #private 필드에 보관하고, login도 그 필드를 사용하게 바꿉니다.
  constructor({ userRepository, passwordProvider, tokenProvider }) {
    this.userRepository = userRepository;
    this.passwordProvider = passwordProvider;
    this.tokenProvider = tokenProvider;
  }

  async login({ email, password }) {
    const authUser = await this.userRepository.findByEmail(email, {
      includePassword: true,
    });

    if (!authUser) {
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await this.passwordProvider.compare(
      password,
      authUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }

    const user = await this.userRepository.findById(authUser.id);
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND_FROM_TOKEN);
    }

    const tokens = this.tokenProvider.generateTokens(user);

    return { user, tokens };
  }
}
