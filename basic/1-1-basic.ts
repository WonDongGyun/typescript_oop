{
  // javascript
  // primitive: number, string, boolean, bigInt, symbol, null, undefined
  // object: array, function ...

  // typescript
  // number
  const num: number = 0;

  // string
  const str: string = "hello world";

  // boolean
  const bool: boolean = true;

  // undefined
  // undefined 타입을 선언해서 사용하는 경우는 없음.
  //   const arg: undefined = "hello";
  let arg2: number | undefined;
  arg2 = undefined;
  arg2 = 1;

  // null
  // null도 단독으로 타입을 선언해서 사용하는 경우는 없음.
  let arg3: null;
  let arg4: number | null; // 보통은 undefined를 많이 사용함.

  // unknown
  // 가능하면 쓰지 않는 타입이지만, 타입이 없는 자바스크립트와 연동해서 사용할 수 있기 때문에 사용할 수도 있는 타입이다.
  let notData: unknown = 0; // 어떤 타입이 올지 모르기 때문에, 어떤 값이든 변수에 담길 수 있다.

  // any
  // 가능하면 쓰지 않는 타입이다.
  let anything: any = 0;
  anything = "hello";

  // void
  // 어떠한 값도 리턴하지 않을 때 사용한다.
  // 변수에 선언하는 경우는 없다. 사용한다 하더라도 undefined 값밖에 들어갈 수 없다.
  function print(): void {
    console.log("1");
  }

  // never
  function throwError(msg: string): never {
    throw new Error(msg);
  }

  // object
  let obj: object;
  // obejct 타입 또한 구체적으로 작성해서 사용하는게 더 좋음.
  function acceptObj(obj: object) {}
}
