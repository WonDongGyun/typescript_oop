{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // private 등의 제어자 말고도 interface로도 추상화를 구현해볼 수 있다.
  // 인터페이스는 어떤 행동을 할수 있다는 규약을 담은 계약서이다.
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 접근 제어자로 캡슐화를 구현함으로서 추상화를 달성
  class CoffeeMachine {
    private static BEANS_GRAMM_SHOT = 10;
    private coffeeBeans = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    // 커피콩 갈기
    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);

      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_SHOT) {
        throw new Error("not enough coffee beans");
      }

      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_SHOT;
    }

    // 기계 히팅
    private preheat() {
      console.log("heating up");
    }

    // 커피콩 추출
    private extract(shots: number) {
      console.log(`pulling shots ${shots}`);

      return {
        shots,
        hasMilk: false,
      };
    }

    // 커피를 만드는 단계
    // 커피콩 갈기 -> 커피 기계 히팅 -> 커피 추출
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
  }

  // 인터페이스로 추상화를 달성
  class CoffeeMachine2 implements CoffeeMaker {
    private static BEANS_GRAMM_SHOT = 10;
    private coffeeBeans = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine2 {
      return new CoffeeMachine2(coffeeBeans);
    }

    // 커피콩 갈기
    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);

      if (this.coffeeBeans < shots * CoffeeMachine2.BEANS_GRAMM_SHOT) {
        throw new Error("not enough coffee beans");
      }

      this.coffeeBeans -= shots * CoffeeMachine2.BEANS_GRAMM_SHOT;
    }

    // 기계 히팅
    private preheat() {
      console.log("heating up");
    }

    // 커피콩 추출
    private extract(shots: number) {
      console.log(`pulling shots ${shots}`);

      return {
        shots,
        hasMilk: false,
      };
    }

    // 커피를 만드는 단계
    // 커피콩 갈기 -> 커피 기계 히팅 -> 커피 추출
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
  }

  const maker = CoffeeMachine.makeMachine(100);
  maker.fillCoffeeBeans(200);
  // maker. 만써도 사용자가 사용할 수 있는 무수히 많은 함수가 노출되게 된다. 그러므로 캡슐화 혹은 인터페이스로 추상화를 구현해야 한다.
  // 추상화를 구현하면 만든이가 의도적으로 노출한 함수 혹은 클래스만 가지고도 의도 파악을 명확히 할 수 있다.
  maker.makeCoffee(10);

  const maker2: CoffeeMachine = CoffeeMachine.makeMachine(100);
  maker2.fillCoffeeBeans(200);
  maker2.makeCoffee(10);

  // 인터페이스로 추상화를 구현하면 이런식으로 maker가 CoffeeMaker, 즉 인터페이스 타입을 갖게 할 수 있다.
  // 인터페이스에 만든이가 넣어둔 함수만 사용할 수 있게 되므로, 존재하지 않는 fillCoffeeBeans는 사용불가 상태가 됨.
  const maker3: CoffeeMaker = CoffeeMachine.makeMachine(100);
  maker3.fillCoffeeBeans(200);
  maker3.makeCoffee(10);
}
