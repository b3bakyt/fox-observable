const { DataEmitter }   = require('./events');
const {
  getOperators,
  subscribe, }          = require('./operators');

function fromArray(array) {
  const dataEmitter = new DataEmitter();
  const operatorsFlow = [];

  function startEmittingData() {
    array.map(data => dataEmitter.emit('data', data));
  }

  return Object.freeze({
    ...getOperators(operatorsFlow),
    subscribe:  subscribe(dataEmitter, operatorsFlow, startEmittingData),
  });
}

module.exports = {
  fromArray,
};
