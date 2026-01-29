import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Circle, Marker } from 'react-native-maps';
import { mapTheme } from '../theme/colors';

interface RadiusOverlayProps {
    center: { latitude: number; longitude: number };
    radius: number; // meters
}

export const RadiusOverlay: React.FC<RadiusOverlayProps> = ({ center, radius }) => {
    return (
        <>
            {/* Semi-transparent radius circle */}
            <Circle
                center={center}
                radius={radius}
                fillColor="rgba(88, 0, 0, 0.15)"
                strokeColor={mapTheme.danger}
                strokeWidth={1}
            />

            {/* Pulsing Center Marker (SOS Source) */}
            <Marker coordinate={center} anchor={{ x: 0.5, y: 0.5 }}>
                <View style={styles.sosMarkerContainer}>
                    <View style={styles.sosMarkerCore} />
                    {/* Note: Complex animations inside Marker can be tricky on some Map providers, 
                 keeping it simple for stability */}
                </View>
            </Marker>
        </>
    );
};

const styles = StyleSheet.create({
    sosMarkerContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sosMarkerCore: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: mapTheme.danger,
        borderWidth: 2,
        borderColor: '#FFF',
    },
});
