// src/practices/1-06-controller-inheritance/answers/auth-controller.js
import { BaseController } from '#controllers';
import { HTTP_STATUS } from '#constants';

export class AuthController extends BaseController {
  #authService;

  constructor({ authService }) {
    super();
    this.#authService = authService;
  }

  routes() {
    this.router.post('/signup', (req, res) => this.signUp(req, res));
    this.router.post('/login', (req, res) => this.login(req, res));
    return this.router;
  }

  // 실습을 위해 요청 값 검사와 쿠키 설정은 생략합니다.
  async signUp(req, res) {
    const user = await this.#authService.signUp(req.body);
    res.status(HTTP_STATUS.CREATED).json(user);
  }

  async login(req, res) {
    const user = await this.#authService.login(req.body);
    res.status(HTTP_STATUS.OK).json(user);
  }
}
