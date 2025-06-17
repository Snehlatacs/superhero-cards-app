// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SuperheroCard from './components/SuperheroCard';
import HeroBlogPage from './pages/HeroBlogPage';
import heroes from './heroes';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewsData, setViewsData] = useState({});

  useEffect(() => {
    const viewsObj = {};
    heroes.forEach(hero => {
      const count = localStorage.getItem(`${hero.name}-views`);
      viewsObj[hero.name] = count ? parseInt(count) : 0;
    });
    setViewsData(viewsObj);
  }, []);

  const filteredHeroes = heroes.filter(hero =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>🦸‍♂️ Superhero Cards</h1>

              <input
                type="text"
                placeholder="Search for a hero..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />

              <div className="board">
                {filteredHeroes.map((hero, index) => (
                  <Link
                    key={index}
                    to={`/hero/${hero.name}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <SuperheroCard
                      name={hero.name}
                      power={hero.power}
                      image={hero.image}
                      views={viewsData[hero.name] || 0}
                    />
                  </Link>
                ))}
              </div>
            </>
          }
        />
        <Route path="/hero/:name" element={<HeroBlogPage />} />
      </Routes>
    </div>
  );
}

export default App;
