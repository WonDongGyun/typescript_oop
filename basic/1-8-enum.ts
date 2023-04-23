{
  // enum
  // js에는 없기 때문에 ts에서 제공하는 기능을 사용함.

  // javascript
  const MAX_NUM = 100;
  const MIN_NUM = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  console.log(DAYS_ENUM.MONDAY);

  // typescript
  // 타입스크립트에서 enum은 가능한한 사용하지 않는 것이 좋다.
  // enum을 사용하면 타입이 정확하게 보장되지 않는다.
  // union으로 충분히 대체될 수 있다.
  enum Days {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY = "kk",
  }
  console.log(Days.MONDAY);

  let day: Days = Days.MONDAY;
  day = Days.TUESDAY;
  day = 1;
  console.log(day);

  type DaysUnion = "MONDAY" | "TUESDAY" | "WEDNESDAY";
  let dayUnion: DaysUnion = "TUESDAY";
  console.log(dayUnion);
}
