import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { theme } from '../theme/theme';
import {
    requestBatteryOptimization,
    checkBatteryOptimization,
} from '../services/permissionService';

type BatteryOptimizationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'BatteryOptimization'
>;

interface Props {
    navigation: BatteryOptimizationScreenNavigationProp;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_CARD_HEIGHT = SCREEN_HEIGHT * 0.5;

export const BatteryOptimizationScreen: React.FC<Props> = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const [checkingStatus, setCheckingStatus] = React.useState(false);
    const [optimizationDisabled, setOptimizationDisabled] = React.useState(false);

    const handleDisableOptimization = async () => {
        setLoading(true);
        try {
            const success = await requestBatteryOptimization();
            if (success) {
                setOptimizationDisabled(true);
                setTimeout(() => {
                    navigation.navigate('PrivacyPermissions');
                }, 1000);
            }
        } catch (error) {
            console.error('Battery optimization error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckStatus = async () => {
        setCheckingStatus(true);
        try {
            const isDisabled = await checkBatteryOptimization();
            setOptimizationDisabled(isDisabled);
            if (isDisabled) {
                setTimeout(() => {
                    navigation.navigate('PrivacyPermissions');
                }, 1000);
            }
        } catch (error) {
            console.error('Battery check error:', error);
        } finally {
            setCheckingStatus(false);
        }
    };

    const handleSkip = () => {
        navigation.navigate('PrivacyPermissions');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Battery Icon */}
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../../assets/icons/battery.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </View>

                {/* Title */}
                <Text style={styles.title}>Battery Optimization Detected</Text>

                {/* Explanation Card with maxHeight */}
                <View style={[styles.explanationCard, { maxHeight: MAX_CARD_HEIGHT }]}>
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled={true}
                    >
                        <View style={styles.warningContainer}>
                            <Text style={styles.warningIcon}>⚠️</Text>
                            <View style={styles.warningContent}>
                                <Text style={styles.warningTitle}>Background Execution Critical</Text>
                                <Text style={styles.warningText}>
                                    The app needs to run in the background to maintain mesh connections. Battery
                                    optimization can interrupt these connections.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.benefitsContainer}>
                            <Text style={styles.benefitsIcon}>✓</Text>
                            <View style={styles.benefitsContent}>
                                <Text style={styles.benefitsTitle}>Benefits of Disabling</Text>
                                <View style={styles.bulletPoints}>
                                    <Text style={styles.bullet}>• Reliable message delivery</Text>
                                    <Text style={styles.bullet}>• Maintains mesh connectivity</Text>
                                    <Text style={styles.bullet}>• Prevents connection drops</Text>
                                </View>
                            </View>
                        </View>

                        {optimizationDisabled && (
                            <View style={styles.successBox}>
                                <Text style={styles.successIcon}>✓</Text>
                                <Text style={styles.successText}>Battery optimization disabled successfully</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Fixed Button Footer */}
            <View style={styles.footer}>
                <PrimaryButton
                    title="Disable Battery Optimization"
                    onPress={handleDisableOptimization}
                    loading={loading}
                    disabled={optimizationDisabled}
                />
                <View style={styles.secondaryActions}>
                    <SecondaryButton
                        title="Check Again"
                        onPress={handleCheckStatus}
                        disabled={checkingStatus}
                    />
                    <SecondaryButton title="Skip for Now" onPress={handleSkip} />
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
    explanationCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.md,
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    warningIcon: {
        fontSize: theme.typography.fontSizes.xl,
        marginRight: theme.spacing.sm,
    },
    warningContent: {
        flex: 1,
    },
    warningTitle: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.warning,
        marginBottom: theme.spacing.xs,
    },
    warningText: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.sm,
    },
    benefitsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    benefitsIcon: {
        fontSize: theme.typography.fontSizes.xl,
        color: theme.colors.primary,
        marginRight: theme.spacing.sm,
    },
    benefitsContent: {
        flex: 1,
    },
    benefitsTitle: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    bulletPoints: {
        gap: theme.spacing.xs,
    },
    bullet: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.primary,
        lineHeight: theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    },
    successBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary + '20',
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        marginTop: theme.spacing.sm,
    },
    successIcon: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.primary,
        marginRight: theme.spacing.xs,
    },
    successText: {
        flex: 1,
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.primary,
    },
    footer: {
        paddingHorizontal: theme.layout.screenPadding,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    secondaryActions: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginTop: theme.spacing.md,
    },
});
