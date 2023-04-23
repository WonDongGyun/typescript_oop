{
  // array
  const fruitString: string[] = ["apple", "banana"];
  const fruitNumber: Array<number> = [1, 12];

  // 인자로 들어오는 배열에 불변성을 부여
  function printArray(fruitString: readonly string[]) {}

  //   // ts에서는 Array<> 형식에 readonly를 지원하지 않음.
  //   function printArray(fruitString: readonly Array<string>) {
  //     fruitString.push();
  //   }

  // tuple
  // 서로 다른 타입을 넣을 수 있음
  // 다만, 튜플을 사용하는 것을 권장하지 않음.
  // student[0] 이런 경우 한눈에 어떤 데이터가 들어가있는지 명확하지 않음.
  // 차라리 object 형태로 만들어서 키값으로 읽어오는게 좋지...
  // tuple => interface, type alias, class 등으로 대체 가능
  let student: [number, string];
  student = [0, "mark"];
}
