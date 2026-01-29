import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import MapView, { UrlTile, PROVIDER_DEFAULT } from 'react-native-maps';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types'; // Assuming this exists from previous steps

import { mapTheme } from '../theme/colors';
import {
    USER_LOCATION,
    generateMockPeers,
    generateMockConnections,
    MOCK_ALERTS,
    MeshPeer
} from '../services/meshMock';

import { MeshNode } from '../components/MeshNode';
import { MeshLink } from '../components/MeshLink';
import { RadiusOverlay } from '../components/RadiusOverlay';

// Navigation type
type EmergencyMapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

interface Props {
    navigation: EmergencyMapScreenNavigationProp;
}

export const EmergencyMapScreen: React.FC<Props> = ({ navigation }) => {
    const [peers, setPeers] = useState<MeshPeer[]>([]);
    const [connections, setConnections] = useState<any[]>([]);

    // Simulate data loading
    useEffect(() => {
        const loadMesh = () => {
            const mockPeers = generateMockPeers(USER_LOCATION, 8); // 8 random peers
            const mockConnections = generateMockConnections(USER_LOCATION, mockPeers);
            setPeers(mockPeers);
            setConnections(mockConnections);
        };
        loadMesh();
    }, []);

    // Dark Map Style (OpenStreetMap - CartoDB Dark Matter)
    // Free, no API key required for demo usage
    const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <MapView
                provider={PROVIDER_DEFAULT} // Use default provider to support UrlTile
                style={styles.map}
                initialRegion={{
                    ...USER_LOCATION,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                mapType={Platform.OS === 'android' ? 'none' : 'standard'} // 'none' needed on Android to hide Google default layer under OSM
                rotateEnabled={false}
                pitchEnabled={false}
            >
                {/* 1. Underlying Dark Tiles */}
                <UrlTile
                    urlTemplate={TILE_URL}
                    maximumZ={19}
                    flipY={false}
                    tileSize={256}
                    zIndex={-1}
                />

                {/* 2. Mesh Connections (Lines) */}
                {connections.map((conn) => (
                    <MeshLink key={conn.id} coordinates={[conn.from, conn.to]} />
                ))}

                {/* 3. Radius Overlay (SOS) */}
                {MOCK_ALERTS.map((alert) => (
                    <RadiusOverlay
                        key={alert.id}
                        center={alert.location}
                        radius={alert.radius}
                    />
                ))}

                {/* 4. Mesh Peers (Nodes) */}
                {peers.map((peer) => (
                    <MeshNode
                        key={peer.id}
                        coordinate={peer.location}
                        label={peer.name}
                    />
                ))}

                {/* 5. User Location (You) */}
                <MeshNode
                    coordinate={USER_LOCATION}
                    isUser={true}
                    label="You"
                />

            </MapView>

            {/* UI Component: Floating Status Panel (Minimal) */}
            <SafeAreaView style={styles.overlayContainer} pointerEvents="box-none">
                <View style={styles.statusPanel}>
                    <View style={styles.statusItem}>
                        <Text style={styles.statusLabel}>MESH PEERS</Text>
                        <Text style={styles.statusValue}>{peers.length}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statusItem}>
                        <Text style={[styles.statusLabel, { color: mapTheme.danger }]}>ACTIVE SOS</Text>
                        <Text style={[styles.statusValue, { color: mapTheme.danger }]}>{MOCK_ALERTS.length}</Text>
                    </View>
                </View>

                {/* Back Button (since it's a full screen map) */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← BACK</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mapTheme.background,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    overlayContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    statusPanel: {
        flexDirection: 'row',
        backgroundColor: mapTheme.overlayBackground,
        borderRadius: 12,
        padding: 16,
        alignSelf: 'flex-end', // Top right corner
        marginTop: Platform.OS === 'android' ? 40 : 0,
        borderWidth: 1,
        borderColor: '#333',
    },
    statusItem: {
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    statusLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: mapTheme.textSecondary,
        marginBottom: 4,
    },
    statusValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: mapTheme.textPrimary,
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#444',
    },
    backButton: {
        backgroundColor: mapTheme.overlayBackground,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'flex-start', // Bottom left
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    backButtonText: {
        color: mapTheme.textSecondary,
        fontSize: 12,
        fontWeight: 'bold',
    },
});
