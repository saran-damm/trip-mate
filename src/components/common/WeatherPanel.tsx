import Icon from './IconProvider';

type Forecast = {
    day: string;
    weather: string;
    weatherIcon: string;
    temp: string;
    alert?: string | null;
  };
  
  const forecast: Forecast[] = [
    { day: "Day 1", weather: "Sunny", weatherIcon: "sun", temp: "32°C" },
    {
      day: "Day 2",
      weather: "Rain",
      weatherIcon: "cloud-rain",
      temp: "25°C",
      alert: "Heavy rain expected — outdoor activities may be affected.",
    },
    { day: "Day 3", weather: "Partly Cloudy", weatherIcon: "cloud-sun", temp: "28°C" },
  ];
  
  export default function WeatherPanel() {
    return (
      <div className="bg-surface rounded-card shadow-card p-4 mt-6">
        <h2 className="text-xl font-semibold mb-4">
        Weather Forecast <Icon icon="cloud-sun" className="ml-2 text-primary" />
      </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {forecast.map((f, idx) => (
            <div key={idx} className="p-3 border rounded-lg bg-light">
              <p className="font-semibold">{f.day}</p>
              <p className="text-lg flex items-center gap-2">
                <Icon icon={f.weatherIcon as any} className="text-primary" /> {f.weather}
              </p>
              <p className="text-neutral">{f.temp}</p>
  
              {f.alert && (
                <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded text-sm flex items-start">
                  <Icon icon="warning" className="mr-2 mt-0.5 text-red-600" /> 
                  <div>
                    {f.alert}
                    <button
                      className="ml-2 text-primary underline text-xs"
                      onClick={() => alert("Suggest alternatives (hook to EditItinerary)")}
                    >
                      Fix Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  