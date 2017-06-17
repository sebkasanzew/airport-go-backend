// let api =  require('./api/munich')
const fs = require("fs")
const fetch = require('node-fetch')
const _ = require('lodash')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const headers = {
  'X-apiKey': 'd017a45398ba4a8e14b7fe534fb9b54a'
}
const airport = 473 // Munich
const params = {method: 'GET', headers, timeout: 0}

function readJsonFileSync(filepath, encoding){
  if (typeof (encoding) === 'undefined'){
    encoding = 'utf8';
  }
  const file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

function getJSON(file){
  const filepath = __dirname + '/' + file;
  return readJsonFileSync(filepath);
}

let munichServices = (callback) => {
  const queryParam = 'searchString=' // + '&length=10'

  fetch(
      `https://api-dev.munich-airport.de/aci-service-v1/search/${airport}?${queryParam}`,
      params
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  }).catch((error) => {
    console.log('Promise error', error)
  })
}

app.get('/services', function(req, res) {
  const queryParam = 'searchString=&length=1000'

  fetch(
      `https://api-dev.munich-airport.de/aci-service-v1/search/${airport}?${queryParam}`,
      params
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  }).catch((error) => {
    console.log('Promise error', error)
  })
})

app.get('/services/json', (req, res) => {
  const json = getJSON('data/services.json');
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(json, null, 3))
})

app.get('/airport', (req, res) => {
  fetch(
      `https://api-dev.munich-airport.de/aci-airport-v1/detail/${airport}`,
      params
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  }).catch((error) => {
    console.log('Promise error', error)
  })
})

app.get('/flight', (req, res) => {
  fetch(
      `https://api-dev.munich-airport.de/aci-flight-v1/flight/${airport}/arrival`,
      params
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  }).catch((error) => {
    console.log('Promise error', error)
  })
})

app.get('/airline', (req, res) => {
  fetch(
      `https://api-dev.munich-airport.de/aci-airline-v1/search/${airport}`,
      {method: 'GET', headers}
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  }).catch((error) => {
    console.log('Promise error', error)
  })
})

app.get('/service-titles', (req, res) => {
  const queryParam = 'searchString=&length=1000'

  fetch(
      `https://api-dev.munich-airport.de/aci-service-v1/search/${airport}?${queryParam}`,
      {method: 'GET', headers, timeout: 0}
  ).then(res => {
    return res.json()
  }).then(json => {
    json = _.map(json.services, 'title')
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  }).catch((error) => {
    console.log('Promise error', error)
  })
  /*
   munichServices().then(json => {
   console.log(`got ${json.length} services`)
   json = _.map(json.services, 'title')
   res.setHeader('Content-Type', 'application/json')
   res.send(JSON.stringify(json, null, 3))
   })
   */
})

app.get('/puzzles', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({a: 1}, null, 3))
})

app.listen(port, () => {
  console.log('Service started at port ' + port)
})
