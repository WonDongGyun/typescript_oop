{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 상속없이 만든 카페라떼 머신
  // 코드가 CoffeeMachine과 거의 일치한다. 코드의 중복이 엄청나게 발생
  class CaffeLatteMachine {
    private static BEANS_GRAMM_SHOT = 10;
    private coffeeBeans = 0;

    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CaffeLatteMachine {
      return new CaffeLatteMachine(coffeeBeans);
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);

      if (this.coffeeBeans < shots * CaffeLatteMachine.BEANS_GRAMM_SHOT) {
        throw new Error("not enough coffee beans");
      }

      this.coffeeBeans -= shots * CaffeLatteMachine.BEANS_GRAMM_SHOT;
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
      const coffee = this.extract(shots);
      return { ...coffee, hasMilk: true };
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

  // 상속을 사용하면 부모읙 기능을 그대로 재사용하면서 코드량을 줄일 수 있다.
  // 부모의 동작을 수정해서 자식만의 기능으로 재정의 할 수 있고, 새로운 기능을 만들수도 있다.
  // super 키워드로 부모 클래스에 있는 함수를 호출하거나 접근할 수 있다.
  class CaffeLatteMachine2 extends CoffeeMachine {
    // 자식 클래스에서 생성자를 만들기 위해서는 반드시 super를 사용해서 부모 클래스의 생성자를 호출해야 한다.
    // 만약 부모 클래스의 생성자가 인자를 받는다면 반드시 넣어줘야 한다.
    constructor(beans: number, public readonly serialNumber: number) {
      super(beans);
      this.serialNumber = serialNumber;
    }

    private steamMilk(): void {
      console.log("steaming milk...");
    }

    // overriding 부모의 함수 수정 혹은 새로운 기능으로 덮어쓰기
    // super 키워드를 사용하면 부모의 함수를 그대로 사용할 수 있다.
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  const machine = new CoffeeMachine(100);
  const lattemachine = new CaffeLatteMachine2(100, 10);
  const coffee = lattemachine.makeCoffee(1);
  console.log(coffee);
  console.log(lattemachine.serialNumber);
}
