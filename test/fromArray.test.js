const { fromArray } = require('../index');
const Chai          = require('chai');
const {
  expect,
} = Chai;

describe('fromArray', function () {

  it('should map values', function () {
    const obs = fromArray([1,3,4]);
    const results = [2,6,8];
    let i = 0;

    obs
      .map(val => val * 2)
      .subscribe(val => {
        expect(val).equals(results[i++]);
      });
  });

  it('Should filter values', function () {
    const obs = fromArray([4, 5, 3]);
    const results = [8,6];
    let i = 0;

    obs
      .filter(val => val < 5)
      .map(val => val * 2)
      .subscribe(val => {
        expect(val).equals(results[i++]);
      });
  });
});
