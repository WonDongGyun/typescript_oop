{
  // type inference
  // 타입을 굳이 명시하지 않아도 자동으로 추론함.
  // 타입스크립트가 자동으로 명시해주지만, 복잡한 로직의 경우에는 한눈에 보기 편하게 그냥 명시해주는 것이 좋다.
  let text = "hello";

  // 아래의 경우에는 any 타입으로 자동으로 추론함.
  function print(msg) {
    console.log(msg);
  }

  function add(x: number, y: number) {
    return x + y;
  }

  const result = add(1, 3);
}
