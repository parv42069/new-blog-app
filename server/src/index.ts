import { ApolloServer, ExpressContext } from 'apollo-server-express';
import mongoose from 'mongoose';
import express from 'express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import cors from 'cors';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const MONGODB =
  'mongodb+srv://parv:1234@cluster0.qcwtqeh.mongodb.net/blog-app?retryWrites=true&w=majority';

// Apollo server
// typeDefs: GraphQL Type Definations
// resolvers: How do we resolve queries / mutations

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.use(
    cors({
      origin: 'https://localhost:2000',
      credentials: true,
    })
  );
}

startServer();

mongoose.connect(MONGODB).then(() => {
  console.log('🎉 connected to database successfully');
  return app.listen({ port: 2000 }, () =>
    console.log(`🚀 Server ready at ${server.graphqlPath}`)
  );
});
