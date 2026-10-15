// src/practices/1-06-controller-inheritance/main.js
import { BaseController } from '#controllers';
import { AuthController } from './auth-controller.js';
import { UserController } from './user-controller.js';
import { listRoutes } from './list-routes.js';

// 경로를 모으는 코드: Controller의 종류를 구분하지 않고 똑같이 routes()를 호출합니다.
function printRoutes(name, createController) {
  try {
    const controller = createController();
    const router = controller.routes();
    const parent =
      controller instanceof BaseController
        ? 'BaseController 상속'
        : '상속 없음';
    console.log(`${name}(${parent}): ${listRoutes(router)}`);
  } catch (error) {
    console.log(`${name}: 경로 등록 실패 (${error.message})`);
  }
}

// 경로를 등록할 때는 Service의 메서드를 호출하지 않으므로 빈 객체를 넘깁니다.
printRoutes('AuthController', () => new AuthController({ authService: {} }));
printRoutes('UserController', () => new UserController({ userService: {} }));
