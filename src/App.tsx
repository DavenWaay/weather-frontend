import { useState } from "react";
import "./WeatherUI.css";

type Weather = { temperature?: number; condition?: string; error?: string; [k: string]: any } | null;

function WeatherIcon({ condition }: { condition?: string }) {
  const c = (condition || "").toLowerCase();

  if (c.includes("cloud")) {
    return (
      <svg className="icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path fill="#90A4AE" d="M20 45h28a9 9 0 0 0 0-18 13 13 0 0 0-25-3A9 9 0 0 0 20 45z" />
      </svg>
    );
  }

  if (c.includes("rain") || c.includes("drizzle")) {
    return (
      <svg className="icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path fill="#90A4AE" d="M18 36h28a9 9 0 0 0 0-18 13 13 0 0 0-25-3A9 9 0 0 0 18 36z" />
        <g fill="#4FC3F7"><path d="M22 44c-1 3 3 6 3 6s4-3 3-6-3-1-3-1-2-2-3 1zM36 44c-1 3 3 6 3 6s4-3 3-6-3-1-3-1-2-2-3 1z"/></g>
      </svg>
    );
  }

  if (c.includes("snow")) {
    return (
      <svg className="icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path fill="#90A4AE" d="M18 28h28a9 9 0 0 0 0-18 13 13 0 0 0-25-3A9 9 0 0 0 18 28z" />
        <g stroke="#B3E5FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M32 38v8M28 42h8M26 36l6 6M38 36l-6 6"/></g>
      </svg>
    );
  }

  if (c.includes("thunder") || c.includes("storm") || c.includes("lightning")) {
    return (
      <svg className="icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path fill="#90A4AE" d="M18 30h28a9 9 0 0 0 0-18 13 13 0 0 0-25-3A9 9 0 0 0 18 30z" />
        <path d="M34 36l-6 12h6l-2 8 12-18h-8z" fill="#FFD54F" />
      </svg>
    );
  }

  if (c.includes("mist") || c.includes("fog") || c.includes("haze")) {
    return (
      <svg className="icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path fill="#B0BEC5" d="M6 38h52v4H6zM10 46h44v4H10zM14 54h36v4H14z" />
      </svg>
    );
  }

  // default: sun/clear
  return (
    <svg className="icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="32" cy="32" r="10" fill="#FFD54F" />
      <g stroke="#FFD54F" strokeWidth="2"><path d="M32 6v8M32 50v8M6 32h8M50 32h8M12 12l5 5M47 47l5 5M12 52l5-5M47 17l5-5"/></g>
    </svg>
  );
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather>(null);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setWeather({ error: "Please enter a city name." });
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();

      // If the proxy returned a non-OK status (e.g. 404 for unknown/corrupt city)
      // show a clear user-facing message. The user requested a specific message
      // for gibberish/non-existing cities.
      if (!res.ok) {
        const msg = res.status === 404 ? "You need to enter a valid City." : (data?.message || "Failed to fetch weather.");
        setWeather({ error: msg, city });
        return;
      }

      // store the requested/returned city on the weather object so it persists
      const cityName = data?.city ?? city;
      setWeather({ ...data, city: cityName });
    } catch (err: any) {
      setWeather({ error: err?.message || "Failed to fetch weather.", city });
    }
  };

  const displayTemperature = (w: any) => {
    if (!w) return "";
    if (w.error) return w.error;
    const t = typeof w.temperature === "number" ? w.temperature.toFixed(2) : w.temperature;
    return `${t}°C, ${w.condition ?? "Unknown"}`;
  };

  const displayCity = () => {
    const w = weather as any;
    if (w && w.city) return w.city;
    if (city) return city.charAt(0).toUpperCase() + city.slice(1);
    return "";
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
        <h1 className="title">Weather Checker</h1>

        <div className="input-group">
          <input
            className="input"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <button className="btn" onClick={fetchWeather} aria-label="Get Weather">
            Get Weather
          </button>
        </div>

        {weather && (
          <div className={`result ${weather.error ? "error" : "ok"}`}>
            {!weather.error && <WeatherIcon condition={(weather as any).condition} />}
            <div className="result-text">
              <div className="city">{displayCity()}</div>
              <div className="summary">{displayTemperature(weather as any)}</div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
