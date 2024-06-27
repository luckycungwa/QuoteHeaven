import React from 'react';
import './tagList.css';

const TagList = ({ tags, onTagClick }) => {
  return (
    <div className="tag-list">
    <p>Choose your aura today</p>
    <div className='list-items'>
        {tags.map((tag, index) => (
        <button key={index} onClick={() => onTagClick(tag)} className="tag-btn" aria-label={`select ${tag} quotes`}>
          {tag}
        </button>
      ))}
    </div>
      
    </div>
  );
};

export default TagList;
