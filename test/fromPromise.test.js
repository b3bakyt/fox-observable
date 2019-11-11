const { fromPromise } = require('../index');
const Chai          = require('chai');
const {
  expect,
} = Chai;

describe('fromPromise', function () {

  it('Should resolve Promise value', function () {
    const p = new Promise(res => {
      setTimeout(_ => res(10), 1000)
    });
    const obs = fromPromise(p);

    obs
      .map(val => val * 2)
      .subscribe(val => {
        expect(val).equals(20);
      });
  });
});
