require("dotenv").config();

const express = require("express");
const axios = require("axios");
const auth = require("../controller/auth");
const router = express.Router();
const userAPI = "http://localhost:3000";

// 🚀 API Gateway ~ Users

router.get("/users/:username", auth.authenticateToken, (req, res) => {
  axios
    .get(userAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log(`⛔ Couldn't find user: ${req.params.username}`);
    });
});

router.get("/users", auth.authenticateToken, (req, res) => {
  axios
    .get(userAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
      console.log("✅ Showing all users:");
    })
    .catch(() => {
      console.log(`⛔ Couldn't get all users`);
    });
});

router.get("/users/:id", auth.authenticateToken, (req, res) => {
  axios
    .get(userAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
      console.log(`✅ Showing user: ${req.params.id}`);
    })
    .catch(() => {
      console.log(
        `⛔ Couldn't find user: ${req.params.username} by the ID: ${req.params.id}`
      );
    });
});

router.post("/users", auth.authenticateToken, (req, res) => {
  axios
    .post(userAPI + req.path, req.body)
    .then((resp) => {
      res.send(resp.data);
      console.log("✅ Creating user:");
    })
    .catch(() => {
      console.log(`⛔ Couldn't create user`);
    });
});

router.patch("/users/:id", auth.authenticateToken, (req, res) => {
  axios
    .patch(userAPI + req.path, req.body)
    .then((resp) => {
      res.send(resp.data);
      console.log(`✅ Updated user: ${req.params.id}`);
    })
    .catch(() => {
      console.log(`⛔ Couldn't update user`);
    });
});

router.delete("/users/:id", auth.authenticateToken, (req, res) => {
  axios
    .delete(userAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
      console.log(`✅ Deleted user: ${req.params.id}`);
    })
    .catch(() => {
      console.log(`⛔ Couldn't delete user`);
    });
});

router.post("/login", (req, res) => {
  const userForToken = { username: req.body.username };
  const token = auth.generateAccessToken(userForToken);

  axios
    .post(userAPI + req.path, req.body)
    .then(() => {
      res.send({
        username: req.body.username,
        token: token,
      });
      console.log(
        `✅ Succesfully logged as <<${req.body.username}>> Status Code: ${res.statusCode}`
      );
    })
    .catch(() => {
      res.sendStatus(404);
      console.log("⛔ Error logging in. Status Code: ", res.statusCode);
    });
});

router.post("/register", (req, res) => {
  axios
    .post(userAPI + req.path, req.body)
    .then((resp) => {
      res.status(200).send(resp.data);
    })
    .catch(() => {
      res.sendStatus(403);
    });
});

module.exports = router;
