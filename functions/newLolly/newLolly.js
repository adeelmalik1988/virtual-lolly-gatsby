const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faunadb")
const shortId = require("shortid")
require("dotenv").config()


const q = faunadb.query

const typeDefs = gql`
  type Query {
    hello: String
  
  }
  type Lolly {
    recipientName: String!
    message: String!
    sender: String!
    flavourTop: String!
    flavourMedium: String!
    flavourBottom: String!
    lollyPath: String!
    
  }
  type Mutation {
    createLolly(recipientName: String!, message: String! ,sender: String! ,flavourTop: String! ,flavourMedium: String!, flavourBottom: String!): Lolly
  }


`



const resolvers = {
  Query: {
    hello: () => 'Hello, Lolly!',
  },
  Mutation: {
    createLolly: async (_, args) => {
      console.log(args)
      
      const client = new faunadb.Client({
        secret: process.env.FAUNA
      })
      const id = shortId.generate()
      args.lollyPath = id

      const result =  await client.query(
        q.Create(q.Collection("lollies"),{
          data: args
        })
      )


      console.log("result", result)
      console.log("result", result.data)

      return result.data

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
