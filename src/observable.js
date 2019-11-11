const { DataEmitter }   = require('./events');
const { FUNCTION_TYPE } = require('./constants');
const {
  setOperator,
  subscribe, }          = require('./operators');

function fromArray(array) {
  const dataEmitter = new DataEmitter();
  const operatorsFlow = [];

  function startEmittingData() {
    array.map(data => dataEmitter.emit('data', data));
  }

  return Object.create({
    map:        setOperator(operatorsFlow)(FUNCTION_TYPE.map),
    filter:     setOperator(operatorsFlow)(FUNCTION_TYPE.filter),
    subscribe:  subscribe(dataEmitter, operatorsFlow, startEmittingData),
  });
}

module.exports = {
  fromArray,
};
