const UserModel = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const auth  = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(400).json({
      message: "authentication invalid",
      success: false,
    });

    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, name: payload.userName };
    } catch (error) {
        return res.status(400).json({
          message: "authentication invalid",
          success: false,
        });
    }
    next()
}


module.exports=auth