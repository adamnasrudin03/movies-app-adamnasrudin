import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieItem, Button, Gap, Input, Filter } from "../../components";
import { findAll } from "../../actions/movies";
import "./home.scss";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { dataMovie, page } = useSelector((state) => state.findMovies);

  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const movies = [];
    const promises = new Array(20)
      .fill()
      .map((v, i) => fetch(`http://localhost:8000/api/v1/movies/${i + 1}`));
    Promise.all(promises).then((rest) => {
      return rest.map((value) =>
        value
          .json()
          .then(({ data: { title: data } }) => movies.push({ title: data }))
      );
    });
    setOptions(movies);
    dispatch(findAll(search, filter, currentPage, perPage));
  }, [search, filter, currentPage, perPage, dispatch]);

  const previous = () => {
    setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1);
  };

  const next = () => {
    setCurrentPage(
      currentPage === page.totalPage ? page.totalPage : currentPage + 1
    );
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updateSearch = (title) => {
    setSearch(title);
    setDisplay(false);
  };

  return (
    <div className="home-page-wrapper">
      <div ref={wrapperRef} className="search-wrapper ">
        <Input
          placeholder="What movie title are you looking for?"
          id={"auto"}
          value={search}
          onClick={() => setDisplay(!display)}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />

        {display && (
          <div className="autoContainer">
            {options
              .filter(({ title }) => title.indexOf(search.toLowerCase()) > 0)
              .map((value, i) => {
                return (
                  <div
                    onClick={() => updateSearch(value.title)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <span>{value.title}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="filter">
        <Filter
          label={"Data Per Page"}
          title={"dataPerPage"}
          change={perPage}
          onClick={(event) => {
            setPerPage(event.target.value);
          }}
        />
        <Filter
          label={"Filter by year"}
          title={"year"}
          change={filter}
          onClick={(event) => {
            setFilter(event.target.value);
          }}
        />
      </div>

      <div className="content-wrapper">
        {dataMovie.map((data) => {
          const year = new Date(data.showTime).getFullYear();
          const month = new Date(data.showTime).getMonth();
          const date = new Date(data.showTime).getDate();
          const hours = new Date(data.showTime).getHours();
          const minutes = new Date(data.showTime).getMinutes();
          const seconds = new Date(data.showTime).getSeconds();

          const getShowTime = `${year}-${month}-${date} , ${hours}:${minutes}:${seconds} `;
          return (
            <MovieItem
              key={data.id}
              image={data.image}
              title={data.title}
              like={data.like}
              showTime={getShowTime}
              id={data.id}
            />
          );
        })}
      </div>
      <div className="pagination">
        <Button title="Previous" onClick={previous} />
        <Gap width={20} />
        <p className="text-page">
          {page.currentPage} / {page.totalPage}
        </p>
        <Gap width={20} />
        <Button title="Next" onClick={next} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default Home;
