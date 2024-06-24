import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
    return (
        <div>
            <button
                className="card-btn"
                onClick={() => window.scrollTo(0, 0)}
            >
                <FaArrowUp />
            </button>
        </div>
    );
}

export default ScrollToTop;
