const Artist = require('../models/artist');

/**
 * Finds a single artist in the artist collection.
 * @param {object} artistProps - Object containing a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves with the Artist that was created
 */
module.exports = (artistProps) => {
  // console.log(artistProps);

  // return Artist.create(artistProps)   // bu yeni, bunu da kullanabiliriz yeni kayit icin

  const artist = new Artist (artistProps)
  return artist.save();
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
