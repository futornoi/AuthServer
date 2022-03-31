module.exports = {
  omit: (obj, ...objKeys) => {
    const result = {...obj};
    objKeys.forEach(key => {
      delete result[key]
    });
    return result;
  },
  pick: (obj, ...objKeys) => {
    objKeys.reduce((result, prop) => {
      result[prop] = obj[prop];
      return result;
    }, {})
  }
}