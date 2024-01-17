const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
  controller.getAllUsers);

  // app.get("api/admin/user/:id",
  // [authJwt.verifyToken],
  // controller.getUser);

  app.patch("/api/admin/user/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.patchUser);

  app.put("/api/admin/user/:id",
  // [authJwt.verifyToken, authJwt.isAdmin],
  [authJwt.verifyToken],
  controller.updateUser);
};
