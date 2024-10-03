function foldObj(object: Object, path: string) {
  return path.split('.').reduce((o: any, i) => o[i], object);
}

export function foldSum(collection: any[], attribute: any) {
  return collection.reduce((acc, obj) => acc + obj[attribute], 0);
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

export function orderBy(collection: any[], attribute: any, fns: any) {
  return collection.sort(fns(attribute));
}

export function distinct(collection: any[], attr: string) {
  let output: Array<string> = [];
  collection.map((item: any) => {
    if (output.includes(item[attr]) || !item[attr]) return;
    output.push(item[attr]);
  });
  return output;
}

export function distinctCompleteItem(collection: any[], attr: string) {
  let output: Array<any> = []; // Alterado para Array<any>
  let seen: Array<string> = []; // Array para rastrear os atributos já vistos

  collection.map((item: any) => {
    if (!seen.includes(item[attr]) && item[attr]) {
      seen.push(item[attr]); // Adiciona o atributo ao array de vistos
      output.push(item); // Adiciona o item completo
    }
  });
  
  return output;
}

export function compose <T, U, V> (func1: (x: U) => V, func2: (x: T) =>U): (x: T) => V{
  return (x: T) => func1(func2(x));
}
