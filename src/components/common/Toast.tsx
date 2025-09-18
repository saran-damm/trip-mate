import React, { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastProps = {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  showIcon?: boolean;
};

export default function Toast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  position = 'top-right',
  showIcon = true,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  // Type-specific styling
  const typeStyles = {
    success: {
      bg: 'bg-success',
      border: 'border-success',
      text: 'text-white',
      icon: '✅',
    },
    error: {
      bg: 'bg-error',
      border: 'border-error',
      text: 'text-white',
      icon: '❌',
    },
    warning: {
      bg: 'bg-warning',
      border: 'border-warning',
      text: 'text-dark',
      icon: '⚠️',
    },
    info: {
      bg: 'bg-primary',
      border: 'border-primary',
      text: 'text-white',
      icon: 'ℹ️',
    },
  };

  const style = typeStyles[type];

  return (
    <div
      className={`
        fixed ${positionClasses[position]} z-50
        transition-all duration-300 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
    >
      <div
        className={`
          ${style.bg} ${style.text} border-l-4 ${style.border}
          px-4 py-3 rounded-card shadow-lg
          flex items-center min-w-[300px] max-w-md
        `}
      >
        {showIcon && <span className="mr-2 text-lg">{style.icon}</span>}
        <p>{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) setTimeout(onClose, 300);
          }}
          className="ml-auto text-neutral hover:text-dark"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Toast Container to manage multiple toasts
type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContainerProps = {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
};

export function ToastContainer({ position = 'top-right' }: ToastContainerProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Remove a toast by id
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className={`fixed ${position} z-50 space-y-2 p-4`}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          position={position}
        />
      ))}
    </div>
  );
}

// Create a context to use toasts throughout the app
export const ToastContext = React.createContext<{
  showToast: (message: string, type?: ToastType) => void;
}>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3300); // 3s display + 0.3s fade out
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Usage:
// 1. Wrap your app with ToastProvider
// <ToastProvider>
//   <App />
// </ToastProvider>
//
// 2. Use the useToast hook in your components
// const { showToast } = useToast();
// showToast('Trip saved successfully!', 'success');
