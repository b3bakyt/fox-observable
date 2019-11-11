const COMMAND = {
  filter_not_passed: Symbol('filter_not_passed'),
};

const FUNCTION_TYPE = {
  map: 'map',
  filter: 'filter',
};

const FUNCTION = {
  map: data => cb => cb(data),
  filter: data => cb => {
    if (!cb(data))
      return COMMAND.filter_not_passed;

    return data;
  },
};

function fromArray(array) {
  const dataFlow = [...array];
  const callbacksFlow = [];

  function map(cb) {
    callbacksFlow.push({
      callback: cb,
      type: FUNCTION_TYPE.map,
    });

    return this;
  }

  function filter(cb) {
    callbacksFlow.push({
      callback: cb,
      type: FUNCTION_TYPE.filter,
    });

    return this;
  }

  function subscribe(cb) {
    dataFlow.map(val => {
      const result = callbacksFlow.reduce((acc, cbData) => {
        if (acc === COMMAND.filter_not_passed)
          return COMMAND.filter_not_passed;

        return FUNCTION[cbData.type](acc)(cbData.callback);
      }, val);

      if (result === COMMAND.filter_not_passed)
        return;

      cb(result);
    });
  }

  return Object.create({
    map,
    filter,
    subscribe,
  });
}

module.exports = {
  fromArray,
};
