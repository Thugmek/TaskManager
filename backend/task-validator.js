module.exports = {
  create: function (req) {
      let body = req.body;
      if(body.a != 10) return false;
      return true;
  },
};
