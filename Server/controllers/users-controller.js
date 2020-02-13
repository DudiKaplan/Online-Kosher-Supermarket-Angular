const express = require("express");
const usersLogic = require("../bll/users-logic");
const Credentials = require("../models/credentials");
const router = express.Router();

// POST http://localhost:3000/api/users/exist-user
router.post("/exist-user", async (request, response) => {
    const email = request.body;
    const isExist = await usersLogic.isEmailExist(email);
    if (isExist[0]) {
        response.json({ isExist: true });
    } else {
        response.json({ isExist: false });
    }
});

// POST http://localhost:3000/api/users/registration
router.post("/registration", async (request, response) => {
    try {
        //For stronger security
        request.body.isUser = true;
        const user = await usersLogic.addUser(request.body);
        delete user["password"];
        response.status(201).json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3000/api/users/login
router.post("/login", async (request, response) => {
    const credentials = new Credentials(request.body.email, request.body.password);
    const userArray = await usersLogic.login(credentials);
    if (userArray[0]) {
        //covert to obj for remove property - password
        const user = userArray[0].toObject();
        delete user["password"];
        response.json(user);
    }
    else {
        response.json({ error: "Incorrect email or password" });
    }
});

module.exports = router;
