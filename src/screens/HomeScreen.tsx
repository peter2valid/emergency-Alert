import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { StatusCard } from '../components/StatusCard';
import { theme } from '../theme/theme';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const { status, loading, refreshStatus } = useNetworkStatus();

    const getBluetoothStatusText = () => {
        if (!status) return 'Unknown';
        return status.bluetooth.isActive ? 'Active' : 'Inactive';
    };

    const getInternetStatusText = () => {
        if (!status) return 'Unknown';
        return status.internet.isOnline ? 'Online' : 'Offline';
    };

    const getCellularStatusText = () => {
        if (!status) return 'Unknown';
        return status.cellular.isAvailable ? 'Available' : 'Unavailable';
    };

    const getBluetoothSubtitle = () => {
        if (!status || !status.bluetooth.isActive) return undefined;
        return `${status.bluetooth.connectedDevices} devices connected`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <View>
                        {/* Custom refresh indicator can be added here */}
                    </View>
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Emergency Network</Text>
                        <Text style={styles.subtitle}>System Status</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')} activeOpacity={0.7}>
                        <Text style={styles.settingsIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                {/* Network Status Banner */}
                <View style={styles.statusBanner}>
                    <View style={styles.statusIndicator} />
                    <Text style={styles.statusText}>Emergency network running in background</Text>
                </View>

                {/* System Status Cards */}
                <View style={styles.statusCardsContainer}>
                    <StatusCard
                        title="Bluetooth Mesh"
                        value={getBluetoothStatusText()}
                        status={status?.bluetooth.isActive ? 'active' : 'inactive'}
                        subtitle={getBluetoothSubtitle()}
                        style={styles.statusCard}
                    />

                    <StatusCard
                        title="Internet"
                        value={getInternetStatusText()}
                        status={status?.internet.isOnline ? 'online' : 'offline'}
                        style={styles.statusCard}
                    />

                    <StatusCard
                        title="Cellular"
                        value={getCellularStatusText()}
                        status={status?.cellular.isAvailable ? 'available' : 'unavailable'}
                        style={styles.statusCard}
                    />
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <TouchableOpacity
                        style={styles.sosButton}
                        onPress={() => navigation.navigate('SOS')}
                        activeOpacity={0.8}
                    >
                        <Image source={require('../../assets/icons/sos_icon.png')} style={styles.sosButtonIconImage} resizeMode="contain" />
                        <Text style={styles.sosButtonText}>Emergency SOS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.mapButton}
                        onPress={() => navigation.navigate('Map')}
                        activeOpacity={0.8}
                    >
                        <Image source={require('../../assets/icons/location.png')} style={styles.mapButtonIconImage} resizeMode="contain" />
                        <Text style={styles.mapButtonText}>View Map</Text>
                    </TouchableOpacity>
                </View>

                {/* Info Section */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>How it works</Text>
                    <Text style={styles.infoText}>
                        Your device is connected to a mesh network of nearby emergency responders. Messages are
                        relayed peer-to-peer without internet or cell towers.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: theme.layout.screenPadding,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing['2xl'],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography.fontSizes['2xl'],
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text,
    },
    subtitle: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    settingsIcon: {
        fontSize: 28,
    },
    statusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.success + '40',
        marginBottom: theme.spacing.xl,
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.success,
        marginRight: theme.spacing.md,
    },
    statusText: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.success,
        fontWeight: theme.typography.fontWeights.medium,
    },
    statusCardsContainer: {
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    statusCard: {
        // Additional styles if needed
    },
    quickActionsContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    sosButton: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    sosButtonIcon: {
        fontSize: 32,
        marginBottom: theme.spacing.sm,
    },
    sosButtonIconImage: {
        width: 40,
        height: 40,
        marginBottom: theme.spacing.sm,
    },
    sosButtonText: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
    },
    mapButton: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    mapButtonIcon: {
        fontSize: 32,
        marginBottom: theme.spacing.sm,
    },
    mapButtonIconImage: {
        width: 40,
        height: 40,
        marginBottom: theme.spacing.sm,
    },
    mapButtonText: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
    },
    infoCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    infoTitle: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    infoText: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
    },
});
