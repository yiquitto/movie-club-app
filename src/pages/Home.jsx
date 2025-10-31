import React, { useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';
import { showReducer, initialState } from '../state/showReducer';
import SearchBox from '../components/SearchBox';
import Filters from '../components/Filters';
import TVList from '../components/TVList';
import WatchlistPanel from '../components/WatchlistPanel';
import Pagination from '../components/Pagination';

const Home = () => {
  const [state, dispatch] = useReducer(showReducer, initialState); 
  const { query, filters, shows, currentPage, pageSize, watchlist } = state;


  // Efekt 2: Sadece watchlist değiştiğinde localStorage'a kaydet.
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Efekt 3: Sadece arama sorgusu (query) değiştiğinde API'den veri çek (debounce ile).
  useEffect(() => {
    // Eğer query boş ise 'friends' kullan, değilse query'nin kendisini kullan.
    const queryToFetch = query.trim() === '' ? 'friends' : query;

    const fetchShows = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${queryToFetch}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.map(item => item.show) });
      } catch (error) { 
        dispatch({ type: 'FETCH_FAILURE', payload: 'Veri alınırken bir hata oluştu.' });
      }
    };
    fetchShows();
  }, [query]);

  const handleRetry = () => {
     // Tekrar deneme butonu için, son sorguyu tekrar çalıştır
     const fetchShows = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.map(item => item.show) });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: 'Veri alınırken bir hata oluştu.' });
      }
    };
    fetchShows();
  }

  const filteredShows = useMemo(() => {
    return shows.filter(show => {
      const { genre, language, rating } = filters;
      const showRating = show.rating?.average || 0;
      const showGenres = show.genres?.join(' ').toLowerCase() || '';

      return (
        (genre === '' || showGenres.includes(genre.toLowerCase())) &&
        (language === '' || show.language?.toLowerCase() === language.toLowerCase()) &&
        (showRating >= rating)
      );
    });
  }, [shows, filters]);

  const paginatedShows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredShows.slice(startIndex, startIndex + pageSize);
  }, [filteredShows, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredShows.length / pageSize);

  return (
    <div className="container">
      <div>
        <SearchBox query={query} dispatch={dispatch} /> 
        <Filters dispatch={dispatch} filters={filters} /> 
        <div className="app-grid">
          <div className="main-content">
            <TVList 
              shows={paginatedShows} 
              loading={state.loading} 
              error={state.error} 
              dispatch={dispatch}
              onRetry={handleRetry}
            />
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              dispatch={dispatch} 
            />
          </div>
          <aside>
            <WatchlistPanel watchlist={watchlist} dispatch={dispatch} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
