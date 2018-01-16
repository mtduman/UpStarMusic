const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const minQuery = Artist
    .find({})                 // every artsist we have
    .sort({ age: 1})          // sort asc
    .limit(1)                 // take first one   //all this and above port runningin in mongoose server
    .then(artists => artists[0].age);   // take the list of artist we have only one and pull up their age , termination query as minAge, this object only has age elemnt

  const maxQuery = Artist
    .find({})
    .sort({ age: -1})
    .limit(1)
    .then(artists => artists[0].age);

  return Promise.all([minQuery, maxQuery])
    .then((result) => {
      return { min: result[0], max: result[1] };
    })
};














// Boska cozum yolu
// module.exports = () => {
//     return Artist.aggregate()
//         .group({
//             _id: null,
//             min: { $min: '$age' },
//             max: { $max: '$age' }
//         })
//        .project({ _id: 0, min: 1, max: 1 })
//       .then(result => result[0]);
// };









// Artist.find({})
//   .sort({ age: 1})
//   .then((artist) => {
//     console.log( { min: artist[0].age, max: artist[artist.length -1].age } );
//     return ({ min: artist[0].age, max: artist[artist.length -1].age });
//   });


// Artist.findOne({})
//   .sort({ age: 1})
//   .exec( function(err, first) {
//     firstAge = first.age
//     console.log(firstAge,  first.name, first.age )
//   })


//
//   Artist.findOne({})
//     .sort({ age: -1})
//     .exec( function(err, last) {
//       lastAge = last.age
//       console.log(lastAge,  last.name, last.age )
//     });
//
//     return { firstAge, firstAge }
// Artist.findOne({})
//   .sort({ age: -1})
//   .then((artist) => {
//     console.log( artist[0].name, artist[0].age );
// });
