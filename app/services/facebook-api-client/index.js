const request = require('request-promise');


const getAll = (url, qs, all = []) =>
  request({ uri: url, qs, json: true }).then((response) => {
    const { data, paging: { next } } = response;

    const combined = [...all, ...data];

    return next ? getAll(next, qs, combined) : combined;
  });

const getComments = (id) => {
  const uri = `https://graph.facebook.com/${id}/comments`;
  const qs = {
    limit: 500,
    access_token: process.env.ACCESS_TOKEN,
  };

  return getAll(uri, qs);
};

module.exports = { getComments };
