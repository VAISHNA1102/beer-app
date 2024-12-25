import React, { useState, useEffect } from 'react';
import './App.css';

const BeerApp = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await fetch('https://api.sampleapis.com/beers/ale');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setBeers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load beers');
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="loading-container">
      <div className="loader"></div>
      <div>Loading beers...</div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div>{error}</div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="header">
        <h1>🍺 Beer Explorer</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search your favorite beer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="beer-grid">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <div className="beer-image-container">
              <img
                src={beer.image || "/api/placeholder/400/400"}
                alt={beer.name}
                className="beer-image"
                onError={(e) => {
                  e.target.src = "/api/placeholder/400/400";
                }}
              />
            </div>
            <div className="beer-content">
              <h2 className="beer-title">{beer.name}</h2>
              <div className="beer-details">
                <span className="beer-price">💰 {beer.price || 'N/A'}</span>
                <span className="beer-rating">⭐ {beer.rating?.average || 'N/A'}</span>
              </div>
              <p className="beer-description">
                {beer.description || 'No description available'}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredBeers.length === 0 && (
        <div className="no-results">
          No beers found matching your search.
        </div>
      )}
    </div>
  );
};

export default BeerApp;