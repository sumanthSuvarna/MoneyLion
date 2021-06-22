const express = require("express");
const featureController = require('../controllers/featureController');
const featureMiddleWare = require('../middleware/featureMiddleware');
const jwtMiddleware = require('../middleware/jwtMiddleware');

function routes(Feature,User){
  const featureRouter =  express.Router();
  const controller = featureController(Feature);
  const middleware = featureMiddleWare(Feature,User)
  const JwtMiddleware = jwtMiddleware();

  
  featureRouter.route('/feature')
      .post(JwtMiddleware.validateAdmin,middleware.getUserFeature,controller.post)
      .get(controller.get)

  featureRouter.route('/feature/:name')
    .get(JwtMiddleware.validateUser,controller.getDetails)
  
  return featureRouter;
}

module.exports = routes;