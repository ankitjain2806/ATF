var middlewares = {
  isLoggedIn : function (req, res, next) {
    if (req.session && typeof req.session.user !== 'undefined') {
      next();
    } else {
      res.sendStatus(401);
      res.end();
    }
  },
  isAdmin : function() {
    if (req.session && typeof req.session.user !== 'undefined' && req.session.user.isAdmin) {
      next();
    } else {
      res.sendStatus(401);
      res.end();
    }
  }
}

module.exports = middlewares;