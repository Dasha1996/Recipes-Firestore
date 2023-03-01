import './SearchBar.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [term, setTerm] = useState('');
    const navigation = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        //redirect users to the search page with q parameter which includes search term
        navigation(`/search?q=${term}`)

    }
  return (
    <div className="searchbar">
    <form onSubmit= {handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
            type = "text"
            id = "search"
            onChange={(e) => setTerm(e.target.value)}
            required>

        </input>

    </form>
      
    </div>
  )
}
