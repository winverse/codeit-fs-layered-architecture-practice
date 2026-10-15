// 실습용: PostgreSQL 대신 메모리 배열에서 사용자를 찾습니다.
function toUser({ id, email, name }) {
  return { id, email, name };
}

export class UserRepository {
  #db;

  constructor({ db }) {
    this.#db = db;
  }

  async findById(id) {
    const user = this.#db.users.find((user) => user.id === Number(id));
    return user ? toUser(user) : null;
  }

  async findByEmail(email, { includePassword = false } = {}) {
    const user = this.#db.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }

    return includePassword ? user : toUser(user);
  }
}
