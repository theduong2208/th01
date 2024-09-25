import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  // Function to fetch images from Pixabay
  const fetchImages = async () => {
    const apiKey = '46166847-40e887f0f1cbd269c98d3b401'; // Your Pixabay API key
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query.trim()}&image_type=photo`;
    
    try {
      const response = await axios.get(url);
      setImages(response.data.hits); // hits contains the image results
    } catch (error) {
      console.error("Error fetching the images", error);
    }
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchImages();
    }
  };

  return (
    <div>
      <h1>Tìm kiếm hình ảnh</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for images..."
        />
        <button type="submit">Tìm</button>
      </form>
      
      {/* Display images */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '20px' }}>
        {images.length > 0 && images.map((image) => (
          <div key={image.id}>
            <img src={image.webformatURL} alt={image.tags} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
