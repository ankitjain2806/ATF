var handler = {
  Response: function (req, res) {
    res.json(res.locals.responseObj)
  }
};

module.exports = handler;