require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const auth = require("../controller/auth");

const GH_API = "https://api.github.com";
// const taskAPI = "http://127.0.0.1:8000";
const taskAPI = "http://backend_fastapi:8000";

router.get("/tasks", auth.authenticateToken, (req, res) => {
  axios
    .get(taskAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log(`GW: Error getting all tasks`);
    });
});

router.get("/tasks/:username", auth.authenticateToken, (req, res) => {
  axios
    .get(taskAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log(`GW: Error getting tasks by username`);
    });
});

router.get("/tasks/:id", auth.authenticateToken, (req, res) => {
  axios
    .get(taskAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log(`GW: Error getting task by ID`);
    });
});

router.post("/tasks", auth.authenticateToken, (req, res) => {
  axios
    .post(taskAPI + req.path, req.body)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log(`GW: Error creating task`);
    });
});

router.put("/tasks/:id", auth.authenticateToken, (req, res) => {
  axios
    .put(taskAPI + req.path, req.body)
    .then((resp) => {
      res.send(resp.data);
      console.log(`✅ Updated task: ${req.params.id}`);
    })
    .catch(() => {
      console.log(`GW: Error updating task`);
    });
});

router.delete("/tasks/:id", auth.authenticateToken, (req, res) => {
  axios
    .delete(taskAPI + req.path)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch(() => {
      console.log(`GW: Error deleting task`);
    });
});

router.post("/github/:username", (req, res) => {
  config = {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
    },
  };
  axios
    .get(`${GH_API}/users/${req.params.username}/repos`, config)
    .then((resp) => {
      res.send(resp.data);
    });
});

module.exports = router;
