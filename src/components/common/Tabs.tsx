import { useState } from "react";

type TabProps = {
  tabs: string[];
  children: React.ReactNode[];
};

export default function Tabs({ tabs, children }: TabProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex border-b border-light mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`px-4 py-2 ${
              i === active
                ? "text-primary border-b-2 border-primary"
                : "text-neutral hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{children[active]}</div>
    </div>
  );
}
