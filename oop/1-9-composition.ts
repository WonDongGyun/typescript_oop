{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  // 상속의 단점은 상속의 깊이가 점점 깊어지면 깊어질 수록 관계가 복잡해진다.
  // 그리고 부모 클래스의 어떤 행동을 수정하면 그것을 상속받는 모든 자식들에 영향이 가게 된다.
  // 또한 타입스크립트에서는 한가지 이상의 부모클래스를 상속받을 수 없다.
  // 상속이 반드시 나쁜것은 아니지만 너무 깊은 상속은 지양해야 한다.

  // 불필요한 상속 대신 composition(구성)이라는 기법을 사용하게 된다.

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log("steaming milk...");
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class CandySugarMixer {
    private getSugar() {
      console.log("getting some sugar from candy");
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
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

  // 더 이상 우유, 설탕을 첨가할 때마다 자식 클래스에 기능을 구현하지 않고 외부에서 해당 기능을 만든 클래스를 만들고 조립해서 구성해버리면 쉽고 코드량도 줄어든다.

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: number,
      private CheapmilkSteamer: CheapMilkSteamer
    ) {
      super(beans);
      this.serialNumber = serialNumber;
    }

    // private steamMilk(): void {
    //   console.log("steaming milk...");
    // }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.CheapmilkSteamer.makeMilk(coffee);
      //   this.steamMilk();
      //   return {
      //     shots,
      //     hasMilk: true,
      //   };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(private beans: number, private sugar: CandySugarMixer) {
      super(beans);
    }
    // getSugar() {
    //   console.log("getting some sugar");
    // }
    // makeCoffee(shots: number): CoffeeCup {
    //   const coffee = super.makeCoffee(shots);
    //   this.getSugar();
    //   return {
    //     ...coffee,
    //     hasSugar: true,
    //   };
    // }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  // 구성 기법을 사용하면 해당 기능이 존재하는 클래스를 주입받아서 필요한 기능을 만들고 재사용할 수 있다.
  // 구성은 코드의 재사용성을 확 높여준다.
  // 또한 상속의 수직 구조를 최대한 피하고 단계를 1단계로 유지할 수 있어서 상속 관계에 있는 클래스간 기능 수정을 비교적 쉽게 할 수 있다.

  // 단, SweetCaffeLatteMachine의 경우 CheapMilkSteamer, CandySugarMixer 클래스와 강결합이 되어 있어서 나중에 수정하려고 하면 관련된 모든 클래스가 업데이트 되어야 한다.
  // 클래스와 클래스간에 강결합은 절대 좋지 않기 때문에 해당 문제를 해결해야 한다.
  // 따라서 클래스를 그대로 노출하는것보다 계약서. 즉, 인터페이스를 활용하여 의사소통 하는것이 중요하다.
  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private CheapmilkSteamer: CheapMilkSteamer,
      private sugar: CandySugarMixer
    ) {
      super(beans);
    }

    private sugarAndMilk(cup: CoffeeCup) {
      const addSugar = this.sugar.addSugar(cup);
      return this.CheapmilkSteamer.makeMilk(addSugar);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugarAndMilk(coffee);
    }
  }

  // 만약 sweetMachine 에서는 사탕이 아닌 슈가 파우더 믹서, latteMachine 에서는 더 비싼 우유 스티머가 필요하다면 관련 코드를 모조리 바꿔야 한다.
  const CheapmilkSteamer = new CheapMilkSteamer();
  const CandysugarMixer = new CandySugarMixer();
  const sweetMachine = new SweetCoffeeMaker(10, CandysugarMixer);
  const latteMachine = new CaffeLatteMachine(10, 100, CheapmilkSteamer);
  const sweetLatteMachine = new SweetCaffeLatteMachine(
    10,
    CheapmilkSteamer,
    CandysugarMixer
  );
}
