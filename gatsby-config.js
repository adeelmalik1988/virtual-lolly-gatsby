// const { createHttpLink } = require("@apollo/client")

// /**
//  * Configure your Gatsby site with this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/gatsby-config/
//  */
// require("dotenv").config({
//   path: `.env.${process.env.FAUNA}`
// })



module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {        
        typeName: "getLolly",
        fieldName: "getLolly",



        url:"https://virtual-lolly-adeelmalik.netlify.app/.netlify/functions/newLolly"


      }
    }
  ],
}
