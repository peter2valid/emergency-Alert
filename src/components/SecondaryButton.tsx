import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { theme } from '../theme/theme';

interface SecondaryButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: ViewStyle;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
    title,
    onPress,
    disabled = false,
    style,
}) => {
    const buttonStyle = [
        styles.button,
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
            disabled={disabled}
            activeOpacity={0.8}
        >
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
    },
    disabled: {
        borderColor: theme.colors.disabled,
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
