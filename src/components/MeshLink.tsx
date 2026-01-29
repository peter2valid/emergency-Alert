import React from 'react';
import { Polyline } from 'react-native-maps';
import { mapTheme } from '../theme/colors';

interface MeshLinkProps {
    coordinates: { latitude: number; longitude: number }[];
}

export const MeshLink: React.FC<MeshLinkProps> = ({ coordinates }) => {
    return (
        <Polyline
            coordinates={coordinates}
            strokeColor={mapTheme.link}
            strokeWidth={1}
            geodesic={true}
        />
    );
};
