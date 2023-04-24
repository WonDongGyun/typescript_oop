{
  // 절차 지향적 구현

  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // class안의 멤버변수는 const let function등은 사용하지 않아도 된다.
  // class안의 멤버변수에 접근하기 위해서는 this 키워드를 사용해야 한다.
  // constructor는 class의 인스턴스를 만들기 위해 사용된다.
  // 여기서 BEANS_GRAMM_SHOT은 커피메이커마다 공통으로 들어가는 멤버변수라고 할 수 있다.
  // 따라서 static을 붙여준다. 붙이지 않으면, CoffeMaker를 만들때마다 BEANS_GRAMM_SHOT이 중복되어 들어가서 메모리 낭비가 발생한다.
  // static을 붙인 멤버변수는 class 자체에 귀속되기 때문에 this 키워드를 사용하지 않고 class 이름을 사용한다.
  // static을 붙인 멤버변수는 인스턴스를 만들때마다 생성되지 않아서 메모리 낭비를 줄일 수 있다.

  // 따라서 class를 생성할때마다 새로 만들어져야 하는 데이터는 멤버변수로 만들고, class level에서 공유할 데이터가 있다면 static으로 설정해준다.
  // 함수에도 static을 붙일 수 있다. static 함수는 CoffeeMaker를 생성하지 않아도 사용할 수 있는 함수가 된다.
  class CoffeeMaker {
    // 한 샷에 들어가는 커피 g
    static BEANS_GRAMM_SHOT = 10; // class level
    // 남은 커피콩의 g
    coffeeBeans = 0; // instance level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

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
  }

  const maker = new CoffeeMaker(100);
  console.log(maker);
  const maker2 = new CoffeeMaker(200);
  console.log(maker2);

  const maker3 = CoffeeMaker.makeMachine(10);
}
