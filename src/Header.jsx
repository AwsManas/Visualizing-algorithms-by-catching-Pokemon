import React from 'react';
import './css/header.css';

const Header = () => {
  return (
    <div className="header">
      <h1 className="header__title">Visulizing Graph Traversal Algorithms By Playing Pokemon</h1>
      <nav className="header__nav">
        <a href="https://github.com/AwsManas/app1">Code</a>
        <a href="https://github.com/AwsManas/app1#readme">ReadMe</a>
      </nav>
    </div>
  );
};

export default Header;