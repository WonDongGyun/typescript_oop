{
  // 넓값을 확인하는 함수. 하지만 숫자만 가능하다.
  function checkNotnullCase1(arg: number | null): number {
    if (arg == null) {
      throw new Error("not valid number");
    }

    return arg;
  }

  // any 형태로 number 형 아니라도 다른것보 받을 수 있음.
  // 하지만 사용하는 곳에서 타입 추론이 불가능함. 따라서 안좋음
  function checkNotnullCase2(arg: any | null): any {
    if (arg == null) {
      throw new Error("not valid number");
    }

    return arg;
  }

  // 제네릭
  //제네릭을 이용해서 어떤 타입이든지 처리할 수 있고, 타입도 보장 받을 수 있음.
  function checkNotnullCase3<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error("not valid number");
    }

    return arg;
  }

  const result1 = checkNotnullCase1(123);
  console.log(result1);

  const result2 = checkNotnullCase2(123);

  const result3 = checkNotnullCase3(123);
  console.log(result3);

  const result4 = checkNotnullCase3<string>("123");
  console.log(result4);
}
