import React, { useState } from 'react';

const NewsCard = ({item}) => {
      const [hideText, setHideText] = useState(false);
    return (
          <div className="news-parts-outter" key={item.id} >
            <div className="news-parts">
              <div className="news-part-image">
                <img width="226px" height="226px" src={item.img} alt="news-pic" />
              </div>
              <div className="news-part-text-outter">
                  <h4>{item.title}</h4>
                {!hideText ? <p>{item.text}</p>: <p>{item.text.slice(0,150)+"..."}</p>}
                {hideText ? <button className="text-buttons" onClick={()=>setHideText(false)}>Показать</button> : <button className="text-buttons" onClick={()=>setHideText(true)}>Скрыть</button>}
                <div className="news-little-rectangle"></div>
              </div>
            </div>
          </div>  
    );
};

export default NewsCard;