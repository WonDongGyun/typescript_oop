{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // public     => 공개
  // private    => 누구라도 외부에서 접근 불가
  // protected  => 상속시 외부에서 접근할수는 없지만 상속받은 자식에서만 접근가능
  // 디폴트는 public
  class CoffeeMaker {
    private static BEANS_GRAMM_SHOT = 10;
    private coffeeBeans = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // 누군가가 static을 사용해서 object를 만들수 있는 함수를 제공한다면, 생성자로 object를 만드는것을 금지하기 위함일 수 있다.
    // 따라서 constructor에 private을 붙여서 함수를 사용할 수 있도록 유도하는게 좋다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_SHOT) {
        throw new Error("not enough coffee beans");
      }

      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }

    // 외부에서 직접 상태 값을 수정하도록 하는것보다 함수를 통해서 간접적으로 설정하는게 좋음.
    // 함수를 이용하기 때문에 유효성 검사도 할 수 있고 안정성을 높일 수 있음.
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans = beans;
    }
  }

  const maker = CoffeeMaker.makeMachine(100);
  // 위의 코드의 문제점은 이처럼 coffeeBeans 및 BEANS_GRAMM_SHOT의 상태를 외부에서 직접적으로 마음대로 설정해버릴 수 있음.
  // 따라서 정보를 은닉해야함.
  //   maker.coffeeBeans = 10;
  maker.fillCoffeeBeans(200);
}
