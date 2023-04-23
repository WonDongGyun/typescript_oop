{
  // // javascript
  // // 일반적인 javascript에서는 타입을 지정할 수 없기 때문에 의도한건 숫자형 덧셈 함수지만, 모든 타입의 덧셈 함수가 되버린다.
  // function jsAdd(num1, num2) {
  //   return num1 + num2;
  // }

  // function jsFetchNum(id) {
  //   return new Promise((resolve, reject) => {
  //     // code ...
  //     // code ...
  //     // code ...
  //     resolve(100);
  //   });
  // }

  // // typescript
  // function tsAdd(num1: number, num2: number) {
  //   return num1 + num2;
  // }

  // function tsFetchNum(id: string): Promise<number> {
  //   return new Promise((resolve, reject) => {
  //     // code ...
  //     // code ...
  //     // code ...
  //     resolve(100);
  //   });
  // }

  // javascript => typescript
  // optional parameter
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }

  printName("mark");
  printName("mark", "tison");
  printName("mark", undefined);

  // default parameter
  function printMessage(msg: string = "나는 최고의 프로그래머") {
    console.log(msg);
  }

  printMessage();

  // rest parameter
  const addNumbers = (...args: number[]) => {
    return args.reduce((a, b) => a + b);
  };
  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3));
}
