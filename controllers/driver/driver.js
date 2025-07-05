const Driver = require("../../models/driver");
const asyncHandler = require("express-async-handler");
const response = require("../../utils/response");
const { encrypt, decrypt } = require("../../utils/encryptor");

exports.updateDriverProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates.name || !updates.email || !updates.mobile || !updates.licenceNo || !updates.vehicleNo) {
    return response.success("All fields are required.", null, res);
  }

const driver = await Driver.findById(id);
if (!driver) return response.success("Driver not found.", null, res);


  const emailExists = await Driver.findOne({ email: updates.email, _id: { $ne: id } });
  if (emailExists) {
    return response.success("Email already exists.", null, res);
  }

  delete updates.password;

  const updatedCompany = await Driver.findByIdAndUpdate(id, updates, { new: true });
  if (!updatedCompany) return response.success("Failed to update profile.", null, res);
  return response.success("Profile updated successfully", updatedCompany, res);
});

exports.UpdateDriverPassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return response.success("All fields are required.", null, res);
  }
  if (newPassword !== confirmPassword) {
    return response.success("New password and confirm password do not match.", null, res);
  }

  const company = await Driver.findById(id);
  if (!company) return response.notFound(res);

  const decryptedPassword = decrypt(company.password);
  if (decryptedPassword !== currentPassword) {
    return response.success("Current password is incorrect.", null, res);
  }
  company.password = encrypt(newPassword);
  await company.save();

  return response.success("Password updated successfully", null, res);
});