import { _appid } from '../config/config'
const { URL, URLSearchParams } = window
console.info(URL)
const _baseURL = new URL('/data/2.5/', 'http://api.openweathermap.org/')

export async function basicRequest (city, forecast = false) {
  console.info('forecast=', forecast)
  _baseURL.pathname = !forecast ? _baseURL.pathname + '/weather' : _baseURL.pathname + '/forecast'

  const searchParams = new URLSearchParams({
    q: city,
    type: 'accurate',
    APPID: _appid,
    cnt: 5
  })

  _baseURL.search = searchParams
  console.info(_baseURL.href)

  const response = await fetch(_baseURL.href)
  return response.json()
}
