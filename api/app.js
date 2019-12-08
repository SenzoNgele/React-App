// --- NPM modules
const express = require("express");
const app = express(); // used for initializing the express app
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const validation = require("./middleware/checkAuth"); //impoting auth
//const dotenv = require('dotenv').config()
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true }); // making connection to testTest Database
require("dotenv").config();

// **** GraphQl modules
const { ApolloServer } = require("apollo-server-express");
const { graphiqlExpress } = require("graphql-server-express");
//**** End of GraphQl modules

//-- User defined modules
const personrouter = require("./controller/person.controller");
const hobbiesrouter = require("./controller/hobbies.controller");
//const Addressrouter = require("./controller/address.controller");

//*** GraphQl modules*/
const typeDefs = require("./graphql/schemas/schemas");
const resolvers = require("./graphql/indexResolver");

//*** GrphQl configurations */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  context: validation
});

// //my code =========================================================================
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); //every host can send request
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); //request to be sent
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });
//app.use(checkAuth);
//===================================================================================
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

server.applyMiddleware({ app });

//*** End of GraphQl configurations */

//testing the connection to the database. throws error if there is no connection found
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("you are connected to MongoDB");
});

app.use(bodyParser.json()); //Using body parser allows you to access req.body from within your routes or controllers.
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", personrouter);
app.use("/api", hobbiesrouter); // the "app.use" will use the the url from all the router file created in the router folder

const port = 4800; // assign a port the express app wil listen to.

// start server
//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
  console.log("Server is running on port number:" + port);
});
