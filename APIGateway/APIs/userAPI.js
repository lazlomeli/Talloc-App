require("dotenv").config();

const express = require("express");
const axios = require("axios");
const auth = require("../controller/auth");
const cookie = require("cookie");
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
      console.log("Find user by username error");
    });
});

router.get("/users", auth.authenticateToken, (req, res) => {
  axios
    .get(userAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log("Get all users error");
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
      console("Find user by id error");
    });
});

router.post("/users", auth.authenticateToken, (req, res) => {
  axios
    .post(userAPI + req.path, req.body)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log("Create error");
    });
});

router.patch("/users/:id", auth.authenticateToken, (req, res) => {
  axios
    .patch(userAPI + req.path, req.body)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log("Update error");
    });
});

router.delete("/users/:id", auth.authenticateToken, (req, res) => {
  axios
    .delete(userAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log("Delete error");
    });
});

router.post("/login", (req, res) => {
  const userForToken = { username: req.body.username };
  const token = auth.generateAccessToken(userForToken);
  axios
    .post(userAPI + req.path, req.body)
    .then(() => {
      res.cookie("talloc_user_cookie_token", token, {
        httpOnly: true,
      });

      res.status(200).send({
        username: req.body.username,
      });
    })
    .catch(() => {
      res.sendStatus(404);
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

router.get("/logout", (req, res) => {
  axios
    .get(userAPI + req.path)
    .then(() => {
      res.clearCookie("talloc_user_cookie_token");
      res.status(200).send("Logged out");
    })
    .catch((err) => console.log(err, "\nGW: Error deleting cookie"));
});

module.exports = router;
