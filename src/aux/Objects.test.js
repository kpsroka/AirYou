import Objects from './Objects.js';

describe("getObjectValueByPath", () => {
  test("throws on non-array path", () => {
    let object = { a: 123 };
    expect(() => {Objects.getObjectValueByPath(object, "PATH")}).toThrow();
    expect(() => {Objects.getObjectValueByPath(object, 1234)}).toThrow();
    expect(() => {Objects.getObjectValueByPath(object, { path: "path" })}).toThrow();
  });

  test("throws on non-existent path", () => {
    let object = { a: 123 };
    expect(() => {Objects.getObjectValueByPath(object, ["b"])}).toThrow();
    expect(() => {Objects.getObjectValueByPath(object, ["a", "b"])}).toThrow();
    expect(() => {Objects.getObjectValueByPath(object, ["a", 0])}).toThrow();
  });

  test("resolves existing value", () => {
    let object = { a: 123, b: undefined, c: { d: 321, e: "", f: [] }};
    expect(Objects.getObjectValueByPath(object, ["a"])).toEqual(123);
    expect(Objects.getObjectValueByPath(object, ["b"])).toEqual(undefined);
    expect(Objects.getObjectValueByPath(object, ["c"])).toEqual(object.c);
    expect(Objects.getObjectValueByPath(object, ["c", "d"])).toEqual(321);
    expect(Objects.getObjectValueByPath(object, ["c", "e"])).toEqual("");
    expect(Objects.getObjectValueByPath(object, ["c", "f"])).toEqual([]);
  });
});

describe("updateObject", () => {
  test("throws on non-array path", () => {
    let object = {a: 123};
    expect(() => {Objects.updateObject(object, "PATH", 1)}).toThrow();
    expect(() => {Objects.updateObject(object, 1234, 2)}).toThrow();
    expect(() => {Objects.updateObject(object, {path: "path"}, 3)}).toThrow();
  });

  test("throws on non-existent path", () => {
    let object = { a: 123 };
    expect(() => {Objects.updateObject(object, ["b"], 1)}).toThrow();
    expect(() => {Objects.updateObject(object, ["a", "b"], 2)}).toThrow();
    expect(() => {Objects.updateObject(object, ["a", 0], 3)}).toThrow();
  });

  test("returns new object", () => {
    let object = { a: 123 };
    expect(Objects.updateObject(object, ["a"], 321)).toEqual({ a: 321 });
    expect(object).toEqual({a: 123});  // did not update the source
  });

  test("returns updated object", () => {
    let object = { a: 123, b: [], c: { d: 321, f: "ghi"} };
    object = Objects.updateObject(object, ["a"], "456");
    object = Objects.updateObject(object, ["b"], {});
    object = Objects.updateObject(object, ["c", "d"], {j: "k"});

    expect(object).toEqual({a: "456", b: {}, c: { d: { j: "k" }, f: "ghi"}});
  });
});
