import React, { useEffect, useState } from 'react';
import './test.css';
const DisplayImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/images');
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          console.log('Error fetching images');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div className="image-container">
        {images.map((image) => (
          <div
            key={image.id}
            className="image-item"
            style={{ backgroundImage: `url(data:image/jpeg;base64,${image.data})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayImages;
