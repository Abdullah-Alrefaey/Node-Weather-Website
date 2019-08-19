const request = require('request');


// Geocoding
// Convert Address to -> Lat/Long -> Weather
// print the lat/long for Los Angeles

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmVmYWV5OTkiLCJhIjoiY2p6Y3FqZzVwMDBuczNobHFlMWttcGY5YyJ9.sSOgvl7VJ1qWvZ3_agaJCQ&limit=1`;

    request({url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length === 0)
        {
            callback('Unable to find location, try again with different search term.', undefined);
        }
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });

};

module.exports = geocode;