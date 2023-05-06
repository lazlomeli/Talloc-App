require("dotenv").config({ path: "../.env" });

const express = require("express");
const axios = require("axios");
const auth = require("../controller/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");

// const userAPI = process.env.USER_API_URL_DOCKER
const userAPI = process.env.USER_API_URL;

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

// router.patch("/users/:id", auth.authenticateToken, (req, res) => {
//   axios
//     .patch(userAPI + req.path, req.body)
//     .then((resp) => {
//       res.send(resp.data);
//     })
//     .catch(() => {
//       console.log("Update error");
//     });
// });

router.patch("/users/:username", auth.authenticateToken, (req, res) => {
  axios
    .patch(userAPI + req.path, req.body)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      console.log(err);
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
    .then((resp) => {
      res.cookie("talloc_user_cookie_token", token, {
        httpOnly: true,
      });
      res.status(200).send(resp.data);
    })
    .catch((err) => {
      console.log(err);
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
      res.status(403).send("Something went wrong!");
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

router.get("/github/:username", (req, res) => {
  axios
    .get(`${userAPI}/users/${req.params.username}`)
    .then((resp) => {
      config = {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${resp.data.github_pat}`,
        },
      };
      axios
        .get(
          `${process.env.GITHUB_API_URL}/users/${resp.data.username}/repos`,
          config
        )
        .then((resp) => {
          res.send(resp.data);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/encrypt", (req, res) => {
  axios
    .post(userAPI + req.path, req.body)
    .then((resp) => {
      res.status(200).send(resp.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/decrypt", (req, res) => {
  axios
    .post(userAPI + req.path, req.body)
    .then((resp) => {
      res.status(200).send(resp.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
