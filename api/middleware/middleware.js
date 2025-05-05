const config = require('../common/config')
var noLoginNeeded = require('../common/apiConfig');
const jwt = require('jsonwebtoken');
const commonHelper = require('../common/commonHelper');
module.exports = {
    verifyToken:(req,res,next)=>{
        var islogin = true;
       
        for (var i = 0; i < noLoginNeeded.length; i++) {
            if (req.path.indexOf(noLoginNeeded[i]) > -1) {

                islogin = false;
                break;
            }
        }
      

        if (!islogin) {
            next();
        } else {
          
            var token = req.headers['authorization'];
            console.log("token==?",token)
            if (token) {
                try {
                    jwt.verify(token, config.JWTKEY, async function (err, data) {
                        console.log("err==>",err)
                        if (err) {
                            
                            
                            return res.status(401).send({ status: 401, message: 'Invalid Token' });
                            
                        } else {
                            req.decoded = data;
                            console.log("Req.dec==>",data) 
                            let userData = await commonHelper.validateToken(req,res);
                           
                            if(userData.executed == 1){
                                next();
                            }else{
                                return res.status(401).send({ status: 401, message: 'Session Expired' });
                            } 
                            
                        }
                    })
                } catch(err){
                    console.log("err==?",err)
                    return res.status(401).send({ status: 401, message: 'Invalid TOken' });
                    
                }
            }
            else {
                return res.status(400).send({
                    status: 400,
                    message: 'No token provided.'
                });
            }
        }
    },
    socketToken:(socket, next)=>{
        try {
            const token = socket.handshake.headers.authorization;
    
            if (!token) {
                console.warn("Socket connection rejected: No token provided.");
                return next(new Error("No token provided."));
            }
    
            jwt.verify(token, config.JWTKEY, async (err, decoded) => {
                if (err) {
                    console.warn("Socket authentication failed: Invalid token.", err);
                    return next(new Error("Invalid token"));
                }
    
                console.log("Token decoded successfully:", decoded);
    
                // Validate token in the database
                let userData = await commonHelper.validateSocketToken(decoded);
    
                if (userData?.executed == 1) {
                    socket.user = decoded; // Attach user data to socket
                    // console.log("Socket authentication successful for user:", decoded);
                    return next(); // Allow connection
                } else {
                    console.warn("Socket authentication failed: Session expired.");
                    return next(new Error("Session Expired"));
                }
            });
        } catch (error) {
            console.error("Socket authentication error:", error);
            return next(new Error("Authentication Failed"));
        }
    }      
       
}