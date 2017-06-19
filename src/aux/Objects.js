class Objects {
  static getObjectValueByPath(object, path) {
    checkIfArray(path);

    let value = object;
    for (let i = 0; i < path.length; i++) {
      checkIfProperty(value, path[i]);
      value = value[path[i]];
    }
    return value;
  }

  static updateObject(object, path, value) {
    if (!Array.isArray(path)) {
      throw new ObjectUpdateException(`Path is not an array: ${path}`);
    }

    if (path.length === 0) {
      return value;
    } else {
      checkIfProperty(object, path[0]);
      let newObject = Object.assign({}, object);
      newObject[path[0]] = this.updateObject(object[path[0]], path.slice(1), value);
      return newObject;
    }
  }
}

function checkIfArray(param) {
  if (!Array.isArray(param)) {
    throw new ObjectUpdateException(`Path is not an array: ${param}`);
  }
}

function checkIfProperty(param, property) {
  if (Object.getOwnPropertyNames(param).indexOf(property) === -1) {
    throw new ObjectUpdateException(`Object ${param} doesn't contain property ${property}`);
  }
}

function ObjectUpdateException(message) {
  this.message = message;
  this.name = "ObjectUpdateException";
}

export default Objects;
