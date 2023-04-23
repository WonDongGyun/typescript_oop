{
  // function login -> success, fail
  type Success = {
    state: "success";
    response: {
      body: string;
    };
  };

  type Fail = {
    state: "fail";
    reason: string;
  };

  type LoginStates = Success | Fail;
  function login(id: string, pw: string): LoginStates {
    return {
      state: "success",
      response: {
        body: "hello",
      },
    };
  }

  // printLoginState(state: Login)
  // success -> body
  // fail -> reason
  function printLoginState(stats: LoginStates) {
    if (stats.state === "success") {
      return stats.response;
    } else {
      return stats.reason;
    }
  }
}
