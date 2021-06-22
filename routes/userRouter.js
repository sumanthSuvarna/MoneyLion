  const express = require("express");
  const userController = require('../controllers/userController');
  const userIdController = require('../controllers/userIdController');
  const userIdMiddleWare = require('../middleware/userIdMiddleware');
  const jwtMiddleware = require('../middleware/jwtMiddleware');

  function routes(User){
    const userRouter =  express.Router();
    const controller = userController(User);
    const idController =  userIdController(User);
    const middleware = userIdMiddleWare(User)
    const JwtMiddleware = jwtMiddleware();
    
    userRouter.route('/user')
        .post(JwtMiddleware.validateAdmin,controller.post)
        .get(JwtMiddleware.validateAdmin,controller.get)
        .delete(JwtMiddleware.validateAdmin,controller.deleteAll);
    
    userRouter.use('/user/:emailId',JwtMiddleware.validateUser, middleware.getUser);

    userRouter.route('/user/:emailId')
        .get((req,res)=> res.json(req.user))
        .put(idController.put)
        .patch(idController.patch)
        .delete(idController.deleteUser)

    return userRouter;
  }


  module.exports = routes;