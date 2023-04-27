{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAMM_SHOT = 10;
    private coffeeBeans = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);

      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_SHOT) {
        throw new Error("not enough coffee beans");
      }

      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_SHOT;
    }

    private preheat() {
      console.log("heating up");
    }

    private extract(shots: number) {
      console.log(`pulling shots ${shots}`);

      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans = beans;
    }

    clean() {
      console.log("cleaning the machine");
    }
  }

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}

    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}

    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(100);
      this.machine.clean();
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(100);
  maker.fillCoffeeBeans(200);
  maker.makeCoffee(10);

  // 클래스로 타입을 지정해주면 하위의 public 함수들에 모두 접근할 수 있지만, 인터페이스로 타입을 지정해주면 인터페이스에만 정의되어 있는 기능에만 접근할 수 있다.
  const maker2: CommercialCoffeeMaker = CoffeeMachine.makeMachine(100);
  maker2.fillCoffeeBeans(200);
  maker2.makeCoffee(10);
  maker2.clean();

  // 같은 anotherMaker를 사용하지만 아래의 예제는 서로 다른 인터페이스 형식을 따르기 때문에 결과값이 다르다.
  // 따라서 사용자는 해당 인터페이스들이 어떻게 구현되어 있는지, 얼마나 복잡한지 신경쓸 필요없이 인터페이스 규약에 있는 함수만 사용하면 된다.
  // 인터페이스 사용법만 알면 되기 때문에 훨씬 로직이 간단해진다.
  const anotherMaker: CoffeeMachine = CoffeeMachine.makeMachine(300);
  const ama = new AmateurUser(anotherMaker);
  const pro = new ProBarista(anotherMaker);
  ama.makeCoffee();
  pro.makeCoffee();
}
