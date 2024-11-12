const  bcrypt = require ( "bcryptjs");
const authConfig = require("../config/auth")

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number.parseInt(authConfig));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

helpers.buildParams = (valids, params) => {
  //console.log("check ", valids, params)
  if (valids && valids.length > 0){
    
    let new_param = {};
    let count     = 0;
    valids.forEach((item) => {
      console.log("item ", item)
      if (params && params[item]) {
        if (params[item] != "" ) {
          new_param[item] = params[item];
          count++;
        }

      }
    })
    if (count === valids.length) {
      return new_param  
    }
    
  }
  return null
}

module.exports = helpers