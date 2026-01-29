import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Image, ImageSourcePropType } from 'react-native';
import { theme } from '../theme/theme';

interface PermissionCardProps {
    iconSource: ImageSourcePropType;
    title: string;
    description: string;
    warning?: string;
    style?: ViewStyle;
}

export const PermissionCard: React.FC<PermissionCardProps> = ({
    iconSource,
    title,
    description,
    warning,
    style,
}) => {
    return (
        <View style={[styles.card, style]}>
            <View style={styles.iconContainer}>
                <Image source={iconSource} style={styles.icon} resizeMode="contain" />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                {warning && (
                    <View style={styles.warningContainer}>
                        <Text style={styles.warningIcon}>⚠️</Text>
                        <Text style={styles.warning}>{warning}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.sm,
    },
    iconContainer: {
        marginBottom: theme.spacing.xs,
    },
    icon: {
        width: 32,
        height: 32,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    description: {
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography.fontSizes.xs * theme.typography.lineHeights.normal,
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: theme.spacing.sm,
        backgroundColor: theme.colors.surfaceLight,
        padding: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    warningIcon: {
        fontSize: theme.typography.fontSizes.sm,
        marginRight: theme.spacing.xs,
    },
    warning: {
        flex: 1,
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.warning,
        lineHeight: theme.typography.fontSizes.xs * theme.typography.lineHeights.normal,
    },
});
