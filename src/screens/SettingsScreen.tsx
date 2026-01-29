import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AppSettings } from '../types/types';
import { theme } from '../theme/theme';
import { getSettings, updateSettings } from '../services/emergencyService';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
    navigation: SettingsScreenNavigationProp;
}

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
    const [settings, setSettings] = useState<AppSettings>({
        backgroundModeEnabled: true,
        motionBasedSOSEnabled: false,
        alertRadiusMeters: 2000,
        demoMode: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        try {
            const currentSettings = await getSettings();
            setSettings(currentSettings);
        } catch (error) {
            console.error('Settings load error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (key: keyof AppSettings, value: boolean | number) => {
        const updatedSettings = { ...settings, [key]: value };
        setSettings(updatedSettings);

        try {
            await updateSettings({ [key]: value });
        } catch (error) {
            console.error('Settings update error:', error);
            // Revert on error
            setSettings(settings);
        }
    };

    const getRadiusLabel = () => {
        const km = settings.alertRadiusMeters / 1000;
        return `${km} km`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={styles.title}>Settings</Text>

                {/* Background Mode Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Background Operations</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Background Mode</Text>
                            <Text style={styles.settingDescription}>
                                Keep emergency network running 24/7
                            </Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>Always On</Text>
                        </View>
                    </View>

                    <Text style={styles.settingNote}>
                        🔒 Background mode is required for mesh network reliability and cannot be disabled
                    </Text>
                </View>

                {/* Emergency Features Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Emergency Features</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Motion-Based Auto SOS</Text>
                            <Text style={styles.settingDescription}>
                                Automatically detect falls or sudden impacts and trigger emergency alert
                            </Text>
                        </View>
                        <Switch
                            value={settings.motionBasedSOSEnabled}
                            onValueChange={(value) => handleToggle('motionBasedSOSEnabled', value)}
                            trackColor={{
                                false: theme.colors.disabled,
                                true: theme.colors.primary,
                            }}
                            thumbColor={theme.colors.text}
                        />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Alert Radius</Text>
                            <Text style={styles.settingDescription}>
                                Distance to broadcast emergency alerts ({getRadiusLabel()})
                            </Text>
                        </View>
                    </View>

                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderLabels}>
                            <Text style={styles.sliderLabel}>500m</Text>
                            <Text style={styles.sliderLabel}>5km</Text>
                        </View>
                        <View style={styles.sliderTrack}>
                            <View
                                style={[
                                    styles.sliderFill,
                                    {
                                        width: `${((settings.alertRadiusMeters - 500) / 4500) * 100}%`,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.sliderValue}>{getRadiusLabel()}</Text>
                    </View>
                </View>

                {/* Demo Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Demo & Testing</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Demo Mode</Text>
                            <Text style={styles.settingDescription}>
                                Simulate emergency scenarios for hackathon demonstrations
                            </Text>
                        </View>
                        <Switch
                            value={settings.demoMode}
                            onValueChange={(value) => handleToggle('demoMode', value)}
                            trackColor={{
                                false: theme.colors.disabled,
                                true: theme.colors.primary,
                            }}
                            thumbColor={theme.colors.text}
                        />
                    </View>
                </View>

                {/* App Info */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Emergency Network v1.0</Text>
                    <Text style={styles.infoText}>
                        Disaster response & emergency communication system built for hackathon MVP
                    </Text>
                    <Text style={[styles.infoText, { marginTop: theme.spacing.sm }]}>
                        Mesh networking • Offline-first • Privacy-focused
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
    title: {
        fontSize: theme.typography.fontSizes['3xl'],
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xl,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: theme.spacing.md,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    settingInfo: {
        flex: 1,
        marginRight: theme.spacing.md,
    },
    settingLabel: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    settingDescription: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    },
    statusBadge: {
        backgroundColor: theme.colors.success + '20',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.success,
    },
    statusText: {
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.success,
    },
    settingNote: {
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.textMuted,
        marginTop: theme.spacing.sm,
        lineHeight: theme.typography.fontSizes.xs * theme.typography.lineHeights.normal,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.md,
    },
    sliderContainer: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginTop: theme.spacing.md,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },
    sliderLabel: {
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.textMuted,
    },
    sliderTrack: {
        height: 4,
        backgroundColor: theme.colors.surfaceLight,
        borderRadius: theme.borderRadius.full,
        overflow: 'hidden',
    },
    sliderFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
    },
    sliderValue: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: theme.spacing.md,
    },
    infoCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginTop: theme.spacing.xl,
    },
    infoTitle: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    infoText: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    },
});
