const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");

const typeDefs = require("./src/schema/schema");
const resolvers = require("./src/resolvers/resolvers");
const {
  connectToDatabase,
  getStudentModel,
  getClassModel,
} = require("./src/config/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpserver = http.createServer(app);

connectToDatabase().then(() => {
  let apolloServer = null;
  async function startServer() {
    apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: {
        studentModel: getStudentModel(),
        classModel: getClassModel(),
      },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
  }
  startServer();

  const port = process.env.PORT || 4000;

  app.listen(port, function () {
    console.log(
      `server running on port http://localhost:${port}${apolloServer.graphqlPath}`
    );
  });
});
