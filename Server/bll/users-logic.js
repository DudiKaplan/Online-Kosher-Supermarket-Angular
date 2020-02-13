const User = require("../models/user");

//Check if the email address is available in mongoDB - users collection
function isEmailExist(email) {
    return new Promise((resolve, reject) => {
        User.find(email, (err, user) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(user);
        });
    });
};

//Add new user to mongoDB
function addUser(user) {
    return new Promise((resolve, reject) => {
        const userToAdd = new User(user);
        userToAdd.save((err, addedUser) => {
            if (err) return reject(err);
            //covert to obj for remove property - password
            addedUser = addedUser.toObject();
            resolve(addedUser);
        });
    });
};

//Login: find if email and password exsit in mongoDB - users collection
function login(credentials) {
    return new Promise((resolve, reject) => {
        User.find({ email: credentials.email, password: credentials.password }, (err, user) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(user);
        });
    });
};

module.exports = {
    addUser,
    login,
    isEmailExist
};