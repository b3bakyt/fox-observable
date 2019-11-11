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
        if (acc === COMMAND.filter_not_passed)
          return COMMAND.filter_not_passed;

        return OPERATORS[cbData.type](acc)(cbData.callback);
      }, val);

      if (result === COMMAND.filter_not_passed)
        return;

      cb(result);
    });

    startEmittingData();
  };
}

const OPERATORS = {
  map: data => cb => cb(data),
  filter: data => cb => {
    if (!cb(data))
      return COMMAND.filter_not_passed;

    return data;
  },
};

function getOperators(operators) {
  return {
    map:    setOperator(operators)(FUNCTION_TYPE.map),
    filter: setOperator(operators)(FUNCTION_TYPE.filter),
  }
}

module.exports = {
  OPERATORS,
  subscribe,
  getOperators,
};
