import { useToast } from '../common/Toast';
import Button from '../common/Button';
import Card from '../common/Card';

export default function ToastDemo() {
  const { showToast } = useToast();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Toast Notifications Demo</h2>
      <p className="text-neutral mb-6">
        Click the buttons below to see different types of toast notifications.
      </p>
      
      <div className="flex flex-wrap gap-3">
        <Button
          label="Success Toast"
          variant="success"
          onClick={() => showToast('Trip saved successfully!', 'success')}
        />
        
        <Button
          label="Error Toast"
          variant="secondary"
          onClick={() => showToast('Failed to save trip. Please try again.', 'error')}
        />
        
        <Button
          label="Warning Toast"
          variant="accent"
          onClick={() => showToast('Your session will expire soon.', 'warning')}
        />
        
        <Button
          label="Info Toast"
          variant="primary"
          onClick={() => showToast('New feature available: Trip sharing!', 'info')}
        />
      </div>
    </Card>
  );
}
