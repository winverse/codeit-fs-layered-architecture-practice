// src/practices/1-06-controller-inheritance/auth-controller.js
import express from 'express';
import { HTTP_STATUS } from '#constants';

// TODO 1: 라우터를 직접 만들지 말고 BaseController를 물려받아,
// 생성자에서 BaseController의 constructor를 실행해 this.router를 만듭니다.
export class AuthController {
  #authService;

  constructor({ authService }) {
    this.router = express.Router();
    this.#authService = authService;
  }

  // TODO 2: routes()를 다시 구현합니다. POST /signup은 signUp, POST /login은 login이 처리하도록
  // this.router에 등록하고 this.router를 돌려줍니다.

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
