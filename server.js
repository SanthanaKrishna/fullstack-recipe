const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//bring in graphql-express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const Recipe = require('./models/Recipe');
const User = require('./models/User');
const { typeDefs } = require('./query/schema');
const { resolvers } = require('./query/resolver');
require('dotenv').config({ path: './config.env' })


const PORT = process.env.PORT || 4444;
//connect to database
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch((err) => console.error(err))

//create schema
const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})


//Initializes application
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))
//create graphiQL application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//connect schemas with GraphQL
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
        schema,
        context: {    //context: contain object pass mangoose model to graphql by using context
            Recipe,
            User
        }
    }));

app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`);
});