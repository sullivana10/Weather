import React, { useState, useEffect } from "react";
import "../Styles/Weather.scss";

function Weather() {
  const [location, setLocation] = useState("");
  const [info, setInfo] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    getDynamicData();
  };

  const updateLocation = (e) => {
    const location = e.target.value;
    setLocation(location);
  };

  const getData = async () => {
    const res = await fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=Minneapolis&days=3`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    const data = await res.json();
    setLocation("");
    setInfo({
      city: data.location.name,
      state: data.location.region,
      date: data.location.localtime,
      condition: data.current.condition.text,
      temperature: data.current.temp_f.toFixed(),
      feels: data.current.feelslike_f.toFixed(),
      humidity: data.current.humidity,
      wind: data.current.wind_mph,
      icon: data.current.condition.icon,
      dayOneDate: data.forecast.forecastday[0].date,
      dayOneMaxTemp: data.forecast.forecastday[0].day.maxtemp_f.toFixed(),
      dayOneMinTemp: data.forecast.forecastday[0].day.mintemp_f.toFixed(),
      dayOneCondition: data.forecast.forecastday[0].day.condition.text,
      dayOneIcon: data.forecast.forecastday[0].day.condition.icon,
      dayTwoDate: data.forecast.forecastday[1].date,
      dayTwoMaxTemp: data.forecast.forecastday[1].day.maxtemp_f.toFixed(),
      dayTwoMinTemp: data.forecast.forecastday[1].day.mintemp_f.toFixed(),
      dayTwoCondition: data.forecast.forecastday[1].day.condition.text,
      dayTwoIcon: data.forecast.forecastday[1].day.condition.icon,
      dayThreeDate: data.forecast.forecastday[2].date,
      dayThreeMaxTemp: data.forecast.forecastday[2].day.maxtemp_f.toFixed(),
      dayThreeMinTemp: data.forecast.forecastday[2].day.mintemp_f.toFixed(),
      dayThreeCondition: data.forecast.forecastday[2].day.condition.text,
      dayThreeIcon: data.forecast.forecastday[2].day.condition.icon,
    });
  };

  const getDynamicData = async () => {
    const res = await fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    const data = await res.json();
    setLocation("");
    setInfo({
      city: data.location.name,
      state: data.location.region,
      date: data.location.localtime,
      condition: data.current.condition.text,
      temperature: data.current.temp_f.toFixed(),
      feels: data.current.feelslike_f.toFixed(),
      humidity: data.current.humidity,
      wind: data.current.wind_mph,
      icon: data.current.condition.icon,
      dayOneDate: data.forecast.forecastday[0].date,
      dayOneMaxTemp: data.forecast.forecastday[0].day.maxtemp_f.toFixed(),
      dayOneMinTemp: data.forecast.forecastday[0].day.mintemp_f.toFixed(),
      dayOneCondition: data.forecast.forecastday[0].day.condition.text,
      dayOneIcon: data.forecast.forecastday[0].day.condition.icon,
      dayTwoDate: data.forecast.forecastday[1].date,
      dayTwoMaxTemp: data.forecast.forecastday[1].day.maxtemp_f.toFixed(),
      dayTwoMinTemp: data.forecast.forecastday[1].day.mintemp_f.toFixed(),
      dayTwoCondition: data.forecast.forecastday[1].day.condition.text,
      dayTwoIcon: data.forecast.forecastday[1].day.condition.icon,
      dayThreeDate: data.forecast.forecastday[2].date,
      dayThreeMaxTemp: data.forecast.forecastday[2].day.maxtemp_f.toFixed(),
      dayThreeMinTemp: data.forecast.forecastday[2].day.mintemp_f.toFixed(),
      dayThreeCondition: data.forecast.forecastday[2].day.condition.text,
      dayThreeIcon: data.forecast.forecastday[2].day.condition.icon,
    });
  };

  if (!info) return <div>loading...</div>;

  return (
    <>
      <div className="container">
        <div className="search">
          <form className="form">
            <input
              className="input"
              aria-label="location"
              type="text"
              placeholder="Enter location"
              required
              value={location}
              onChange={updateLocation}
            />
            <button className="btn" type="submit" onClick={onSubmit}>
              Search
            </button>
          </form>
        </div>
        <div className="card">
          <div className="card__side card__side--front">
            <section className="location">
              <div className="city-state">
                {info.city}, {info.state}
              </div>
              <div className="date">{info.date}</div>
            </section>
            <div className="current">
              <div className="temp">
                {info.temperature}
                <span>℉</span>
              </div>
              <img src={info.icon} alt="condition icon" className="icon" />
              <div className="condition">{info.condition}</div>
              <div className="hi-low">
                {info.dayOneMaxTemp}
                <span>℉</span> / {info.dayOneMinTemp}
                <span>℉</span>
              </div>
            </div>
            <div className="details">
              <div className="feels">
                <p>Feels Like</p>
                <p className="bold">{info.feels}℉</p>
              </div>
              <div className="humidity">
                <p>Humidity</p>
                <p className="bold">{info.humidity}%</p>
              </div>
              <div className="wind">
                <p>Winds</p>
                <p className="bold">{info.wind}MPH</p>
              </div>
            </div>
          </div>

          <div className="card__side card__side--back">
            <div className="container">
              <section className="location">
                <div className="city-state">
                  {info.city}, {info.state}
                </div>
              </section>
              <div className="day">
                <div className="date-condition">
                  <p className="date">{info.dayOneDate}</p>
                  <p className="condition">{info.dayOneCondition}</p>
                </div>
                <div className="image">
                  <img
                    src={info.dayOneIcon}
                    alt="condition icon"
                    className="icon"
                  />
                </div>
                <div className="hi-low">
                  <p className="hi">{info.dayOneMaxTemp}℉</p>
                  <p className="low">{info.dayOneMinTemp}℉</p>
                </div>
              </div>
              <div className="day">
                <div className="date-condition">
                  <p className="date">{info.dayTwoDate}</p>
                  <p className="condition">{info.dayTwoCondition}</p>
                </div>
                <div className="image">
                  <img
                    src={info.dayTwoIcon}
                    alt="condition icon"
                    className="icon"
                  />
                </div>
                <div className="hi-low">
                  <p className="hi">{info.dayTwoMaxTemp}℉</p>
                  <p className="low">{info.dayTwoMinTemp}℉</p>
                </div>
              </div>
              <div className="day">
                <div className="date-condition">
                  <p className="date">{info.dayThreeDate}</p>
                  <p className="condition">{info.dayThreeCondition}</p>
                </div>
                <div className="image">
                  <img
                    src={info.dayThreeIcon}
                    alt="condition icon"
                    className="icon"
                  />
                </div>
                <div className="hi-low">
                  <p className="hi">{info.dayThreeMaxTemp}℉</p>
                  <p className="low">{info.dayThreeMinTemp}℉</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
