{
  // intersection type => and
  type Student = { name: "mark"; score: 100 };
  type Worker = { employeeId: number; work: () => void };

  function interScetionWork(stu: Student & Worker) {
    console.log(stu.employeeId, stu.score);
  }
  const stu: Student & Worker = {
    name: "mark",
    score: 100,
    employeeId: 1,
    work: () => {},
  };
}
