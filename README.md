# Talloc - Get more productive as a software developer

![version](https://img.shields.io/badge/version-1.0-blue)
<a href="https://circleci.com/gh/badges/shields/tree/master"><img src="https://img.shields.io/circleci/project/github/badges/shields/master" alt="build status"></a>
![uptime](https://img.shields.io/badge/uptime-100%25-brightgreen)

<sup>Talloc is an application for developers to improve their productivity and give a better tracing and history from what it is being worked on in a project</sup>

> Built using MERN stack:

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<br />

---

### 1. Running the project

> <sup>I am working on adding Docker to run the project using `docker compose up` only.</sup>

You must run all the services in the project one by one. To do this:

> <sup>Make sure your MongoDB service is running. If not, use `mongod` in the terminal to run it</sup>

- Go to the _NodeSide/app_ folder and use `nodemon app.js` to run the Node.js server
- Go to the _APIGateway_ folder and use `nodemon app.js` to run the Gateway API controller
- Go to the _PythonSide/app_ folder and use `python main.py` to run the FastAPI server
- Go to the _frontend_ folder and use `npm run dev` to launch the React.js client application

After all this, go to `http://localhost:5173`. You should be welcomed by the Talloc Welcome Page.

> Talloc Welcome Page:

![image](https://user-images.githubusercontent.com/72606659/215571173-d72c6e49-6853-4985-a620-4b7091c07318.png)

<br />

Once registered or logged in, you should see the app dashboard ready to use:

> Talloc Dashboard Page:

![image](https://user-images.githubusercontent.com/72606659/215571382-c5469611-4772-4e55-8fa8-6ebddea70b16.png)

<br />

---

### 2. Testing

As I developed the app purely by myself, I would appreciate all the feedback anyone could give. So If anything breaks, let me know!

<br />

---

**_NOTE: The app is still in a developing state, if any bug is found, please let me know via e-mail (lazlomeli@gmail.com)_**
