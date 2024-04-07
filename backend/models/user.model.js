const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!(user.isModified("password"))) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error)
  }
})

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);