const express = require('express');
const app = express();

app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  const secret = "sk_live_REPLACE_ME"; // <---- FILL THIS OUT
  
  const jwt = require("jsonwebtoken");
  const currentTime = Math.floor(Date.now() / 1000);
  const payload = {
    sub: "user-123",      // <--- put your user's unique identifier
    iat: currentTime,
    exp: currentTime + 60 * 60,
    discover: true,       // <--- this tells EW to auto discover users (creating users on the fly).
    email: "REPLACE_ME",  // <---- FILL THIS OUT
    name: "REPLACE_ME"    // <---- FILL THIS OUT
  };
  const token = jwt.sign(payload, secret, { algorithm: "HS256" });

  res.render(__dirname + "/public/index.html", { token: token });
});

app.listen(3000, () => {
  console.log('server started');
});
