import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { theme } from '../theme/theme';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'danger';
    style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    variant = 'primary',
    style,
}) => {
    const buttonStyle = [
        styles.button,
        variant === 'danger' && styles.dangerButton,
        disabled && styles.disabled,
        style,
    ].filter(Boolean);

    const textStyle = [
        styles.text,
        disabled && styles.disabledText,
    ].filter(Boolean);

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={theme.colors.text} />
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
    },
    dangerButton: {
        backgroundColor: theme.colors.accent,
    },
    disabled: {
        backgroundColor: theme.colors.disabled,
        opacity: 0.6,
    },
    text: {
        color: theme.colors.text,
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.semibold,
    },
    disabledText: {
        color: theme.colors.textMuted,
    },
});
