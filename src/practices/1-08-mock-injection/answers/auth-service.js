// src/practices/1-08-mock-injection/answers/auth-service.js
import { UnauthorizedException } from '#exceptions';
import { ERROR_MESSAGE } from '#constants';

export class AuthService {
  #userRepository;
  #passwordProvider;
  #tokenProvider;

  constructor({ userRepository, passwordProvider, tokenProvider }) {
    this.#userRepository = userRepository;
    this.#passwordProvider = passwordProvider;
    this.#tokenProvider = tokenProvider;
  }

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
