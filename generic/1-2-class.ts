// either => a or b
interface Either<L, R> {
  left: () => L;
  right: () => R;
}

// 사용하는 사람이 타입을 결정하도록 제네릭 사용
class SimpleEither<L, R> implements Either<L, R> {
  constructor(private leftValue: L, private rightValue: R) {}
  left(): L {
    return this.leftValue;
  }
  right(): R {
    return this.rightValue;
  }
}

const either = new SimpleEither({ name: "홍길동" }, "5");
console.log(either.left());
console.log(either.right());
