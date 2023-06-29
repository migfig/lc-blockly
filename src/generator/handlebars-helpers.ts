import * as Handlebars from 'handlebars';

Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
    return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  }
});

// { settings: [{ name: 'x', value: 1.0 }]}
Handlebars.registerHelper("arrayprop", (array, index, name, defaultValue = '') =>
  Array.isArray(array) && index < array.length
    ? array[index][name]
    : defaultValue);

Handlebars.registerHelper("findarrayprop", (array, name, defaultValue) => {
  if (!Array.isArray(array)) return defaultValue;

  const item = array.find(a => a.name.toLowerCase() === name.toLowerCase())
  return item
    ? item.value
    : defaultValue;
})

//split=['train[:80%]', 'train[80%:90%]', 'train[90%:]']
Handlebars.registerHelper("trainsplit", (value) => `train[:${value}%]`);
Handlebars.registerHelper("testsplit", (v1, v2) => `train[${v1}%:${(parseInt(v1, 10) + parseInt(v2, 10))}%]`);
Handlebars.registerHelper("valsplit", (v1, v2) => `train[${((parseInt(v1, 10) + parseInt(v2, 10)))}%:]`);

//EarlyStopping
Handlebars.registerHelper("varialize", (value) =>
  `${value[0].toLowerCase()}${value.substring(1).replace(/[A-Z]/g, (m, $1) => `_${m.toLowerCase()}`)}`);

Handlebars.registerHelper("quote", (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'boolean') {
    const boolVal = `${value}`;
    return `${boolVal[0].toUpperCase()}${boolVal.substring(1)}`;
  }
  return value
});
