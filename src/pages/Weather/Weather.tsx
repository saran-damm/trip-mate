import Card from "../../components/common/Card";

const forecast = [
  { day: "Day 1", weather: "☀️ Sunny", temp: "32°C", alert: null },
  { day: "Day 2", weather: "🌧 Rain", temp: "25°C", alert: "Heavy rain expected — outdoor activities may be affected." },
  { day: "Day 3", weather: "⛅ Partly Cloudy", temp: "28°C", alert: null },
];

export default function Weather() {
  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Weather & Alerts 🌦️
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {forecast.map((f, idx) => (
          <Card key={idx}>
            <h2 className="text-xl font-semibold mb-2">{f.day}</h2>
            <p className="text-lg">{f.weather}</p>
            <p className="text-neutral">{f.temp}</p>

            {f.alert && (
              <div className="mt-3 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
                ⚠️ {f.alert}
                <button className="ml-3 text-primary underline text-sm">
                  Suggest Alternatives
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
