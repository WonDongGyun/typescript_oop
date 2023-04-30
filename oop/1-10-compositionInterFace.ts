{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface MilkSteamer {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarMixer {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  class CheapMilkSteamer implements MilkSteamer {
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

  class FancyMilkSteamer implements MilkSteamer {
    private steamMilk(): void {
      console.log("fancy steaming milk...");
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class ColdMilkSteamer implements MilkSteamer {
    private steamMilk(): void {
      console.log("cold steaming milk...");
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class CandySugarMixer implements SugarMixer {
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

  class ChocolateSugarMixer implements SugarMixer {
    private getSugar() {
      console.log("getting some sugar from chocolate");
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

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: number,
      private CheapmilkSteamer: MilkSteamer
    ) {
      super(beans);
      this.serialNumber = serialNumber;
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.CheapmilkSteamer.makeMilk(coffee);
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(private beans: number, private sugar: SugarMixer) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private CheapmilkSteamer: MilkSteamer,
      private sugar: SugarMixer
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

  const cheapMilkSteamer = new CheapMilkSteamer();
  const fancyMilkSteamer = new FancyMilkSteamer();

  const candysugarMixer = new CandySugarMixer();
  const chocolatesugarMixer = new ChocolateSugarMixer();

  // 클래스 들의 인자를 인터페이스로 대체하고, 그것을 받음으로서 완전히 다른 의미의 인스턴스가 되는것을 볼 수 있다.
  const sweetCandyMachine = new SweetCoffeeMaker(10, candysugarMixer);
  const sweetChocoMachine = new SweetCoffeeMaker(10, chocolatesugarMixer);

  const cheapLatteMachine = new CaffeLatteMachine(10, 100, cheapMilkSteamer);
  const fancyLatteMachine = new CaffeLatteMachine(10, 100, fancyMilkSteamer);

  const sweetLatteMachine = new SweetCaffeLatteMachine(
    10,
    cheapMilkSteamer,
    chocolatesugarMixer
  );
}
