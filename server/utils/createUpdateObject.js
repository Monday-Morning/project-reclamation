module.exports = (oldObject) => {
  const _newObject = {};
  for (const _key in oldObject) {
    if (oldObject[_key] || typeof oldObject[_key] === 'boolean' || typeof oldObject[_key] === 'number') {
      _newObject[_key] = oldObject[_key];
    }
  }
  return _newObject;
};
