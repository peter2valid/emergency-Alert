import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { SecondaryButton } from '../components/SecondaryButton';
import { theme } from '../theme/theme';
import { sendEmergencyAlert } from '../services/emergencyService';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';

type SOSScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SOS'>;

interface Props {
    navigation: SOSScreenNavigationProp;
}

export const SOSScreen: React.FC<Props> = ({ navigation }) => {
    const [isActivated, setIsActivated] = useState(false);
    const [relayCount, setRelayCount] = useState(0);
    const [smsStatus, setSmsStatus] = useState<'sent' | 'pending' | 'failed' | 'unavailable'>('pending');
    const [loading, setLoading] = useState(false);

    const holdProgress = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const startHold = () => {
        if (isActivated) return;

        Animated.timing(holdProgress, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) {
                activateEmergency();
            }
        });
    };

    const cancelHold = () => {
        holdProgress.stopAnimation();
        Animated.timing(holdProgress, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const activateEmergency = async () => {
        setLoading(true);
        setIsActivated(true);

        // Start pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        try {
            // TODO: Get actual location
            const mockLocation = { latitude: 0, longitude: 0 };
            const result = await sendEmergencyAlert(mockLocation, 'manual', 'Emergency assistance needed');

            setRelayCount(result.alert.relayCount);
            setSmsStatus(result.alert.smsStatus);

            // Show success notification
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Emergency Activated',
                textBody: `Broadcasting to ${result.alert.relayCount} devices via mesh network`,
                autoClose: 4000,
            });
        } catch (error) {
            console.error('Emergency alert error:', error);
            setSmsStatus('failed');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsActivated(false);
        pulseAnim.stopAnimation();
        pulseAnim.setValue(1);

        // Show cancellation notification
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Emergency Cancelled',
            textBody: 'SOS broadcast stopped',
            autoClose: 2000,
        });

        navigation.goBack();
    };

    const progressWidth = holdProgress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    if (isActivated) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Activated State */}
                    <Animated.View
                        style={[styles.sosActivatedContainer, { transform: [{ scale: pulseAnim }] }]}
                    >
                        <Image source={require('../../assets/icons/sos_icon.png')} style={styles.sosIconImage} resizeMode="contain" />
                    </Animated.View>

                    <Text style={styles.activatedTitle}>Emergency Alert Sent</Text>
                    <Text style={styles.activatedSubtitle}>Broadcasting to nearby devices</Text>

                    {/* Status Info */}
                    <View style={styles.statusContainer}>
                        <View style={styles.statusItem}>
                            <Text style={styles.statusLabel}>Mesh Relays</Text>
                            <Text style={styles.statusValue}>{relayCount} devices</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.statusItem}>
                            <Text style={styles.statusLabel}>SMS Fallback</Text>
                            <Text style={[styles.statusValue, styles[smsStatus]]}>
                                {smsStatus.charAt(0).toUpperCase() + smsStatus.slice(1)}
                            </Text>
                        </View>
                    </View>

                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.infoText}>
                            Your emergency alert is being relayed through the mesh network. Nearby devices will
                            be notified of your location.
                        </Text>
                    </View>

                    {/* Cancel Button */}
                    <View style={styles.buttonContainer}>
                        <SecondaryButton title="Cancel Emergency" onPress={handleCancel} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* SOS Button */}
                <View style={styles.sosButtonContainer}>
                    <TouchableOpacity
                        style={styles.sosButton}
                        onPressIn={startHold}
                        onPressOut={cancelHold}
                        activeOpacity={1}
                    >
                        <Image source={require('../../assets/icons/sos_icon.png')} style={styles.sosIconImage} resizeMode="cover" />
                    </TouchableOpacity>

                    {/* Progress Indicator */}
                    <View style={styles.progressContainer}>
                        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
                    </View>
                </View>

                {/* Instructions */}
                <Text style={styles.instructionTitle}>Emergency SOS</Text>
                <Text style={styles.instructionText}>Hold for 2 seconds to broadcast emergency alert</Text>

                {/* Info */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>What happens when activated:</Text>
                    <View style={styles.bulletPoints}>
                        <Text style={styles.bullet}>• Alert broadcasts to nearby mesh devices</Text>
                        <Text style={styles.bullet}>• Your location is shared with responders</Text>
                        <Text style={styles.bullet}>• SMS fallback sent if cellular available</Text>
                        <Text style={styles.bullet}>• Alert relays automatically through network</Text>
                    </View>
                </View>

                {/* Back Button */}
                <View style={styles.buttonContainer}>
                    <SecondaryButton title="Back to Home" onPress={() => navigation.goBack()} />
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
    content: {
        flexGrow: 1,
        paddingHorizontal: theme.layout.screenPadding,
        paddingVertical: theme.spacing.xl,
        justifyContent: 'center',
    },
    sosButtonContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing['2xl'],
    },
    sosButton: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.lg,
    },
    sosIcon: {
        fontSize: 80,
    },
    sosIconImage: {
        width: '100%',
        height: '100%',
    },
    progressContainer: {
        width: 200,
        height: 4,
        backgroundColor: theme.colors.surface,
        marginTop: theme.spacing.lg,
        borderRadius: theme.borderRadius.full,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: theme.colors.text,
    },
    instructionTitle: {
        fontSize: theme.typography.fontSizes['2xl'],
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    instructionText: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    sosActivatedContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: theme.spacing.xl,
    },
    sosActivatedIcon: {
        fontSize: 80,
    },
    activatedTitle: {
        fontSize: theme.typography.fontSizes['3xl'],
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    activatedSubtitle: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    statusContainer: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.xl,
    },
    statusItem: {
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
    },
    statusLabel: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    statusValue: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
    },
    sent: {
        color: theme.colors.success,
    },
    pending: {
        color: theme.colors.warning,
    },
    failed: {
        color: theme.colors.error,
    },
    unavailable: {
        color: theme.colors.textMuted,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
    },
    infoCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.xl,
    },
    infoTitle: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    infoText: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
    },
    bulletPoints: {
        gap: theme.spacing.sm,
    },
    bullet: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
    },
    buttonContainer: {
        marginTop: 'auto',
    },
});
