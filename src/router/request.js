const express = require("express")
const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest", async (req, res) => {
    //Sending connection Request
    res.send("Sending connection Request");
  });

module.exports = requestRouter;
