// 실습용: 데이터베이스 대신 메모리 배열에서 메뉴를 찾습니다.
const menus = [
  { id: 1, name: '아메리카노', price: 4500 },
  { id: 2, name: '카페라테', price: 5000 },
];

export class MenuRepository {
  async findById(id) {
    return menus.find((menu) => menu.id === id) ?? null;
  }
}
