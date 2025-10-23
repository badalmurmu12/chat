import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, X } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: "8px",
};

const GoogleMapView = ({ 
  latitude, 
  longitude, 
  zoom = 13 
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'dab5d4e7c25716fb',
    googleMapsApiKey: "AIzaSyAC4adI5_5XusAtEBJkleRlvVouqpWnAVw"
  });

  const [map, setMap] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const center = {
    lat: latitude,
    lng: longitude
  };

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

 
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
         <Marker
        position={center}
         
      />
    </GoogleMap>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-gray-600">Loading map...</div>
    </div>
  );
};

export default GoogleMapView;