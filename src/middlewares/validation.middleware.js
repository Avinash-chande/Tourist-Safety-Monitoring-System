import { body, validationResult } from "express-validator";

// Common error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

// Register Validation

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  handleValidationErrors,
];


// Login Validation

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  handleValidationErrors,
];

// Upload KYC Validation

export const uploadKYCValidation = [
  body("aadhaarNumber")
    .optional()
    .isLength({ min: 12, max: 12 })
    .withMessage("Aadhaar must be 12 digits"),

  body("passportNumber")
    .optional()
    .notEmpty()
    .withMessage("Passport number is required"),

  handleValidationErrors,
];


// Panic Alert Validation

export const panicAlertValidation = [
  body("latitude")
    .notEmpty()
    .withMessage("Latitude is required"),

  body("longitude")
    .notEmpty()
    .withMessage("Longitude is required"),

  body("address")
    .notEmpty()
    .withMessage("Address is required"),

  handleValidationErrors,
];


// Create GeoFence Validation

export const geoFenceValidation = [
  body("zoneName")
    .notEmpty()
    .withMessage("Zone name is required"),

  body("latitude")
    .notEmpty()
    .withMessage("Latitude is required"),

  body("longitude")
    .notEmpty()
    .withMessage("Longitude is required"),

  body("radius")
    .notEmpty()
    .withMessage("Radius is required"),

  body("riskLevel")
    .notEmpty()
    .withMessage("Risk level is required"),

  handleValidationErrors,
];