// components/NotificationItem.jsx

import React from "react";
import "../styles/NotificationItem.css"; // optional styling

const NotificationItem = ({ notification, onClick }) => {
  return (
    <div className="notification-item" onClick={() => onClick(notification)}>
      <p>
        {notification.userName} is interested in your swap request for{" "}
        {notification.haveCourse} → {notification.wantCourse}
      </p>
    </div>
  );
};

export default NotificationItem;
