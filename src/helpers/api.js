import { _appid } from '../config/config'
const { URL, URLSearchParams } = window

export async function coordsWeatherRequest (coords) {
  const _baseURL = new URL('/data/2.5/weather', 'http://api.openweathermap.org/')
  const searchParams = new URLSearchParams({
    type: 'accurate',
    APPID: _appid,
    units: 'imperial',
    lon: coords.lon,
    lat: coords.lat,
  })
  _baseURL.search = searchParams
  const response = await fetch(_baseURL.href)
  return response.json()
}

export async function basicRequest (city, forecast = false) {
  const _baseURL = new URL('/data/2.5/', 'http://api.openweathermap.org/')
  const input = city.indexOf(',') > -1 ? city.split(',') : [city, '']
  _baseURL.pathname = !forecast ? _baseURL.pathname + '/weather' : _baseURL.pathname + 'forecast'
  const zip = isNaN(parseInt(input[0]))
  const searchParams = zip
  ? new URLSearchParams({
    q: city,
    type: 'accurate',
    APPID: _appid,
    units: 'imperial',
    cnt: 50
  })
  : new URLSearchParams({
    zip: city,
    APPID: _appid,
    type: 'accurate',
    APPID: _appid,
    units: 'imperial',
    cnt: 50
  })
  _baseURL.search = searchParams
  console.info(_baseURL.href)
  const response = await fetch(_baseURL.href)
  return response.json()
}

export async function currentIpGeoRequest () {
  const _baseURL = new URL('/json', 'http://ip-api.com')
  const response = await fetch(_baseURL.href)
  return response.json()
}
