interface StackExample {
  readonly size: number;
  push(word: string): void;
  pop(): void;
}

type StackNode = {
  readonly value: string;
  readonly next?: StackNode;
};

class StackImpl implements StackExample {
  // 내부에서만 쓰이는 변수의 경우 _를 사용해서 붙이는게 일반적
  private _size: number = -1;
  private head?: StackNode;

  push(word: string) {
    const node: StackNode = {
      value: word,
      next: this.head,
    };

    this.head = node;
    this._size++;
  }

  pop() {
    if (!this.head) {
      throw new Error("stack is empty");
    }

    const node = this.head;
    this.head = node.next;
    this._size--;
    console.log(node.value);
  }

  get size() {
    return this._size;
  }

  get getHead() {
    return this.head;
  }
}

const stackExam = new StackImpl();
stackExam.push("홍");
stackExam.push("길");
stackExam.push("동");
console.log(stackExam.getHead);
stackExam.pop();
stackExam.pop();
stackExam.pop();
