const mongoose = require("../dal/dal");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 15,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 15,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        validate: function (value) {
            if (!(validator.isEmail(value))) {
                throw new Error("Not a valid email address");
            }
        },
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    houseNumner: {
        type: Number,
        required: true,
        min: 1
    },
    isUser: {
        type: Boolean,
        default: true
    }

}, { versionKey: false });

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;