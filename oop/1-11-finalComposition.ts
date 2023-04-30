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

    public constructor(
      coffeeBeans: number,
      private milkSteamer: MilkSteamer,
      private sugarMixer: SugarMixer
    ) {
      this.coffeeBeans = coffeeBeans;
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

    private sugarAndMilk(cup: CoffeeCup) {
      const addSugar = this.sugarMixer.addSugar(cup);
      return this.milkSteamer.makeMilk(addSugar);
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();

      const coffee = this.extract(shots);
      return this.sugarAndMilk(coffee);
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

  const cheapMilkSteamer = new CheapMilkSteamer();
  const fancyMilkSteamer = new FancyMilkSteamer();

  const candysugarMixer = new CandySugarMixer();
  const chocolatesugarMixer = new ChocolateSugarMixer();

  // 이런식으로 기존에 상속받은 클래스들을 없애고, 인터페이스를 받게해서 인터페이스에 의해 결정되는 여러개의 객체를 생성하는 기법도 사용해볼 수 있다.
  const sweetCandyMachine = new CoffeeMachine(
    10,
    cheapMilkSteamer,
    candysugarMixer
  );
  const sweetChocoMachine = new CoffeeMachine(
    10,
    fancyMilkSteamer,
    chocolatesugarMixer
  );
}
