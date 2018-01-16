const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 * like this: { all: [artists], count, offset; offset, limit: limit }
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  // console.log(criteria)
  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all( [query, Artist.find(buildQuery(criteria)).count() ])
    .then((results) => {
      return {
        all: results[0],
        count: results[1],
        offset: offset,
        limit: limit
      }
    });
};


const buildQuery = (criteria) => {
  const  query = {};

  if (criteria.name) {          // bunu kullanabilmek icin terminalden Upstar Music icin text index yarattik
    query.$text = { $search: criteria.name};
  }

  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    };
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    };
  }

  return query;
}










  // var filtName = {} ;
  // var filtAge = {},filtyearsActive = {};
  // if ( criteria.name )
  //   filtName = { name: criteria.name };
  //   console.log(criteria.name );
  //
  // if ( criteria.age )
  //   console.log(criteria.age.min, criteria.age.max );
  //
  // if ( criteria.yearsActive )
  //   console.log(criteria.yearsActive.min, criteria.yearsActive.max );
  //
  //
  // const query = Artist
  //   .find(filtName)
  //   .sort({ [sortProperty]: 1 })
  //   .skip(offset)
  //   .limit(limit);









// const Count = Artist
//   .count({},function(err, count){
//     console.log(count);
//     return count;
//   })
//
// console.log({ all:Query, count:Count })
// return { all:Query, count:Count }
  // .then((result) => {
  //   console.log({ all: Query, count: Count })
  //   // return { all: Query, count: Count };
  // })




// return Promise.all( [Query] )
  // .then((result) => {
  //   console.log( sortProperty);
  //   // return { min: result[0], max: result[1] };
  // })

// .then((result) => {
//   console.log( result )
//   // return { all: result, count: Artist.length offset: offset, limit: limit};
// })
