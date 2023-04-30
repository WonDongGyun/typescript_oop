{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // abstract 클래스의 인스턴스는 만들 수 없다.
  // abstract 자체는 만들어지는것이 목적이 아닌, 부모 클래스에서 필요한 것을 정의해두고 자식들이 해당 기능을 반드시 구현하도록 강제하는 것이 목적이다.
  // 자식에서 해당 함수를 실수로 사용하지 않는 경우를 방지하기 위함이기도 함.
  // 조금 더 안전하게 기능 구현을 시키도록 할 수 있고, 재정의를 편하게 할 수 있게 함.
  // 가능하면 composition이 좋긴 합니다.
  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_SHOT = 10;
    private coffeeBeans = 0;

    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // abstract 클래스의 인스턴스는 만들 수 없다.
    // static makeMachine(coffeeBeans: number): CoffeeMachine {
    //   return new CoffeeMachine(coffeeBeans);
    // }

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

    // 자식 클래스마다 달라지는 행동이 존재한다면 abstract 키워드를 사용해서 추상 메소드를 만들 수 있다.
    // 자식에서만 접근할 것이기 때문에 protected를 반드시 붙여줘야 한다.
    // 이렇게 한다면 반드시 자식에서는 extract 함수에 접근해서 사용해야 한다.
    protected abstract extract(shots: number): CoffeeCup;

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

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
      };
    }
  }

  const machines: CoffeeMaker[] = [
    new CaffeLatteMachine(16, 123),
    new SweetCoffeeMaker(20),
  ];

  machines.forEach((machine) => {
    console.log("====================");
    machine.makeCoffee(1);
  });
}
