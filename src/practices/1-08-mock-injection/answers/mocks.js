// src/practices/1-08-mock-injection/answers/mocks.js
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
