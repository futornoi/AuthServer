module.exports = {
  omit: (obj, ...props) => {
    const result = {...obj};
    props.forEach(function (prop) {
      delete result[prop];
    });
    return result;
  },
  pick: (obj, ...props) => {
    return props.reduce(function (result, prop) {
      result[prop] = obj[prop];
      return result;
    }, {});
  }
}