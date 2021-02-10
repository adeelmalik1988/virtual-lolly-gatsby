const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faunadb")
const shortId = require("shortid")
require("dotenv").config()


const q = faunadb.query

const typeDefs = gql`
  type Query {
    getLolly: [Lolly!]
    lollyByPath(link: String): Lolly
  
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
    getLolly: async (_, args) => {
      const client = new faunadb.Client({
        secret: process.env.FAUNA
      })

      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lollies_index"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)
        return result.data.map(d => {
          return {
            recipientName: d.data.recipientName,
            message: d.data.message,
            sender: d.data.sender,
            flavourTop: d.data.flavourTop,
            flavourMedium: d.data.flavourMedium,
            flavourBottom: d.data.flavourBottom,
            lollyPath: d.data.lollyPath
          }
        })


      } catch (err) {
        console.log(err)
      }
    }

    },
    Mutation: {
      createLolly: async (_, args) => {
        console.log(args)

        const client = new faunadb.Client({
          secret: process.env.FAUNA
        })
        const id = shortId.generate()
        args.lollyPath = id

        const result = await client.query(
          q.Create(q.Collection("lollies"), {
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
