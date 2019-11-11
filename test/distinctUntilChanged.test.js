const { fromArray } = require('../index');
const Chai          = require('chai');
const {
  expect,
} = Chai;

describe('distinctUntilChanged', function () {

  it('should map unique values', function () {
    const obs = fromArray([1,1,3,2,1,4,4,5]);
    const results = [1,3,2,1,4,5];
    let i = 0;

    obs
      .distinctUntilChanged()
      .subscribe(val => {
        expect(val).equals(results[i++]);
      });
  });

  it('should work independently on each call', function () {
    const obs = fromArray([1,1,3,2,1,4,4,5,6,7]);
    const results = [1,3,2,1,4];
    let i = 0;

    obs
      .distinctUntilChanged()
      .map(val => val > 3 ? 4 : val)
      .distinctUntilChanged()
      .subscribe(val => {
        expect(val).equals(results[i++]);
      });
  });
});
