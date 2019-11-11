const FUNCTION_TYPE = {
  map: 'map',
};

const FUNCTION = {
  map: data => cb => cb(data),
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

  function subscribe(cb) {
    dataFlow.map(val => {
      const result = callbacksFlow.reduce((acc, cbData) => {
        return FUNCTION[cbData.type](acc)(cbData.callback);
      }, val);

      cb(result);
    });
  }

  return Object.create({
    map,
    subscribe,
  });
}

module.exports = {
  fromArray,
};
