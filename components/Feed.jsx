'use client';

import React, {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({prompts}) => {
  return(
    <div className='mt-16 prompt_layout'>
      {
        prompts.map((prompt) => (
          <PromptCard
             key={prompt._id}
             prompt={prompt}
          />
        ))
      }
    </div>    
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [prompts, setPrompts] = useState([]);

  useEffect(()=> {
    const getPrompts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPrompts(data);
    };
    getPrompts();
  }, []);  

  const handleSearchChange = (e) => {

  }

  console.log(prompts)

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList prompts={prompts}></PromptCardList>
    </section>
  );
}

export default Feed
