const { COMMAND }       = require('./constants');
const { FUNCTION_TYPE } = require('./constants');


function setOperator(callbacks) {
  return function(cbType) {
    return function(cb) {
      callbacks.push({
        callback: cb,
        type: cbType,
      });

      return this;
    }
  }
}

function subscribe(dataEmitter, operators, startEmittingData) {
  return cb => {
    dataEmitter.on('data', val => {
      const result = operators.reduce((acc, cbData) => {
        if (acc === COMMAND.avoid_next_operators)
          return COMMAND.avoid_next_operators;

        if (cbData.callback)
          return OPERATORS[cbData.type](acc)(cbData.callback);

        return OPERATORS[cbData.type](acc);
      }, val);

      if (result === COMMAND.avoid_next_operators)
        return;

      cb(result);
    });

    startEmittingData();
  };
}

function makeDistinctUntilChanged(operators) {
  return function() {
    let prevValue;

    const cb = data => {
      if (prevValue === data)
        return false;

      prevValue = data;
      return true;
    };

    return setOperator(operators)(FUNCTION_TYPE.distinctUntilChanged).call(this, cb);
  }
}

const OPERATORS = {
  map: data => cb => cb(data),
  filter: data => cb => {
    if (!cb(data))
      return COMMAND.avoid_next_operators;

    return data;
  },
  distinctUntilChanged: data => cb => {
    if (!cb(data))
      return COMMAND.avoid_next_operators;

    return data;
  }
};

function getOperators(operators) {

  return {
    map:    setOperator(operators)(FUNCTION_TYPE.map),
    filter: setOperator(operators)(FUNCTION_TYPE.filter),
    distinctUntilChanged: makeDistinctUntilChanged(operators),
  }
}

module.exports = {
  OPERATORS,
  subscribe,
  getOperators,
};
