import React from 'react';
import { useParams } from 'react-router-dom';

const ReceivingComponent = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>Reset Password Page</h1>
      <p>User ID: {userId}</p>
    </div>
  );
};

export default ReceivingComponent;
