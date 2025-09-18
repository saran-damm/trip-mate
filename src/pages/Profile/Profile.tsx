import { useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Icon from "../../components/common/IconProvider";

export default function Profile() {
  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        Profile & Settings <Icon icon={"user" as const} className="ml-2 text-primary" />
      </h1>

      {/* User Info */}
      <Card className="shadow-card mb-6">
        <div className="flex items-center gap-4">
          <img
            src="https://source.unsplash.com/100x100/?person,portrait"
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">Uday Kiran</h2>
            <p className="text-neutral">uday@example.com</p>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-card">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Icon icon={"globe" as const} className="mr-2" /> Language
          </h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg px-3 py-3 w-full bg-white/50 border-primary/20 focus:border-primary/50 outline-none transition-all"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>French</option>
            <option>Japanese</option>
          </select>
        </Card>

        <Card className="shadow-card">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Icon icon={darkMode ? "moon" : "sun" as const} className="mr-2" /> Theme
          </h3>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 border border-primary/20">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only"
                />
                <div className={`w-10 h-5 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${darkMode ? 'transform translate-x-5' : ''}`}></div>
              </div>
              <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </label>
          </div>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card className="shadow-card">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Icon icon={"credit-card" as const} className="mr-2" /> Payment Methods
        </h3>
        <p className="text-neutral mb-3">Saved Cards:</p>
        <ul className="space-y-3 text-neutral mb-4">
          <li className="flex items-center gap-2 border-b pb-2">
            <span className="text-lg w-6 flex justify-center">
              <Icon icon={"credit-card" as const} className="text-primary" />
            </span>
            **** **** **** 1234 (Visa)
          </li>
          <li className="flex items-center gap-2 border-b pb-2 last:border-0">
            <span className="text-lg w-6 flex justify-center">
              <Icon icon={"credit-card" as const} className="text-primary" />
            </span>
            **** **** **** 9876 (MasterCard)
          </li>
        </ul>
        <div className="flex justify-end">
          <Button
            label={<>
              <Icon icon={"credit-card" as const} className="mr-2" /> Add New Card
            </>}
            variant="secondary"
            onClick={() => alert("Add new card")}
          />
        </div>
      </Card>
    </div>
  );
}
