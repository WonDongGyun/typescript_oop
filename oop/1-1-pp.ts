{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 한 샷에 들어가는 커피 g
  const BEANS_GRAMM_SHOT = 10;
  // 남은 커피콩의 g
  let coffeeBeans = 100;

  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeans < shots * BEANS_GRAMM_SHOT) {
      throw new Error("not enough coffee beans");
    }

    coffeeBeans -= shots * BEANS_GRAMM_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }

  const coffee = makeCoffee(2);
  console.log(coffee);
  console.log(coffeeBeans);
}
