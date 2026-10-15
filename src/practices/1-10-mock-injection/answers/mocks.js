// src/practices/1-10-mock-injection/answers/mocks.js
export const mockMenuRepository = {
  async findById(id) {
    return { id, name: '모의 메뉴', price: 1000 };
  },
};

export const mockMessageProvider = {
  sentTexts: [],
  send(text) {
    this.sentTexts.push(text);
  },
};
