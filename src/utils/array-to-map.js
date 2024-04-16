export const arrayToMap = (array, key) => {
    const myMap = new Map();
  
    array.forEach(element => {
      myMap.set(element[key], element);
    });
  
    return myMap;
  }