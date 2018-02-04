var handler = {
  response: function (res, code, err, data) {
    // res.sendStatus(code)
    if(err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  }
};

module.exports = handler;