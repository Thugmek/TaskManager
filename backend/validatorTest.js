let Validator = require("./validator");

let schema = {
  arr: Validator.array(
    {},
    Validator.object(
      {},
      {
        name: Validator.string({}),
        age: Validator.number({}),
        list: Validator.array(
          {},
          Validator.object(
            {},
            {
              a: Validator.string({}),
              b: Validator.string({}),
            }
          )
        ),
      }
    )
  ),
};

let object = {
  arr: [
    {
      name: "Karel",
      age: 35,
      list: [],
    },
    {
      name: "René",
      age: 25,
      list: [{ a: "", b: "" }],
    },
    {
      name: "Evžen",
      age: 85,
      list: [{ a: "", b: "" }, {}, { a: "", b: "" }],
    },
  ],
};

console.log("Result:", Validator.validate(object, schema));

console.log(object);
