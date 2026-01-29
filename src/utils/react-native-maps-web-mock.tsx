import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PROVIDER_DEFAULT = 'default';
export const PROVIDER_GOOGLE = 'google';

// Mock MapView for Web
export default class MapView extends React.Component<any> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>🗺️</Text>
                <Text style={styles.text}>Map Visualization</Text>
                <Text style={styles.subtext}>Available on iOS & Android</Text>
                <Text style={styles.note}>(Web support is limited in this demo)</Text>

                {/* Render children so logic still runs but visual components might be hidden if they are nulls */}
                <View style={{ display: 'none' }}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

export const Marker = (props: any) => null;
export const Polyline = (props: any) => null;
export const Circle = (props: any) => null;
export const UrlTile = (props: any) => null;
export const Callout = (props: any) => null;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtext: {
        color: '#666666',
        fontSize: 16,
    },
    note: {
        color: '#444444',
        fontSize: 12,
        marginTop: 8,
    }
});
