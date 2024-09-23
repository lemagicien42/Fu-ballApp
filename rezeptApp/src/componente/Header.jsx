import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Willkommen bei der Rezepte-App</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;