const qs = require('qs');

const parseQuery = ( toParse ) => {
  let parsed = qs.parse(toParse);
  parsed.p = Number(parsed.p) || 0;
  return parsed;
}

module.exports = {
  parseQuery,
}
