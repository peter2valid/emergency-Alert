import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { PrimaryButton } from '../components/PrimaryButton';
import { theme } from '../theme/theme';
import { requestBluetoothPermission } from '../services/permissionService';

type BluetoothRequiredScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'BluetoothRequired'
>;

interface Props {
    navigation: BluetoothRequiredScreenNavigationProp;
}

export const BluetoothRequiredScreen: React.FC<Props> = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);

    const handleEnableBluetooth = async () => {
        setLoading(true);
        try {
            const granted = await requestBluetoothPermission();
            if (granted) {
                navigation.navigate('LocationPermission');
            }
        } catch (error) {
            console.error('Bluetooth permission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Bluetooth Icon */}
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../../assets/icons/bluetooth.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </View>

                {/* Title */}
                <Text style={styles.title}>Bluetooth Required</Text>

                {/* Explanation */}
                <View style={styles.explanationCard}>
                    <Text style={styles.explanationTitle}>bitchat needs Bluetooth to:</Text>
                    <View style={styles.bulletPoints}>
                        <Text style={styles.bullet}>• Discover nearby users</Text>
                        <Text style={styles.bullet}>• Create mesh network connections</Text>
                        <Text style={styles.bullet}>• Send and receive messages</Text>
                        <Text style={styles.bullet}>• Work without internet or servers</Text>
                    </View>
                </View>

                {/* Primary Action */}
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        title="Enable Bluetooth"
                        onPress={handleEnableBluetooth}
                        loading={loading}
                    />
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
    content: {
        flex: 1,
        paddingHorizontal: theme.layout.screenPadding,
        justifyContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    icon: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: theme.typography.fontSizes['3xl'],
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    explanationCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing['2xl'],
    },
    explanationTitle: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.primary,
        marginBottom: theme.spacing.md,
    },
    bulletPoints: {
        gap: theme.spacing.sm,
    },
    bullet: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.primary,
        lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.relaxed,
    },
    buttonContainer: {
        marginTop: 'auto',
        paddingBottom: theme.spacing.xl,
    },
});
