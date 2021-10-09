DiContainer = function () {
  if (!(this instanceof DiContainer)) return new DiContainer();

  this.registrations = [];
};

DiContainer.prototype.messages = {
  registerRequiresArgs: '이 생성자 함수는 인자가 3개 있어야 합니다: ' +
    '문자열, 문자열 배열, 함수'
};

DiContainer.prototype.register = function (name, dependencies, func) {

  if (typeof name != 'string'
    || !Array.isArray(dependencies)
    || typeof func != 'function') {
    throw new Error(this.messages.registerRequiresArgs);
  }

  for (let ix = 0; ix < dependencies.length; ix++) {
    if (typeof dependencies[ix] !== 'string') {
      throw new Error(this.messages.registerRequiresArgs);
    }
  }

  this.registrations[name] = { dependencies: dependencies, func: func };
};

DiContainer.prototype.get = function (name) {
  var registration = this.registrations[name],
    dependencies = [];

  if (registration == undefined) return undefined;

  registration.dependencies.forEach(dependencyName => {
    var dependency = this.get(dependencyName);
    dependencies.push(dependency === undefined ? undefined : dependency);
  });

  return registration.func.apply(undefined, dependencies);
};