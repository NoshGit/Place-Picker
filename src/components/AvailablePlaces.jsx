import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/places');
      const data = await response.json();
      setPlaces(data.places);
      setIsLoading(false);
    }

    fetchPlaces();
  }, []);

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
