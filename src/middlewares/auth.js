const jwt = require("jsonwebtoken");
const { jwtSecret } = require('../config')

const authorized = (req, res, next) => {
    const authorization = req.headers.authorization;

    // console.log(authorization)

    if(!authorization) {
        // return res.status(400).send( { error: "Token is not provided" } );
        req.noToken = {
            token: "none"
        }
        // console.log(req.noToken)
        next()
        return
    }
    
    const token = authorization.split(' ')[1];

    try {
        
     data = jwt.verify(token, jwtSecret);
        console.log(data)

    req.user = {
        userId: data.userId
    }
    //    console.log(req.user)
    next();
    
    }catch(err){
        res.status(401).send( {error: "Unauthorized"} )
    }

};







module.exports = { authorized }