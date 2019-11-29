import React from 'react'

const SearchDataList = ({ list }) => {
  const optionsList = list.map((item, index) => (
    <option key={index}>{item}</option>
  ));

  return (
    <datalist id="searchHistory">{optionsList}</datalist>
  );
}

export default SearchDataList
