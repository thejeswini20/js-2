import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
     avatar:{

     },
     username: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true,
       index: true
     },
     email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true
     },
     fullName: {
        type: String,
        trim: true
     },
     password: {
       type: String,
       required: [true, "Password is required"]
     },
     isEmailVerified: {
       type: Boolean,
       default: false
   },
   refreshToken: {
     type: String
   },
   forgotPasswordToken: {
     type: String
   },
   forgotPasswordExpiry: {
     type: Date
   },
   emailVerificationToken: {
     type: String
   },
   emailVerificationExpiry: {
     type: Date
   },
 },
 {
    timestamps: true
 },
);

userSchema.pre("save", async function (next) {
});

userSchema.methods.isPasswordCorrect = async function(password) {

   return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema)

