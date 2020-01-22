const axios = require("axios");
const jwt = require("jsonwebtoken");
const secure = require("../secret");

let gitClientId = "<client_id>";
let gitClientSecret = "<client_secret>";

let accessTokenUrl = "https://github.com/login/oauth/access_token";
let profileUrl = "https://api.github.com/user";
let redirectUrl = "/welcome";


exports.loginCallback = (req, res, next) => {
  let request_token = req.query.code;
  console.log("request_token: " + req.query.code);

  axios
    .post(
      accessTokenUrl,
      {
        client_id: gitClientId,
        client_secret: gitClientSecret,
        code: request_token
      },
      {
        headers: { Accept: "application/json" }
      }
    )
    .then(function(response) {
      req.body.access_token = response.data.access_token;
      console.log("access_token: " + response.data.access_token);

      next();
    })
    .catch(function(error) {
      console.log(error);
    });
};

exports.getProfile = (req, res, next) => {
  let access_token = req.body.access_token;

  axios
    .get(profileUrl, {
      headers: {
        Authorization: `token ${access_token}`,
        Accept: "application/json"
      }
    })
    .then(function(response) {
      if (response.headers.status === "200 OK") {
        req.body.data = response.data;
        next();
      } else {
        console.log("Not authorized");
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

exports.authenticate = (req, res, next) => {
  console.log("in authenticate", req.body.data.login);
  //check if user is there in db then generate jwt

  next();
};

exports.generateJWTandRedirect = (req, res) => {

  let data = req.body.data;

  let token = jwt.sign(
    {
      data: req.body.access_token
    },
    secure.secret,
    {
      expiresIn: 86400 // 1 day in sec
    }
  );

  let userData = {
    logged_in: true,
    token: `Bearer ${token}`,
    user: {
      userid: data.login,
      username: data.name,
      email: data.email
    }
  };

  console.log(userData);

  res.cookie("userData", userData);
  res.redirect(redirectUrl);
};


//additional methods
exports.checkSession = (req, res) => {

  let token = req.headers.authorization

  axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: token,
        Accept: "application/json"
      }
    })
    .then(function(response) {
      console.log(response.headers);

      if (JSON.stringify(response.headers).indexOf("user") > -1) {
        axios
          .get("https://api.github.com/user/emails", {
            headers: {
              Authorization: token,
              Accept: "application/json"
            }
          })
          .then(function(response) {
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

exports.checkValidity = (req,res) => {
  console.log(req.headers.authorization);
  let head =req.headers.authorization;
  try{
    let result = jwt.verify(head.split(" ")[1],secure.secret);
    console.log(result);
  }catch(error){
    console.log(error.message);
  }

  res.send({"msg":"verified"});
}

exports.generateJWT = (req, res) => {

  let data_token = req.headers.authorization;

  let token = jwt.sign(
    {
      data: data_token
    },
    secure.secret,
    {
      expiresIn: 86400 // 1 day
    }
  );

  console.log(token);

  res.send({"msg":"token generated"});
}