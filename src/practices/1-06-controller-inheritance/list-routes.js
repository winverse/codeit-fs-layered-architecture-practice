// src/practices/1-06-controller-inheritance/list-routes.js
// 제공 코드: 서버를 띄우지 않고 Express 라우터에 등록된 경로를 "메서드 경로" 목록으로 바꿉니다.
// 등록 결과를 보려고 라우터 내부의 stack을 읽는 코드이므로, 실습에서 고치거나 따라 쓰지 않습니다.
export function listRoutes(router) {
  return router.stack
    .map((layer) => {
      const [method] = Object.keys(layer.route.methods);
      return `${method.toUpperCase()} ${layer.route.path}`;
    })
    .join(', ');
}
