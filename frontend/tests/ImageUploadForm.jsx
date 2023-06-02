import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Data, setBase64Data] = useState(null);

  const navigateTo = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const convertToBase64 = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const base64 = dataUrl.split(',')[1];
        setBase64Data(base64); // Store the base64 data in the state variable
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (base64Data) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/images/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: base64Data }),
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
            navigateTo('../images-uploaded');
        } else {
          console.log('Error uploading image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Automatically convert to base64 when a file is selected
  if (selectedFile) {
    convertToBase64();
  }

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploadForm;
