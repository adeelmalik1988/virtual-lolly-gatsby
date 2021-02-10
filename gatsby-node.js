exports.createPages = async function ({ graphql, actions }) {

    const query = await graphql(`
    query {
        getLolly{
            getLolly{    
                recipientName
                message
                sender
                flavourTop
                flavourMedium 
                flavourBottom 
                lollyPath
            }
        }
      }
          `);

    console.log(JSON.stringify(query));

      const posts =   query.data.getLolly.getLolly;

      posts.map((post) => {
          actions.createPage({
              path: post.lollyPath,
              component: require.resolve(`./src/templates/showLolly`),
              context: post,
          });
      })


    console.log("End of Gatsby Node File");
}

