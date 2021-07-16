import React from 'react';

import { basePath } from '../../config';

const classPrefix = 'search__';

const Search: React.FC = () => (
  <div className={`${classPrefix}basis`}>
    <input type="text" placeholder="Type in keyword" />
    <button>
      <span style={{ height: 30 }}>
        <img
          src={`${basePath}/assets/images/icons/search.svg`}
          alt="search"
        />
        <span style={{ lineHeight: '40px' }}>Search</span>
      </span>
    </button>
  </div>
);

export default Search;
