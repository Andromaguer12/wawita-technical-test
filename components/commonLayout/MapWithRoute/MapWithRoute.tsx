// components/MapWithRoute.tsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapWithRouteProps {
  initialPoint: Coordinate;
  finalPoint: Coordinate;
}

const libraries = ['places'] as const;

const MapWithRoute: React.FC<MapWithRouteProps> = ({ initialPoint, finalPoint }) => {
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [googleLoaded, setGoogleLoaded] = useState<boolean>(false);


  useEffect(() => {
    if (window.google) {
      setGoogleLoaded(true);
    }
  }, []);

  const onLoadMap = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const calculateRoute = () => {
    if (googleLoaded && map) {
      const directionsServiceOptions: google.maps.DirectionsRequest = {
        origin: initialPoint,
        destination: finalPoint,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(directionsServiceOptions, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      });
    }
  };

  useEffect(() => {
    calculateRoute();
  }, [map, googleLoaded]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        center={initialPoint}
        zoom={14}
        onLoad={onLoadMap}
      >
        <Marker position={initialPoint} label="Start" />
        <Marker position={finalPoint} label="End" />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithRoute;
