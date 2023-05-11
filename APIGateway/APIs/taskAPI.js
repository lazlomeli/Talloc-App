require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const auth = require("../controller/auth");

const taskAPI = process.env.TASK_API_URL_DOCKER;
// const taskAPI = process.env.TASK_API_URL;

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

// router.get("/github/:username", (req, res) => {
// config = {
//   headers: {
//     Accept: "application/vnd.github+json",
//     Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
//   },
// };
// axios
//   .get(`${process.env.GITHUB_API_URL}/users/${req.params.username}/repos`, config)
//   .then((resp) => {
//     res.send(resp.data);
//   });
// });

module.exports = router;
