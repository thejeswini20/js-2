import {User, user} from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { APIError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { sendEmail } from "../utils/mail.js";

const generateAccesAndRefreshToken = async (userId) =>{

  try{
     const user = await User.findById(userId)
     const accessToken = await user.generateAccessToken();
     const refreshToken = await user.generateRefreshToken();

     user.refreshToken = refreshToken;
     await user.save({validateBeforeSave:false});
      return { accessToken, refreshToken }

  } catch (error) {
     throw new APIError(500, "Failed to generate access and refresh token", [])
  }

}

const registerUser = asyncHandler(async (req, res) => {
     const {email,username, password,role} = req.body

     const existedUser = await User.findOne({
        $or: [{username}, {email}]
     })

     if (existedUser) {
        throw new APIError(409, "User with email or username already exists",[])
     }

    const user = await User.create({
        email,
        username,
        password,
        isEmailVerified: false,
     })

    const { unHashedToken, hashedToken, tokenExpiry } =
      user.generateTemporaryToken();

      user.emailVerificationToken = hashedToken;
      user.emailVerificationExpiry = tokenExpiry;

      await user.save({ validateBeforeSave: false });

      await sendEmail({

        email: user?.email,
        subject: "Email Verification",
        mailgenContent: emailVerificationMailgenContent(
          user.username,
          `${request.protocol}://${request.get("host")}/api/v1/users/verify-email/${unHashedToken}`
        ),
      });

      const createdUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry",

      );

      if(!createdUser){
          throw new APIError(500, "Failed to create user", [])
      }

       return res
         .status(201)
         .json(
           new ApiResponse(
            201,
            {user: createdUser },
            "User registered successfully"
          )
         );
});
