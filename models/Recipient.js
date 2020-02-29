const mongoose = require("mongoose");
// same with const{Schema}=mongoose;
const {Schema} = mongoose;

const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false}
});

module.exports = recipientSchema;