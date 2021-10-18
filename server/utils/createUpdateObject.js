module.exports = (oldObject) => {
  const _newObject = {};
  for (const _key in oldObject) {
    if (_key) {
      _newObject[_key] = oldObject[_key];
    }
  }
  return _newObject;
};
