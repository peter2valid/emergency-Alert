import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface StatusCardProps {
    title: string;
    value: string;
    status: 'active' | 'inactive' | 'online' | 'offline' | 'available' | 'unavailable';
    subtitle?: string;
    style?: ViewStyle;
}

export const StatusCard: React.FC<StatusCardProps> = ({
    title,
    value,
    status,
    subtitle,
    style,
}) => {
    const getStatusColor = () => {
        switch (status) {
            case 'active':
            case 'online':
            case 'available':
                return theme.colors.success;
            case 'inactive':
            case 'offline':
            case 'unavailable':
                return theme.colors.textMuted;
            default:
                return theme.colors.textSecondary;
        }
    };

    return (
        <View style={[styles.card, style]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.statusRow}>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
                <Text style={[styles.value, { color: getStatusColor() }]}>{value}</Text>
            </View>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    title: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: theme.borderRadius.full,
        marginRight: theme.spacing.sm,
    },
    value: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.semibold,
    },
    subtitle: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.textMuted,
        marginTop: theme.spacing.xs,
    },
});
