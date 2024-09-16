import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className=" mb-4 p-2 bg-blue-600 rounded flex items-center">
    <FontAwesomeIcon icon={faSearch} className="text-white ml-2" />
    <input
      type="text"
      placeholder="Buscar productos"
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full p-2 bg-blue-600 text-white border-none placeholder-white focus:outline-none"
    />
  </div>
  );
};

export default ProductSearch;
