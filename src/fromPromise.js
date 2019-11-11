const { DataEmitter }   = require('./events');
const {
  getOperators,
  subscribe, }          = require('./operators');

function fromPromise(promise) {
  const dataEmitter = new DataEmitter();
  const operatorsFlow = [];

  function startEmittingData() {
    promise.then(data => dataEmitter.emit('data', data));
  }

  return Object.freeze({
    ...getOperators(operatorsFlow),
    subscribe:  subscribe(dataEmitter, operatorsFlow, startEmittingData),
  });
}

module.exports = {
  fromPromise,
};
