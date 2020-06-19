/* eslint-disable import/prefer-default-export */
function requireAll(context) {
  const obj = {};
  context.keys().forEach((key) => {
    const name = key.match(/^.*\/(.*)\..*$/)[1];
    obj[name] = context(key).default;
  });
  return obj;
}

export { requireAll };
