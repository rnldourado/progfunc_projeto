function foldObj(object: Object, path: string) {
  return path.split('.').reduce((o: any, i) => o[i], object);
}

export function groupBy(collection: any[], attribute: string) {
  return collection.reduce((acc, obj) => {
    const key = foldObj(obj, attribute);

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export function orderBy(collection: any[], attribute: any) {
  return collection.sort((a, b) => b[attribute] - a[attribute]);
}
