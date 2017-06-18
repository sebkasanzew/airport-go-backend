// let api =  require('./api/munich')
const fs = require('fs')
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

function readJsonFileSync(filepath, encoding) {
  if (typeof (encoding) === 'undefined') {
    encoding = 'utf8'
  }
  const file = fs.readFileSync(filepath, encoding)
  return JSON.parse(file)
}

function getJSON(file) {
  const filepath = __dirname + '/' + file
  return readJsonFileSync(filepath)
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
  const json = getJSON('data/services.json')
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

app.get('/flight/arrivals', (req, res) => {
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

app.get('/flight/departures', (req, res) => {
  fetch(
      `https://api-dev.munich-airport.de/aci-flight-v1/flight/${airport}/departure`,
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
      `https://api-dev.munich-airport.de/aci-airline-v1/airlines`,
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
})

app.get('/puzzles/public-area', (req, res) => {
  const data = {
    'publicArea': [
      {
        type: 'find',
        title: 'Find this store',
        description: 'Go find this location at floor 2A',
        image: 'https://www-dev.passngr.de/images/square/low/49592.png',
        beaconID: 11982,
        // beaconID2: 42114
        points: 50
      },
      {
        type: 'quest',
        title: 'Do some stuff',
        description: 'Go get some coffee',
        points: 30
      }
    ]
  }

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(data))
})

app.get('/puzzles/passenger-zone', (req, res) => {
  const data = {
    'passengerZone': [
      {
        type: 'question',
        description: ''
      },
      {
        type: 'question',
        description: ''
      },
      {
        type: 'question',
        description: ''
      }
    ]
  }

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(data))
})

app.get('/puzzles/security-check', (req, res) => {
  const data = {
    'securityCheck': [
      {
        type: 'find',
        title: 'Find the fastest lane',
        description: 'The fastest security check line at Terminal 2 is on level 4 and takes approximately 12 minutes.',
        image: 'https://www-dev.passngr.de/images/square/low/49592.png',
        beaconID: 42114,
        // beaconID2: 11982
        points: 20
      },
      {
        type: 'question',
        title: 'Solve this quiz',
        description: 'How much fluids are allowed to carry in the hand luggage?',
        correctAnswer: 1,
        answers: [
          {text: '2l'},
          {text: '250ml'},
          {text: '1l'}
        ],
        points: 10
      }
    ]
  }

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(data))
})

app.listen(port, () => {
  console.log('Service started at port ' + port)
})
