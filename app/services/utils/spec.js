const { limitTo } = require('./');

describe('Limit', () => {
  it('returns function that limits array to provided number', () => {
    const limitToTwo = limitTo(2);

    expect(limitToTwo([1, 2, 3, 4, 5])).toEqual([1, 2]);
  });
});
