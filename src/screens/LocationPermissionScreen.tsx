import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { PrimaryButton } from '../components/PrimaryButton';
import { theme } from '../theme/theme';
import { requestLocationPermission } from '../services/permissionService';

type LocationPermissionScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'LocationPermission'
>;

interface Props {
    navigation: LocationPermissionScreenNavigationProp;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_CARD_HEIGHT = SCREEN_HEIGHT * 0.5; // Card can't exceed 50% of screen height

export const LocationPermissionScreen: React.FC<Props> = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);

    const handleRequestPermission = async () => {
        setLoading(true);
        try {
            const granted = await requestLocationPermission();
            if (granted) {
                navigation.navigate('BatteryOptimization');
            }
        } catch (error) {
            console.error('Location permission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Scrollable Content Area */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Location Icon */}
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../../assets/icons/location.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </View>

                {/* Title */}
                <Text style={styles.title}>Precise Location</Text>

                {/* Information Card with maxHeight and internal scroll */}
                <View style={[styles.explanationCard, { maxHeight: MAX_CARD_HEIGHT }]}>
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled={true}
                    >
                        <Text style={styles.sectionTitle}>Why is location needed?</Text>
                        <Text style={styles.explanation}>
                            Android requires location permission to discover nearby Bluetooth devices for mesh networking.
                        </Text>

                        <View style={styles.divider} />

                        <Text style={styles.sectionTitle}>Your privacy is protected</Text>
                        <View style={styles.bulletPoints}>
                            <Text style={styles.bullet}>✓ Location is NOT tracked or stored</Text>
                            <Text style={styles.bullet}>✓ Only used for Bluetooth device discovery</Text>
                            <Text style={styles.bullet}>✓ Mesh network operates fully offline</Text>
                        </View>

                        <View style={styles.warningBox}>
                            <Text style={styles.warningIcon}>🔒</Text>
                            <Text style={styles.warningText}>
                                This app does NOT collect, track, or transmit your location data
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Fixed Button Footer - Always visible */}
            <View style={styles.footer}>
                <PrimaryButton
                    title="Grant Location Permission"
                    onPress={handleRequestPermission}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    // Scrollable content area
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: theme.layout.screenPadding,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    icon: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: theme.typography.fontSizes['2xl'],
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    // Information card with constrained height
    explanationCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    explanation: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
        marginBottom: theme.spacing.sm,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.sm,
    },
    bulletPoints: {
        gap: theme.spacing.xs,
        marginBottom: theme.spacing.sm,
    },
    bullet: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.primary,
        lineHeight: theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    },
    warningBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surfaceLight,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    warningIcon: {
        fontSize: theme.typography.fontSizes.base,
        marginRight: theme.spacing.xs,
    },
    warningText: {
        flex: 1,
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.fontSizes.xs * theme.typography.lineHeights.normal,
    },
    // Fixed footer - button always visible
    footer: {
        paddingHorizontal: theme.layout.screenPadding,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
});
