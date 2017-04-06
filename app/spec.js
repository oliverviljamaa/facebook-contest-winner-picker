const app = require('./');
const Browser = require('zombie'); // eslint-disable-line import/no-extraneous-dependencies

jest.mock('./services/random-users-getter');
jest.mock('./services/users-with-most-comments-getter');

const getRandomUsers = require('./services/random-users-getter');
const getUsersWithMostComments = require('./services/users-with-most-comments-getter');


describe('App', () => {
  let server;
  let browser;

  beforeEach(() => {
    server = app.listen(3000);
    browser = new Browser({ site: 'http://localhost:3000' });
  });

  afterEach((done) => {
    server.close(done);
  });

  describe('getting random users', () => {
    describe('when id is valid', () => {
      beforeEach(() => {
        getRandomUsers.mockImplementation(() => Promise.resolve([
          { id: 1, name: 'Uku' },
          { id: 2, name: 'Rain' },
          { id: 3, name: 'Mari-Liis' },
        ]));
      });

      beforeEach(() => browser.visit('/'));

      beforeEach(() =>
        browser
          .fill('postId', 12345)
          .fill('limit', 3)
          .pressButton('Get random users')
      );

      it('queries for comments with post id', () => {
        expect(getRandomUsers).toHaveBeenCalledWith('12345', '3');
      });

      it('shows correct number of users', () => {
        browser.assert.elements('li', 3);
      });
    });

    describe('when id is invalid', () => {
      beforeEach(() => {
        getRandomUsers.mockImplementation(() => Promise.reject(new Error('Error')));
      });

      beforeEach(() => browser.visit('/'));

      beforeEach(() =>
        browser
          .fill('postId', 12345)
          .fill('limit', 3)
          .pressButton('Get random users')
      );

      it('shows error', () => {
        browser.assert.elements('.error', 1);
      });
    });
  });

  describe('getting users with most comments', () => {
    describe('when id is valid', () => {
      beforeEach(() => {
        getUsersWithMostComments.mockImplementation(() => Promise.resolve([
          { id: 1, name: 'Uku' },
          { id: 2, name: 'Rain' },
          { id: 3, name: 'Mari-Liis' },
          { id: 4, name: 'Esko' },
          { id: 5, name: 'Timothy' },
        ]));
      });

      beforeEach(() => browser.visit('/'));

      beforeEach(() =>
        browser
          .fill('postId', 12345)
          .fill('limit', 5)
          .pressButton('Get users with most comments')
      );

      it('queries for comments with post id', () => {
        expect(getUsersWithMostComments).toHaveBeenCalledWith('12345', '5');
      });

      it('shows correct number of users', () => {
        browser.assert.elements('li', 5);
      });
    });

    describe('when id is invalid', () => {
      beforeEach(() => {
        getUsersWithMostComments.mockImplementation(() => Promise.reject(new Error('Error')));
      });

      beforeEach(() => browser.visit('/'));

      beforeEach(() =>
        browser
          .fill('postId', 12345)
          .fill('limit', 3)
          .pressButton('Get users with most comments')
      );

      it('shows error', () => {
        browser.assert.elements('.error', 1);
      });
    });
  });
});
