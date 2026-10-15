// src/practices/1-06-controller-inheritance/user-controller.js
import { BaseController } from '#controllers';
import { HTTP_STATUS } from '#constants';

export class UserController extends BaseController {
  #userService;

  constructor({ userService }) {
    super();
    this.#userService = userService;
  }

  routes() {
    this.router.get('/', (req, res) => this.getUsers(req, res));
    return this.router;
  }

  async getUsers(req, res) {
    const users = await this.#userService.listUsers();
    res.status(HTTP_STATUS.OK).json(users);
  }
}
