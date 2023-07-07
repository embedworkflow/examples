const express = require('express');
const app = express();

app.engine('html', require('ejs').renderFile);

const buildToken = () => {
  const secret = "REPLACE_ME"; // <---- FILL THIS OUT
  const jwt = require("jsonwebtoken");
  const currentTime = Math.floor(Date.now() / 1000);
  const payload = {
    sub: "user-123",      // <--- put your user's unique identifier
    iat: currentTime,
    exp: currentTime + 60 * 60,
    discover: true,       // <--- this tells EW to auto discover users (creating users on the fly).
    email: "REPLACE_ME",  // <---- FILL THIS OUT
  };
  return jwt.sign(payload, secret, { algorithm: "HS256" });
};

app.get('/', (req, res) => {
  res.render(__dirname + "/public/index.html", { token: buildToken() });
});

app.get('/workflow-settings', (req, res) => {
  res.render(__dirname + "/public/workflow-settings.html", { token: buildToken() });
});

app.get('/workflow-editor', (req, res) => {
  res.render(__dirname + "/public/workflow-editor.html", { token: buildToken() });
});

app.listen(3000, () => {
  console.log('server started');
});
