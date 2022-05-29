import axios from "axios";
import React, { useEffect, useState } from "react";
import "./News.css"
import NewsCard from "./NewsCard";

const News = () => {
  const [photos, setPhotos] = useState([])
  const[currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  useEffect(() => {
    if (fetching) {
      axios.get(`http://localhost:8000/news?_limit=8&_page=${currentPage}`)
        .then(response => {
           setPhotos(prev => [...prev, ...response.data])
           setCurrentPage(prevState => prevState + 1)
           setTotalCount(response.headers['x-total-count'])
         })
        .finally(()=>setFetching(false))
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener("scroll",scrollHandler)
    return function () {
        document.removeEventListener("scroll", scrollHandler)
    }
  }, [fetching])
  
  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && photos.length < totalCount) {
      setFetching(true)
    }
  }
  return (
    <div className="news-main-div">
      <div className="container">
        <p className="news-main-title">Новости</p>
        {photos.map((item) => (
          <NewsCard item={item} key={item.id}/>
          ))}
      </div>
    </div>
  );
};

export default News;
