type FABProps = {
    icon: string;
    onClick: () => void;
  };
  
  export default function FAB({ icon, onClick }: FABProps) {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {icon}
      </button>
    );
  }
  