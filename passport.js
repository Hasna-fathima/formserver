const passport =require ('passport');
const {Strategy, JwtStrategy,ExtractJwt}=require('passport-jwt');
const Usermodel = require('./model/usermodel');


const jwtOptions = {
jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey :'reactblogapp'
}
passport.use(new Strategy(jwtOptions, async(jwtpayload, done)=> {
    try{
        console.log(jwtpayload)
        const user=await Usermodel.findOne({emai:jwtpayload.user})
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
            catch(error){
                return done(error,false)

            }
        }));

        module.exports=passport

    
 

