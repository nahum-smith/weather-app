import moment from 'moment'

export const formatForecast = (f, i, o) => {
  return {
    dateString: formatDT(f.dt),
    icon: `http://openweathermap.org/img/w/${f.weather[0].icon}.png`,
    desc: f.weather[0].description,
    maxTemp: Math.round(f.main.temp_max),
    minTemp: Math.round(f.main.temp_min),
    humidity: f.main.humidity
  }
}
export const filterForecastList = (f, i, o) => {
  if (i === 0) return f
  return moment(f.dt * 1000, 'x').format('dddd') !== moment(o[i - 1].dt * 1000, 'x').format('dddd')
}
export const formatDT = (date) => {
  return moment(date * 1000, 'x').format('dddd, MMM Do YYYY')
}

export const reduceForecastList = (item) => {
  return item.dt
}
