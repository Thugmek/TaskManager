function validate(object, schema, path) {
  if (typeof path === "undefined") {
    path = "root";
  }
  let res = {
    valid: true,
    msg: [],
  };

  let keys = Object.keys(schema);
  keys.forEach((key) => {
    let r = schema[key](object[key], key, path);
    if (r.warning || !r.valid) {
      res.warning = res.warning ? r.warning : false;
      res.valid = res.valid ? r.valid : false;
      res.msg = [...res.msg, ...r.msg];
    }
  });
  let objKeys = Object.keys(object);
  objKeys.forEach((key) => {
    if (typeof schema[key] === "undefined") {
      delete object[key];
      res.warning = true;
      res.msg = [...res.msg, path + "/" + key + ":unexpected key was deleted"];
    }
  });

  if (!res.valid) {
    console.log("Invalid object:", object);
    console.log("Result:", res.msg);
  }

  return res;
}

module.exports = {
  validate: validate,

  number: function (params) {
    return (value, field, path) => {
      if (typeof value === "undefined") {
        if (params.optional === true) return { valid: true, msg: [] };
        else
          return {
            valid: false,
            msg: [path + "/" + field + ":value is missing"],
          };
      }
      if (isNaN(value)) {
        return {
          valid: false,
          msg: [path + "/" + field + ":value is not a number"],
        };
      }
      return { valid: true, msg: [] };
    };
  },
  string: function (params) {
    return (value, field, path) => {
      if (typeof value === "undefined") {
        if (params.optional === true) {
          return { valid: true };
        } else {
          return {
            valid: false,
            msg: [path + "/" + field + ":value is missing"],
          };
        }
      }
      if (typeof value !== "string") {
        return {
          valid: false,
          msg: [path + "/" + field + ":value is not a string"],
        };
      }
      return { valid: true, msg: [] };
    };
  },
  date: function (params) {
    return (value, field, path) => {
      if (typeof value === "undefined" || value === "") {
        if (params.optional === true) return { valid: true, msg: [] };
        else
          return {
            valid: false,
            msg: [path + "/" + field + ":value is missing"],
          };
      }
      if (typeof value !== "string") {
        return {
          valid: false,
          msg: [path + "/" + field + ":date must be in string form"],
        };
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return {
          valid: false,
          msg: [path + "/" + field + ":date must be in format yyyy-mm-dd"],
        };
      }
      let spl = value.split("-");
      if (spl[1] > 12 || spl[0] < 1) {
        return {
          valid: false,
          msg: [path + "/" + field + ":month must be in range 1-12"],
        };
      }
      if (spl[2] > 31 || spl[1] < 1) {
        return {
          valid: false,
          msg: [path + "/" + field + ":day must be in range 1-31"],
        };
      }
      return { valid: true, msg: [] };
    };
  },
  time: function (params) {
    return (value, field, path) => {
      if (typeof value === "undefined" || value === "") {
        if (params.optional === true) return { valid: true, msg: [] };
        else
          return {
            valid: false,
            msg: [path + "/" + field + ":value is missing"],
          };
      }
      if (typeof value !== "string") {
        return {
          valid: false,
          msg: [path + "/" + field + ":time must be in string form"],
        };
      }
      if (!/^\d{2}:\d{2}$/.test(value)) {
        return {
          valid: false,
          msg: [path + "/" + field + ":date must be in format hh:mm"],
        };
      }
      let spl = value.split(":");
      if (spl[0] > 23 || spl[0] < 0) {
        return {
          valid: false,
          msg: [path + "/" + field + ":hours must be in range 0-23"],
        };
      }
      if (spl[1] > 59 || spl[1] < 0) {
        return {
          valid: false,
          msg: [path + "/" + field + ":minutes must be in range 0-59"],
        };
      }
      return { valid: true, msg: [] };
    };
  },
  object: function (params, schema) {
    return (value, field, path) => {
      if (typeof value === "undefined") {
        if (params.optional === true) return { valid: true, msg: [] };
        else
          return {
            valid: false,
            msg: [path + "/" + field + ":value is missing"],
          };
      }
      return validate(value, schema, path + "/" + field);
    };
  },
  array: function (params, type) {
    return (value, field, path) => {
      if (typeof value === "undefined") {
        if (params.optional === true) return { valid: true, msg: [] };
        else
          return {
            valid: false,
            msg: [path + "/" + field + ":value is missing"],
          };
      }
      if (!Array.isArray(value)) {
        return {
          valid: false,
          msg: [path + "/" + field + ":not an array"],
        };
      }
      let res = {
        valid: true,
        msg: [],
      };
      value.forEach((val, index) => {
        let r = type(val, "[" + index + "]", path + "/" + field);
        if (!r.valid) {
          res.valid = false;
          res.msg = [...res.msg, ...r.msg];
        }
      });
      return res;
    };
  },
};
