const response = require("./../../utils/response");
const helpers = require("./../../utils/helpers");
const { decrypt, encrypt } = require("./../../utils/encryptor");
const asyncHandler = require("express-async-handler");
const models = require("./../../models/zindex");

exports.signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return response.forbidden("All Fields Are Required",res)
  }
  let user = await models.driver.findOne({ email: email }).lean();
  console.log(user,"user");
  
  if (!user) {
    return response.success("Invalid credentials!", null, res);
  }

  let encryptedText = user.password;
  let plainText = decrypt(encryptedText);
  if (plainText != password) {
    return response.success("Invalid credentials!", null, res);
  }

  let token = helpers.generateToken({ id: String(user._id) });
  return response.success("Admin login successfully!", {token,user}, res);
});

exports.signUp = asyncHandler(async (req, res) => {
  const { name,email, password ,mobile ,licenceNo, vehicleNo} = req.body;
  if(!email || !password || !name || !mobile || !licenceNo || !vehicleNo){
    return response.forbidden("All Fields Are Required",res)
  }
  let user = await models.driver.findOne({ email: email }).lean();
  if (user) {
    return response.success("Account is already exists!", null, res);
  }

  let encryptedText = encrypt(password);
  let result = await models.driver.create({
    name,
    email,
    password: encryptedText,
    mobile,
    licenceNo,
    vehicleNo,
  });
  let token = helpers.generateToken({ id: String(result._id) });
  return response.success("Account created successfully!", token, res);
});


exports.verifyToken = asyncHandler(async (req, res) => {
  try {
   const userId = req.token.id;
  const user = await models.driver.findById(userId);
  if (!user) {
    return response.success("User not found!", null, res);
  }
  return response.success("User found!", user, res);
  } catch (error) {
    return response.forbidden("Invalid or expired token", res);
  }
});
