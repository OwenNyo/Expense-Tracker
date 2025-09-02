// Mongoose for defining schemas and interacting with MongoDB
const mongoose = require("mongoose");      

// Bcrypt for hashing and comparing passwords
const bcrypt = require("bcryptjs");        

// Define the user schema (structure of a user document in the database)
const UserSchema = new mongoose.Schema(
  {
    fullName: { 
      type: String, 
      required: true 
    },
    email: {
      type: String, 
      required: true, 
      unique: true   
    },
    password: {
      type: String, 
      required: true 
    },
    profileImageUrl: {
      type: String, 
      default: null 
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
  }
);

// Middleware that runs before saving the user to the database
UserSchema.pre("save", async function (next) {
  // Only hash the password if it was modified (e.g., during registration or password update)
  if (!this.isModified("password")) return next(); 

  // Hash the password with a salt round of 10
  this.password = await bcrypt.hash(this.password, 10);

  next(); // Proceed to save
});

// Method to compare entered password with the hashed one in the database
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
  // Returns true if match, false otherwise
};

// Export the model to be used elsewhere in your app
module.exports = mongoose.model("User", UserSchema);
