{
  class User {
    private internalAge = 18;
    // constructor(생성자)에 접근제어자 지정하면 멤버변수 선언한것과 똑같은 효과를 줄 수 있음.
    constructor(private firstName: string, private lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    get fullName(): string {
      return this.firstName + this.lastName;
    }

    get age(): number {
      return this.internalAge;
    }

    // getter, setter를 통해서 값을 설정함
    // 멤버변수처럼 사용 가능함
    set age(age: number) {
      this.internalAge = age;
    }
  }

  const user = new User("홍", "길동");
  console.log(user.fullName);
  user.age = 6;
  console.log(user.age);
}
