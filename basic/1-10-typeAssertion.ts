{
  // type assertion
  // 좋은 기능은 아니기에 피하는게 베스트
  // 어떤 타입인지 100% 정확하게 아는 경우만 사용해야 함.

  // javascript는 아래의 경우에 리턴값의 타입을 전혀 알지 못함.
  function jsStr() {
    return "hello";
  }

  const result = jsStr();
  console.log(result.length);
  console.log((result as string).length);
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1));

  // undefined가 들어갈 수도 있지만... 그래도 값이 있다고 장담한다면?
  // !를 붙여서 undefined가 아니라는 것을 알려줄 수 있음.
  // 물론 나쁜 코드
  function findNumber(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumber();
  numbers!.push(2);
}
