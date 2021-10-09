Aop = {
  around(fnName, advice, fnObj) {
    const originalFn = fnObj[fnName];
    fnObj[fnName] = function() {
      return advice.call(this, { fn: originalFn, args: arguments });
    };
  }
};