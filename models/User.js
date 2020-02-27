const mongoose = require("mongoose");
// same with const{Schema}=mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: String
});

mongoose.model('users',userSchema);