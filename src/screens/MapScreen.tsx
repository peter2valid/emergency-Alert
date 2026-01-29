import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Platform, ScrollView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, EmergencyAlert, MeshPeer } from '../types/types';
import { theme } from '../theme/theme';
import { getEmergencyAlerts, getMeshPeers } from '../services/emergencyService';

// Import Mapbox differently based on platform to avoid web bundling errors
let Mapbox: any = null;
if (Platform.OS !== 'web') {
    Mapbox = require('@rnmapbox/maps').default;
}

// ✅ NO API KEY REQUIRED! Using free OpenStreetMap tiles via MapLibre
// ✅ MapLibre is open source and completely free
// ✅ Perfect for hackathon/demo - no billing, no limits

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

interface Props {
    navigation: MapScreenNavigationProp;
}

// Sample mesh network data for visualization (for demo purposes)
const MESH_NODES = [
    { id: '1', name: 'You', coordinates: [-0.1276, 51.5074], isUser: true },
    { id: '2', name: 'Peer 1', coordinates: [-0.1256, 51.5094], isUser: false },
    { id: '3', name: 'Peer 2', coordinates: [-0.1296, 51.5054], isUser: false },
    { id: '4', name: 'Alert', coordinates: [-0.1200, 51.5100], isAlert: true },
];

// Connections between mesh nodes
const MESH_CONNECTIONS = [
    { from: MESH_NODES[0].coordinates, to: MESH_NODES[1].coordinates },
    { from: MESH_NODES[0].coordinates, to: MESH_NODES[2].coordinates },
    { from: MESH_NODES[1].coordinates, to: MESH_NODES[3].coordinates },
];

