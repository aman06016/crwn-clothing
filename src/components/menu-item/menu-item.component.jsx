import React from 'react';
import './menu-item.style.scss';

const MenuItem = ({title,imageUrl,size}) => {
    return (
        <div className={`${size} menu-item`}>

            <div className="background-image" style={{ backgroundImage : `url(${imageUrl}` }} />
            <div class="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">Shop Now</span>
            </div>
         </div>
    );
}

export default MenuItem;