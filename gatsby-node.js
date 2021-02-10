// exports.createPages = async function ({ graphql, actions}) {

//     const query = await graphql(`
//           query {    
//             getLolly{
//                 message
//                 lollyPath
//             }
//               }
//           `);
  
//       console.log(JSON.stringify(query));
  
//     //   const posts =   query.data.getLolly;
  
//     //   posts.map((post) => {
//     //       actions.createPage({
//     //           path: post.data.lollyPath,
//     //           component: require.resolve(`./src/templates/showLolly`),
//     //           context: post.data,
//     //       });
//     //   })
  
      
//       console.log("End of Gatsby Node File");
//   }