class Objects {
  static getObjectValueByPath(object, path) {
    if (!Array.isArray(path)) {
      throw new ObjectUpdateException(`Path is not an array: ${path}`);
    }

    let value = object;
    for (let i = 0; i < path.length; i++) {
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
      let newObject = Object.assign({}, object);
      newObject[path[0]] = this.updateObject(object[path[0]], path.slice(1), value);
      return newObject;
    }
  }
}

function ObjectUpdateException(message) {
  this.message = message;
  this.name = "ObjectUpdateException";
}

export default Objects;
