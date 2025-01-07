import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/app.css';

export const PhotoPage = () => {
  const location = useLocation();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('url');
    if (url) {
      setPhotoUrl(url);
    }
  }, [location]);

  return (
    <div className="fullscreen">
      {photoUrl ? (
        <img src={photoUrl} alt="Full Screen" className="fullscreen-image" />
      ) : (
        <p>No photo URL provided in the query string.</p>
      )}
    </div>
  );
};
