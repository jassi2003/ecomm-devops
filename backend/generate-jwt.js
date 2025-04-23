const jwt = require('jsonwebtoken');

const payload = {
  iss: "0dLePXrHrgY3UQfv35Ba8MjJZFOqpBHW", // Use the "key" from Kong response
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
};

const secret = "JFVeajH1EbCYIeaP2cU0b4eC2o9GlJZE"; // Use the "secret" from Kong response

const token = jwt.sign(payload, secret, { algorithm: "HS256" });

console.log("My JWT Token:", token);


//TO AUTHENTICATE THE SERVICES:
//1.) Adding JWT Authentication in Kong=> curl -i -X POST "http://localhost:8001/services/user-service/plugins" --data "name=jwt"
//2.)Create a user in Kong: curl -i -X POST "http://localhost:8001/consumers" --data "username=jaspreet"
//3.)Generate JWT Credentials for the Consumer => curl -i -X POST "http://localhost:8001/consumers/jaspreet/jwt"
//4.)Then make the file in VS code and add KEY,SECRET and run this command to generate the token=>  node generate-jwt.js
//5.)After generating the token paste the token in this command=> curl -i -X GET "http://localhost:8000/user" -H "Authorization: Bearer YOUR_GENERATED_TOKEN"
//then to authenticate other services run this command only=> curl -i -X POST "http://localhost:8001/services/product-service/plugins" --data "name=jwt"


//Enabled enable Rate Limiting to prevent abuse and control API usage.
//1.)curl -i -X POST "http://localhost:8001/services/user-service/plugins" --data "name=rate-limiting" --data "config.second=5" --data "config.minute=100"
//OR Enable Rate Limiting for a Route Instead of a Service=> curl -i -X POST "http://localhost:8001/routes/user-route/plugins" --data "name=rate-limiting" --data "config.second=5" --data "config.minute=100"
//2.)To test=> curl -i -X GET "http://localhost:8000/user" -H "Authorization: Bearer YOUR_GENERATED_TOKEN"
//3.)To send multiple requests=> for /L %i in (1,1,10) do curl -i http://localhost:8000/user

//to remove rate limiting:
//1.)curl -i -X GET "http://localhost:8001/services/user-service/plugins"
//2.)curl -i -X DELETE "http://localhost:8001/services/user-service/plugins/{plugin Id}"


 //for /L %i in (1,1,15) do curl -i -X GET "http://localhost:8000/user" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwZExlUFhySHJnWTNVUWZ2MzVCYThNakpaRk9xcEJIVyIsImV4cCI6MTc0NDM3MjUyMCwiaWF0IjoxNzQ0MzY4OTIwfQ.9AH5AgyqHXpJ_YGWnzcxkAscw-DZDUg0SWAiggq9vtA"


