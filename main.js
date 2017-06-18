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
        title: 'Find Hunkemöller',
        description: 'Go find this location at Terminal 2 -  Level 03 - Arrival, ',
        image: '49523',
        beaconID: 11982, // beaconID2: 42114
        rewardTitle: "Hunkemöller",
        rewardText: "Hunkemöller is one of Europe's top lingerie brands and is the market leader in Germany and the Benelux countries. You'll find fashionable lingerie, undergarments, sleepwear, sports apparel and swimwear. From clothing to enhance everyday life to lingerie for special occasions and very special moments – all products reflect the Hunkemöller philosophy of outstanding quality at affordable prices. The brand takes pride in offering the latest styles and a perfect fit.",
        rewardOpeningHours: "daily 7:30 a.m. -  9:00 p.m.",
        points: 40
      },
      {
        type: 'find',
        title: 'Find Starbucks',
        description: 'Go find this location at Terminal 2 -  Level 03 - Arrival',
        image: '50227',
        beaconID: 42114, // beaconID2: 42114
        rewardTitle: "Starbucks",
        rewardText: "At Starbucks in Terminal 2, Level 03, you can enjoy your coffee just the way you like it, from an iced cappuccino to traditional coffee and cake – it's entirely up to you. Regulars love the friendly service and the inviting atmosphere at Starbucks. And there's much more to discover than the perfectly brewed coffees: Starbucks offers a selection of high-quality teas, excellent baked goods and other treats. Enjoy your stay!",
        rewardOpeningHours: "daily 7:30 a.m. -  9:00 p.m.",
        points: 40
      },
      {
        type: 'question',
        title: 'Solve this problem',
        description: '2 - 2',
        correctAnswer: 2,
        answers: [
          {text: '1'},
          {text: '3'},
          {text: '0'}
        ],
        points: 5
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
        type: 'find',
        title: 'Find Bistro Organic',
        description: 'Go find this location at Terminal 2 - Level 04 - Departure, Gate G',
        image: '49592',
        beaconID: 11982, // beaconID2: 42114
        rewardTitle: "Bistro Organic",
        rewardText: "From prosecco and lassi to snacks, coffee and cake: true to its name, Bistro Organic serves exclusively 100% organic ingredients to its guests.  The fresh fruit and salad corner also provides light and healthy alternatives to fast food. Rounding off the menu at this trendy organic eatery are freshly squeezed juices and a selection of regional beers.",
        rewardOpeningHours: "daily 5:00 a.m. - 10:00 p.m.",
        points: 50
      },
      {
        type: 'find',
        title: 'Find Bluebird Bar',
        description: 'Go find this location at Terminal 2 - Level 05 -  Departure, Gate H',
        image: '49581',
        beaconID: 42114, // beaconID2: 11982
        rewardTitle: "Bluebird Bar",
        rewardText: "At the Bluebird Bar tasty items are available \"to go\" starting in the early morning hours – always good to know when you miss breakfast at home. You can pick up sandwiches, snacks and baked goods for the perfect start to your morning. Also on the menu are hearty Bavarian sausages, thin-crust Italian pizza, fine pasta, shakes and ice cream.",
        rewardOpeningHours: "daily 7:00 - ZUM LETZTEN FLUG",
        points: 50
      },
      {
        type: 'question',
        title: 'Solve this problem',
        description: '2 * 2',
        correctAnswer: 0,
        answers: [
          {text: '4'},
          {text: '5'},
          {text: '1'}
        ],
        points: 5
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
        image: '59592',
        beaconID: 42114,
        // beaconID2: 11982
        points: 20
      },
      {
        type: 'question',
        title: 'Solve this quiz',
        description: 'How much fluids are allowed to carry in the hand luggage?',
        correctAnswer: 2,
        answers: [
          {text: '2 l'},
          {text: '250 ml'},
          {text: '1 l'}
        ],
        points: 10
      },
      {
        type: 'question',
        title: 'Solve this problem',
        description: '2 + 2',
        correctAnswer: 0,
        answers: [
          {text: '4'},
          {text: '5'},
          {text: '1'}
        ],
        points: 5
      }
    ]
  }

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(data))
})

app.listen(port, () => {
  console.log('Service started at port ' + port)
})
