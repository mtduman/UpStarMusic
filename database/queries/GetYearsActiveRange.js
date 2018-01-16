const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
 module.exports = () => {
   const minQuery = Artist
     .find({})                 // every artsist we have
     .sort({ yearsActive: 1})          // sort asc
     .limit(1)                 // take first one   //all this and above port runningin in mongoose server
     .then(artists => artists[0].yearsActive);   // take the list of artist we have only one and pull up their age , termination query as minAge, this object only has age elemnt


   const maxQuery = Artist
     .find({})
     .sort({ yearsActive: -1})
     .limit(1)
     .then(artists => artists[0].yearsActive);

   return Promise.all([minQuery, maxQuery])
     .then((result) => {
       return { min: result[0], max: result[1] };
     })
 };
