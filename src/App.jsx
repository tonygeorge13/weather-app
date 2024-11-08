import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, Setdata] = useState(null);
  const [cityName, SetcityName] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null); 

  const getweather = async () => {
    setloading(true);
    setError(null); 
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=412765865d2aa6f8a77e5421812e4f3e`
      );

      if (response.data) {
        Setdata(response.data.main);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Error fetching data, please try again later");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => SetcityName(e.target.value)}
        />
        <button onClick={getweather}>Get Weather</button>
        {loading && <h2>Loading...</h2>}
        {error && <h2 style={{ color: "red" }}>{error}</h2>}{" "}
     
        {data ? (
          <div>
            <h2>{cityName}</h2>
            <h2>Temperature: {data.temp} °C</h2>
            <h2>Humidity: {data.humidity}%</h2>
            <h2>Pressure: {data.pressure} </h2>
          </div>
        ) : !loading && !error ? (
          <h2></h2>
        ) : null}
      </div>
    </div>
  );
}

export default App;
