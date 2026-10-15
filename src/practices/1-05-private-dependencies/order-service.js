// src/practices/1-05-private-dependencies/order-service.js
export class OrderService {
  // TODO 3: menuRepository와 messageProvider를 보관할 #private 필드를 선언합니다.

  constructor({ menuRepository, messageProvider }) {
    // TODO 4: 전달받은 menuRepository와 messageProvider를 #private 필드에 보관합니다.
  }

  async order({ menuId, quantity }) {
    // TODO 5: #private 필드에 보관한 두 객체를 차례로 호출합니다.
    // - menuRepository의 findById(menuId)는 Promise를 돌려주므로 await로 메뉴를 받습니다.
    // - messageProvider의 send(text)로 메뉴 이름, 수량, 금액(가격 × 수량)을 담은 문자열을 보냅니다.
    //   예: 아메리카노 2잔 주문 완료(9000원)
    // 실습을 위해 메뉴가 없을 때의 예외 처리와 주문 저장은 생략합니다.
  }
}
