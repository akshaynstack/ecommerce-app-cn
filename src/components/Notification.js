import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className="fixed right-4 top-4 bg-green-500 text-black font-semibold p-2 rounded">
      {message}
    </div>
  );
};

export default Notification;