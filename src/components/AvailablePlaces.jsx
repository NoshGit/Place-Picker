import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from './../loc';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/places');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Could not fetch places.');
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            data.places,
            position.coords.latitude,
            position.coords.longitude,
          );
          setPlaces(sortedPlaces);
          setIsLoading(false);
        });

        setPlaces(data.places);
      } catch (err) {
        setError({
          title: 'An error occurred!',
          message: err.message || 'Failed to fetch places.',
        });
        setIsLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title={error.title} message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={places}
      isLoading={isLoading}
      loadingText="Fetching places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
