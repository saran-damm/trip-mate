import TravelLoadingAnimation from './TravelLoadingAnimation';

type LoadingOverlayProps = {
  isLoading: boolean;
  message?: string;
  fullScreen?: boolean;
  children: React.ReactNode;
  transparent?: boolean;
};

export default function LoadingOverlay({
  isLoading,
  message = 'Loading...',
  fullScreen = false,
  children,
  transparent = false,
}: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  const overlayClasses = `
    ${fullScreen ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10'}
    ${transparent ? 'bg-white/80 backdrop-blur-sm' : 'bg-white'}
    flex flex-col items-center justify-center transition-all duration-300
  `;

  return (
    <div className="relative">
      {children}
      
      {isLoading && (
        <div className={overlayClasses}>
          <TravelLoadingAnimation size="md" text={message} />
        </div>
      )}
    </div>
  );
}

// Usage example:
// <LoadingOverlay isLoading={isLoading} message="Loading your trips...">
//   <YourComponent />
// </LoadingOverlay>
