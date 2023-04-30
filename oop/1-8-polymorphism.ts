{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_SHOT = 10;
    private coffeeBeans = 0;

    public constructor(coffeeBeans: number) {
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

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: number) {
      super(beans);
      this.serialNumber = serialNumber;
    }

    private steamMilk(): void {
      console.log("steaming milk...");
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }

  const machines: CoffeeMaker[] = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, 123),
    new SweetCoffeeMaker(20),
  ];

  // 다형성은 하나의 클래스를 상속받아서 각자의 자식 클래스에서 다양한 기능을 만들 수 있다.
  // 또 하나 중요한 점은 아래의 코드 처럼 클래스 구분을 하지 않아도 동일한 api 혹은 함수를 이용하게 할 수 있다는 장점이 있다.
  // 인터페이스 혹은 부모를 상속받음으로서 자식에서는 해당 구현을 신경쓰지 않고 개발할 수 있다는 장점도 있다.
  machines.forEach((machine) => {
    console.log("====================");
    machine.makeCoffee(1);
  });
}
