type StackType = {
  [key: string]: string;
};

class Stack {
  private top: number;
  private memory: StackType;

  constructor() {
    this.top = -1;
    this.memory = {};
  }

  pop() {
    console.log(this.memory[this.top] + " pop");
    delete this.memory[this.top];
    this.top--;
  }

  push(word: string) {
    this.top++;
    this.memory[this.top] = word;

    console.log(this.top + ": push " + word);
  }

  get getMemory() {
    return this.memory;
  }

  get getTop() {
    return this.top;
  }
}

const stack = new Stack();
stack.push("홍");
stack.push("길");
stack.push("동");
console.log(stack.getMemory);
console.log(stack.getTop);

stack.pop();
stack.pop();
stack.pop();
console.log(stack.getMemory);
console.log(stack.getTop);
