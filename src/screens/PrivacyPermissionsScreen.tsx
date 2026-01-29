import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { PrimaryButton } from '../components/PrimaryButton';
import { PermissionCard } from '../components/PermissionCard';
import { theme } from '../theme/theme';

type PrivacyPermissionsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'PrivacyPermissions'
>;

interface Props {
    navigation: PrivacyPermissionsScreenNavigationProp;
}

export const PrivacyPermissionsScreen: React.FC<Props> = ({ navigation }) => {
    const handleGrantPermissions = () => {
        // All permissions have been granted in previous screens
        // Navigate to main app
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <Text style={styles.title}>bitchat</Text>
                <Text style={styles.subtitle}>decentralized mesh messaging with end-to-end encryption</Text>

                {/* Privacy Badge */}
                <View style={styles.privacyBadge}>
                    <Image
                        source={require('../../assets/icons/privacy.png')}
                        style={styles.privacyIcon}
                        resizeMode="contain"
                    />
                    <View style={styles.privacyContent}>
                        <Text style={styles.privacyTitle}>Your Privacy is Protected</Text>
                        <View style={styles.privacyBullets}>
                            <Text style={styles.privacyBullet}>• no tracking or data collection</Text>
                            <Text style={styles.privacyBullet}>• Bluetooth mesh chats are fully offline</Text>
                            <Text style={styles.privacyBullet}>• Geohash chats use the internet</Text>
                        </View>
                    </View>
                </View>

                {/* Permissions Section */}
                <Text style={styles.sectionTitle}>permissions</Text>

                <PermissionCard
                    iconSource={require('../../assets/icons/bluetooth.png')}
                    title="Nearby Devices"
                    description="Required to discover bitchat users via Bluetooth"
                />

                <PermissionCard
                    iconSource={require('../../assets/icons/location.png')}
                    title="Precise Location"
                    description="Required by Android to discover nearby bitchat users via Bluetooth"
                    warning="bitchat does NOT track your location"
                />

                <PermissionCard
                    iconSource={require('../../assets/icons/battery.png')}
                    title="Battery Optimization"
                    description="Disable battery optimization to ensure bitchat runs reliably in the background and maintains mesh network connections"
                />

                {/* Action Button */}
                <View style={styles.buttonContainer}>
                    <PrimaryButton title="Continue to App" onPress={handleGrantPermissions} />
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
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.lg,
    },
    title: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
    },
    privacyBadge: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.primary + '40',
        marginBottom: theme.spacing.md,
    },
    privacyIcon: {
        width: 24,
        height: 24,
        marginRight: theme.spacing.sm,
    },
    privacyContent: {
        flex: 1,
    },
    privacyTitle: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    privacyBullets: {
        gap: theme.spacing.xs,
    },
    privacyBullet: {
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.primary,
        lineHeight: theme.typography.fontSizes.xs * theme.typography.lineHeights.normal,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSizes.xs,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: theme.spacing.sm,
    },
    permissionIcon: {
        fontSize: 32,
    },
    buttonContainer: {
        marginTop: theme.spacing.md,
    },
});
