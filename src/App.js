import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const apiKey = '3e7cc61883eb9239ac90deb16f6283ef';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("API Response:", data); // 👈 Debug log

      if (res.ok) {
        setWeather(data);
      } else {
        setWeather(null);
        alert(data.message || "City not found");
      }
    } catch (error) {
      alert("Failed to fetch weather");
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {weather && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>☁️ {weather.weather[0].description}</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
