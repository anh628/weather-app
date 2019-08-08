const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/3135ae59ca15f708bbcd5c94a29d6b8a/' +
    latitude +
    ',' +
    longitude

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const { temperatureHigh, temperatureLow, summary } = body.daily.data[0]
      const { temperature, precipProbability } = body.currently
      callback(
        undefined,
        `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.
        The termperature high for today will be ${temperatureHigh} degrees and the low is ${temperatureLow} degrees.`
      )
    }
  })
}

module.exports = forecast
