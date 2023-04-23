{
  // union type => or
  type Direction = "left" | "right" | "up" | "down";
  function move(arg: Direction) {
    console.log(arg);
  }

  move("right");
  move("left");

  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 16;

  // function login -> success, fail
  type Success = {
    response: {
      body: string;
    };
  };

  type Fail = {
    reason: string;
  };

  type LoginStates = Success | Fail;
  function loginMini(id: string, pw: string): LoginStates {
    return {
      response: {
        body: "hello",
      },
    };
  }

  // printLoginState(state: Login)
  // success -> body
  // fail -> reason
  function printLoginStateMini(stats: LoginStates) {
    if ("response" in stats) {
      return stats.response;
    } else {
      return stats.reason;
    }
  }
}
