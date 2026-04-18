import {body} from "express-validator";


const userRegisterValidator = () => {

      return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please enter a valid email")
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({ min: 3, max: 20 })
            .withMessage("Username must be between 3 and 20 characters long"),
            body("password")
                .trim()
                .notEmpty()
                .withMessage("Password is required")
                .isLength({ min: 6, max: 100 })
                .withMessage("Password must be between 6 and 100 characters long"),
            body("password")
                .trim()
                .notEmpty()
                .withMessage("Password is required")
                .withMessage("Password is required"),
            body("fullName")
                .optional()
                .trim()

      ]
}

export {
    userRegisterValidator
}