export const MapScreen: React.FC<Props> = ({ navigation }) => {
    const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
    const [peers, setPeers] = useState<MeshPeer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMapData();
    }, []);

    const loadMapData = async () => {
        setLoading(true);
        try {
            const [alertsData, peersData] = await Promise.all([
                getEmergencyAlerts(),
                getMeshPeers(),
            ]);
            setAlerts(alertsData);
            setPeers(peersData);
        } catch (error) {
            console.error('Map data error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Web fallback - MapLibre doesn't work on web
    if (Platform.OS === 'web') {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.webContainer}>
                    <View style={styles.webHeader}>
                        <Text style={styles.webTitle}>🗺️ Mesh Network Map</Text>
                        <Text style={styles.webSubtitle}>
                            Interactive map available on iOS/Android app
                        </Text>
                    </View>

                    {/* Status Cards */}
                    <View style={styles.statusCards}>
                        <View style={styles.statusCard}>
                            <Image source={require('../../assets/icons/sos_icon.png')} style={styles.cardIconImage} resizeMode="contain" />
                            <Text style={styles.cardValue}>{alerts.length}</Text>
                            <Text style={styles.cardLabel}>Active Alerts</Text>
                        </View>
                        <View style={styles.statusCard}>
                            <Text style={styles.cardIcon}>📡</Text>
                            <Text style={styles.cardValue}>{peers.length}</Text>
                            <Text style={styles.cardLabel}>Mesh Peers</Text>
                        </View>
                        <View style={styles.statusCard}>
                            <Text style={styles.cardIcon}>📍</Text>
                            <Text style={styles.cardValue}>2km</Text>
                            <Text style={styles.cardLabel}>Broadcast Radius</Text>
                        </View>
                    </View>

                    {/* Mesh Network Visualization */}
                    <View style={styles.networkCard}>
                        <Text style={styles.networkTitle}>Mesh Network Topology</Text>

                        {/* Simple ASCII visualization for web */}
                        <View style={styles.networkDiagram}>
                            <Text style={styles.networkNode}>🔵 You</Text>
                            <Text style={styles.networkConnection}>   |</Text>
                            <Text style={styles.networkConnection}>   ├─── 🟢 Peer 1 ─── 🔴 Alert</Text>
                            <Text style={styles.networkConnection}>   |</Text>
                            <Text style={styles.networkConnection}>   └─── 🟢 Peer 2</Text>
                        </View>

                        <View style={styles.legendContainer}>
                            <Text style={styles.legendTitle}>Legend</Text>
                            <View style={styles.legendItems}>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: theme.colors.info }]} />
                                    <Text style={styles.legendText}>Your Location</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
                                    <Text style={styles.legendText}>Mesh Peer</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: theme.colors.error }]} />
                                    <Text style={styles.legendText}>Emergency Alert</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.webNote}>
                        <Text style={styles.noteText}>
                            💡 Install the mobile app to see the interactive map with real-time mesh network visualization
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Native platform - full MapLibre implementation
    // Create GeoJSON for mesh network connection lines
    const meshLineGeoJSON = {
        type: 'FeatureCollection' as const,
        features: MESH_CONNECTIONS.map((conn, index) => ({
            type: 'Feature' as const,
            id: `connection-${index}`,
            properties: {},
            geometry: {
                type: 'LineString' as const,
                coordinates: [conn.from, conn.to],
            },
        })),
    };

    return (
        <SafeAreaView style={styles.container}>
            <Mapbox.MapView
                style={styles.map}
                styleURL="https://demotiles.maplibre.org/style.json" // Free OSM demo style
                zoomEnabled={true}
                scrollEnabled={true}
                pitchEnabled={false}
                rotateEnabled={false}
            >
                <Mapbox.Camera
                    zoomLevel={13}
                    centerCoordinate={MESH_NODES[0].coordinates}
                    animationMode="flyTo"
                    animationDuration={2000}
                />

                {/* Mesh Connection Lines - Green lines showing network topology */}
                <Mapbox.ShapeSource id="meshLines" shape={meshLineGeoJSON}>
                    <Mapbox.LineLayer
                        id="meshLineLayer"
                        style={{
                            lineColor: theme.colors.primary,
                            lineWidth: 2,
                            lineOpacity: 0.6,
                        }}
                    />
                </Mapbox.ShapeSource>

                {/* Alert Radius Circle - Shows SOS broadcast range */}
                <Mapbox.ShapeSource
                    id="alertRadius"
                    shape={{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: MESH_NODES[0].coordinates,
                        },
                    }}
                >
                    <Mapbox.CircleLayer
                        id="radiusCircle"
                        style={{
                            circleRadius: 100,
                            circleColor: theme.colors.primary,
                            circleOpacity: 0.1,
                            circleStrokeWidth: 2,
                            circleStrokeColor: theme.colors.primary,
                            circleStrokeOpacity: 0.4,
                        }}
                    />
                </Mapbox.ShapeSource>

                {/* Mesh Nodes - Dots representing phones in the mesh network */}
                {MESH_NODES.map((node) => (
                    <Mapbox.ShapeSource
                        key={node.id}
                        id={`node-${node.id}`}
                        shape={{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: node.coordinates,
                            },
                        }}
                    >
                        <Mapbox.CircleLayer
                            id={`nodeCircle-${node.id}`}
                            style={{
                                circleRadius: node.isUser ? 10 : node.isAlert ? 12 : 8,
                                circleColor: node.isUser
                                    ? theme.colors.info
                                    : node.isAlert
                                        ? theme.colors.error
                                        : theme.colors.primary,
                                circleStrokeWidth: 2,
                                circleStrokeColor: theme.colors.text,
                                circleOpacity: 0.9,
                            }}
                        />
                    </Mapbox.ShapeSource>
                ))}
            </Mapbox.MapView>

            {/* Status Bar Overlay - Shows live network stats */}
            <View style={styles.statusBar}>
                <View style={styles.statusItem}>
                    <Image source={require('../../assets/icons/sos_icon.png')} style={styles.statusIconImage} resizeMode="contain" />
                    <Text style={styles.statusText}>{alerts.length} Active Alerts</Text>
                </View>

                <View style={styles.statusDivider} />

                <View style={styles.statusItem}>
                    <Text style={styles.statusIcon}>📡</Text>
                    <Text style={styles.statusText}>{peers.length} Mesh Peers</Text>
                </View>

                <View style={styles.statusDivider} />

                <View style={styles.statusItem}>
                    <Text style={styles.statusIcon}>📍</Text>
                    <Text style={styles.statusText}>2km Radius</Text>
                </View>
            </View>

            {/* Legend - Explains map symbols */}
            <View style={styles.legendContainer}>
                <Text style={styles.legendTitle}>Map Legend</Text>
                <View style={styles.legendItems}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: theme.colors.info }]} />
                        <Text style={styles.legendText}>Your Location</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: theme.colors.error }]} />
                        <Text style={styles.legendText}>Emergency Alert</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
                        <Text style={styles.legendText}>Mesh Peer</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    map: {
        flex: 1,
    },
    statusBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: theme.colors.surface + 'DD',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    statusIcon: {
        fontSize: 20,
    },
    statusIconImage: {
        width: 24,
        height: 24,
    },
    statusText: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.text,
        fontWeight: theme.typography.fontWeights.medium,
    },
    statusDivider: {
        width: 1,
        height: 20,
        backgroundColor: theme.colors.border,
    },
    legendContainer: {
        position: 'absolute',
        bottom: theme.spacing.lg,
        left: theme.spacing.md,
        right: theme.spacing.md,
        backgroundColor: theme.colors.surface + 'DD',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    legendTitle: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    legendItems: {
        gap: theme.spacing.sm,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textSecondary,
    },
    // Web fallback styles
    webContainer: {
        padding: theme.spacing.lg,
        alignItems: 'center',
    },
    webHeader: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    webTitle: {
        fontSize: theme.typography.fontSizes['3xl'],
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },
    webSubtitle: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    statusCards: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    statusCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
        minWidth: 120,
    },
    cardIcon: {
        fontSize: 32,
        marginBottom: theme.spacing.sm,
    },
    cardIconImage: {
        width: 40,
        height: 40,
        marginBottom: theme.spacing.sm,
    },
    cardValue: {
        fontSize: theme.typography.fontSizes['2xl'],
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    cardLabel: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textSecondary,
    },
    networkCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        width: '100%',
        maxWidth: 600,
        marginBottom: theme.spacing.lg,
    },
    networkTitle: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    networkDiagram: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
    },
    networkNode: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.text,
        fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier',
        marginVertical: theme.spacing.xs,
    },
    networkConnection: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.primary,
        fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier',
    },
    webNote: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.primary + '40',
        maxWidth: 600,
    },
    noteText: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    },
});
