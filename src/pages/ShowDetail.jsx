import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShowDetail.css';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // İki API isteğini aynı anda yap
        const [showResponse, episodesResponse] = await Promise.all([
          axios.get(`https://api.tvmaze.com/shows/${id}`),
          axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
        ]);
        setShow(showResponse.data);
        setEpisodes(episodesResponse.data);
      } catch (err) {
        setError('Detaylar yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const stripHtml = (html) => {
    if (!html) return '';
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message"><h3>{error}</h3></div>;
  if (!show) return null;

  const poster = show.image?.original || 'https://via.placeholder.com/400x600.png?text=No+Image';

  return (
    <div className="page-container">
      <a onClick={() => navigate(-1)} className="back-link">&larr; Geri</a>

      <div className="details-box">
        <div className="detail-grid">
          <img src={poster} alt={show.name} className="detail-poster" />
          <div className="detail-info">
            <h1>{show.name}</h1>
            <div className="detail-meta">
              {show.rating?.average && (
                <span className="tag rating-tag">⭐ {show.rating.average}</span>
              )}
              {show.language && (
                <span className="tag lang-tag">{show.language}</span>
              )}
              {show.status && (
                <span className="tag status-tag">{show.status}</span>
              )}
              {show.genres?.map(genre => (
                <span key={genre} className="tag genre-tag">{genre}</span>
              ))}
            </div>
            <div className="detail-summary">
              <h2>Özet</h2>
              <p>{stripHtml(show.summary)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="episodes-box">
        <h2>Bölümler ({episodes.length})</h2>
        <ul className="episodes-list">
          {episodes.map(ep => (
            <li key={ep.id} className="episode-item">
              <div className="episode-info">
                <span className="episode-number"># {ep.number}</span>
                <span className="episode-name">S{String(ep.season).padStart(2, '0')} · {ep.name}</span>
              </div>
              <div className="episode-meta">
                <span className="episode-airdate">{ep.airdate}</span>
                <span className="episode-runtime">{ep.runtime} dk</span>
                <a href={ep.url} target="_blank" rel="noopener noreferrer" className="source-button">
                  Kaynak
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowDetail;
