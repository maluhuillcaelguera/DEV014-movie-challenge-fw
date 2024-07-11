import React from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void; // onClose function to handle closing the notification
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification;
