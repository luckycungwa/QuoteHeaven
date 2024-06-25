import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {

    const handleScroll = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <div>
            <button
                className="card-btn"
                onClick={handleScroll}
            >
                <FaArrowUp size={18}/>
            </button>
        </div>
    );
}

export default ScrollToTop;
