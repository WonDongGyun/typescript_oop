{
    // enum
    // js에는 없기 때문에 ts에서 제공하는 기능을 사용함.
    // javascript
    var MAX_NUM = 100;
    var MIN_NUM = 10;
    var MONDAY = 0;
    var TUESDAY = 1;
    var WEDNESDAY = 2;
    var DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
    console.log(DAYS_ENUM.MONDAY);
    // typescript
    // 타입스크립트에서 enum은 가능한한 사용하지 않는 것이 좋다.
    var Days = void 0;
    (function (Days) {
        Days[Days["MONDAY"] = 0] = "MONDAY";
        Days[Days["TUESDAY"] = 1] = "TUESDAY";
        Days[Days["WEDNESDAY"] = 2] = "WEDNESDAY";
        Days["THURSDAY"] = "kk";
    })(Days || (Days = {}));
    console.log(Days.MONDAY);
    var day = Days.MONDAY;
    day = Days.TUESDAY;
    day = 1;
    console.log(day);
}
