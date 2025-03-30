const jwt = require('jsonwebtoken');

const payload = {
  iss: "qtYhRV9IkJhO348ZQ7M1kltnrghMiCpE", // Use the "key" from Kong response
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
};

const secret = "OMS8PbOBE2EbHUQgZARFqH4SWwsp0Z6Z"; // Use the "secret" from Kong response

const token = jwt.sign(payload, secret, { algorithm: "HS256" });

console.log("My JWT Token:", token);
