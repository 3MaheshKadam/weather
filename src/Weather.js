// import React, { useState } from "react";
// import cleaerSky from "../src/Img/clear-sky.png";
// import drizzle from "../src/Img/drizzle.png";
// import humidity from "../src/Img/humidity.png";
// import rain from "../src/Img/rain.png";
// import sun from "../src/Img/sun.png";
// import wind from "../src/Img/wind.png";
// import snow from "../src/Img/snow.png";
// import search from "../src/Img/search.png";

// const Weather = () => {
//   let api_key = "501b3c4f31b2387ecf99e7aaa58136b2";
//   const [city, setcity] = useState("Pune");
//   return (
//     <div className="container">
//       <div className="top-bar">
//         <input
//           type="text"
//           className="cityInput"
//           placeholder="Search Location"
//         />
//         <div className="search-icon">
//           <img className="img" src={search} alt="" />
//         </div>
//       </div>
//       {/* <h1 className="imgg">ghjvhv</h1> */}
//       <div className="weather-image ">
//         <img className="imgg" src={cleaerSky} alt="" />
//       </div>

//       <div className="flex weather-temp">24 °C</div>
//       <div className="flex weather-location">{city}</div>
//       <div className="flex data-container">
//         {/* ///// */}
//         <div className=" element">
//           <img className="img3" src={humidity} alt="" />
//           <div className="data">
//             <div className="humidity-percent">59%</div>
//             <div className="text">Humidity</div>
//           </div>
//         </div>

//         <div className=" element">
//           <img className="img3" src={wind} alt="" />
//           <div className="data">
//             <div className="humidity-percent">18 km/h</div>
//             <div className="text">Wind Speed</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Weather;

import React, { useState, useEffect } from "react";
import cleaerSky from "../src/Img/clear-sky.png";
import humidity from "../src/Img/humidity.png";
import wind from "../src/Img/wind.png";
import search from "../src/Img/search.png";

const Weather = () => {
  const [city, setCity] = useState("Pune");
  const [weatherData, setWeatherData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setCity(searchInput);
  };

  useEffect(() => {
    const apiKey = "501b3c4f31b2387ecf99e7aaa58136b2";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [city]);

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search Location"
          value={searchInput}
          onChange={handleInputChange}
        />
        <div className="search-icon" onClick={handleSearch}>
          <img className="img" src={search} alt="" />
        </div>
      </div>

      {weatherData && (
        <>
          {/* Display weather image based on weather condition */}
          {/* Add logic to map weather conditions to appropriate image */}
          <div className="weather-image">
            <img className="imgg" src={cleaerSky} alt="" />
          </div>

          {/* Display temperature */}
          <div className="flex weather-temp">{weatherData.main.temp} °C</div>

          {/* Display city */}
          <div className="flex weather-location">{weatherData.name}</div>

          {/* Display humidity and wind speed */}
          <div className="flex data-container">
            <div className="element">
              <img className="img3" src={humidity} alt="" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData.main.humidity}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>

            <div className="element">
              <img className="img3" src={wind} alt="" />
              <div className="data">
                <div className="wind-speed">{weatherData.wind.speed} km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
