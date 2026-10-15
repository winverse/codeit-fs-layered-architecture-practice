// 실습용 메모리 데이터베이스입니다. 실행할 때마다 아래 사용자로 시작합니다.
// password는 비밀번호 codeit1234를 PasswordProvider의 hash로 만든 값입니다.
export const db = {
  users: [
    {
      id: 1,
      email: 'kim@codeit.kr',
      password:
        'cfd6cc858facbfbee4dcb18b24560a1deacb59c466f4236a22e7ff7435600cfb',
      name: '김코드',
    },
  ],
};
