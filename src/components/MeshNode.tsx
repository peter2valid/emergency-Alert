import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { mapTheme } from '../theme/colors';

interface MeshNodeProps {
    coordinate: {
        latitude: number;
        longitude: number;
    };
    isUser?: boolean;
    label?: string;
    onPress?: () => void;
}

export const MeshNode: React.FC<MeshNodeProps> = ({ coordinate, isUser = false, label, onPress }) => {
    return (
        <Marker coordinate={coordinate} title={label} onPress={onPress} anchor={{ x: 0.5, y: 0.5 }}>
            <View
                style={[
                    styles.node,
                    {
                        backgroundColor: isUser ? mapTheme.userNode : mapTheme.peerNodeColor,
                        width: isUser ? 16 : 12,
                        height: isUser ? 16 : 12,
                        borderRadius: isUser ? 8 : 6,
                        borderWidth: 2,
                        borderColor: isUser ? '#FFF' : mapTheme.nodeStroke,
                    },
                ]}
            />
        </Marker>
    );
};

const styles = StyleSheet.create({
    node: {
        // Styling handled dynamically
    },
});
