module.exports = (fields) =>
  !fields || !(fields[0]?.selectionSet?.selections instanceof Array)
    ? null
    : fields[0].selectionSet.selections.map((x) => x?.name?.value);
