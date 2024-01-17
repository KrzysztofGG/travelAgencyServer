const { authJwt } = require("../middlewares");
const controller = require("../controllers/trip.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
    // app.get("/api/trips", [authJwt.verifyToken], controller.getAllTrips);
    app.get("/api/trips",  controller.getAllTrips);

    app.post("/api/trips", 
    [authJwt.verifyToken, authJwt.isModOrAdmin],
    controller.createTrip);

    app.delete("/app/trips/:id", 
    [authJwt.verifyToken, authJwt.isModOrAdmin],
    controller.deleteTrip);

    app.put("/api/trips/:id",  
    [authJwt.verifyToken],
     controller.updateTrip);
  };
