const { fromArray } = require('../index');
const Chai          = require('chai');
const {
  expect,
} = Chai;

describe('fromArray', function () {

  it('should map values', function () {
    const obs = fromArray([4]);

    obs
      .map(val => val * 2)
      .subscribe(val => {
        expect(val).equals(8);
      });
  });
});
