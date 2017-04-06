const { getComments } = require('./');

jest.mock('request-promise');
const request = require('request-promise');

describe('Facebook API client', () => {
  describe('comments getter', () => {
    beforeEach(() => {
      request
        .mockReturnValueOnce(Promise.resolve({
          data: [{ message: '1' }, { message: '2' }],
          paging: { next: 'https://next-uri.com' },
        }))
        .mockReturnValueOnce(Promise.resolve({
          data: [{ message: '3' }, { message: '4' }],
          paging: { next: 'https://next-uri.com' },
        }))
        .mockReturnValue(Promise.resolve({
          data: [{ message: '5' }],
          paging: {},
        }));
    });

    it('gets all paginated comments', () => getComments(12345).then((comments) => {
      expect(comments).toEqual([
        { message: '1' },
        { message: '2' },
        { message: '3' },
        { message: '4' },
        { message: '5' },
      ]);
    }));
  });
});
