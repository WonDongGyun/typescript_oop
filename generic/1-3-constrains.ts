interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay(): void {
    console.log("Full time!");
  }

  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay(): void {
    console.log("Part time!");
  }

  workPartTime() {}
}

// FullTimeEmployee, PartTimeEmployee 형태를 받겠다고 Employee 타입을 인자로 하는 함수
// 그러나 밑에 예시처럼 데이터가 유실돼버릴 수 있음.
// 세부적인 타입을 인자로 받아서 정말 추상적인 타입으로 다시 리턴하는 함수는 자살행위!
function payBad(emp: Employee): Employee {
  emp.pay();
  return emp;
}

function payGood<T extends Employee>(emp: T): T {
  emp.pay();
  return emp;
}

const tom = new FullTimeEmployee();
const killdong = new PartTimeEmployee();
tom.workFullTime();
killdong.workPartTime();

// payBad함수는 Employee 타입을 리턴한다.
// tom과 killdong은 각각 FullTimeEmployee, PartTimeEmployee 인스턴스이지만 payBad 함수는 Employee를 리턴하기 때문에 각 인스턴스의 정보를 잃어버리고 만다.
// 그래서 tomAfterPay는 Employee class에 정의된 pay함수만 사용할 수 있게 돼버리는 대참사가 발생한다.
const tomAfterPayBad = payBad(tom);
const killdongAfterPayBad = payBad(killdong);
tomAfterPayBad.pay();

const tomAfterPayGood = payGood(tom);
tomAfterPayGood.pay();

const obj = {
  name: "killdong",
  age: 20,
};

const obj2 = {
  animal: "dog",
};

function getValue<T, K extends keyof T>(arg1: T, arg2: K): T[K] {
  return arg1[arg2];
}

console.log(getValue(obj, "name"));
console.log(getValue(obj2, "animal"));
