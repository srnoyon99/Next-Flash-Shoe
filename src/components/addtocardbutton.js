import React, { useState } from 'react';

const addtocardbutton = () => {
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        setIsAdded(!isAdded);
    };

    return (
        <div>
            <button 
                onClick={handleClick}
                className={`${isAdded ? 'bg-green-600 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-700' : 'bg-gray-900 hover:bg-red-800'} dark:bg-gray-700 text-white w-full py-2 h-full cursor-pointer transition duration-300`}
            >
                {isAdded ? 'Added' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default addtocardbutton;