export default munichServices = () => {
  import fetch from 'node-fetch'

  let headers = {
    'X-apiKey': 'd017a45398ba4a8e14b7fe534fb9b54a',
  }

  let queryParam = 'searchString='
  let airport = 473 // Munich

  fetch(
      `https://api-dev.munich-airport.de/aci-service-v1/search/${airport}?${queryParam}`,
      {method: 'GET', headers}
  ).then(res => {
    return res.json()
  })
}
