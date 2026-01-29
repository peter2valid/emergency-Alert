import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { theme } from '../theme/theme';

// Screens
import { BluetoothRequiredScreen } from '../screens/BluetoothRequiredScreen';
import { LocationPermissionScreen } from '../screens/LocationPermissionScreen';
import { BatteryOptimizationScreen } from '../screens/BatteryOptimizationScreen';
import { PrivacyPermissionsScreen } from '../screens/PrivacyPermissionsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SOSScreen } from '../screens/SOSScreen';
import { EmergencyMapScreen } from '../screens/EmergencyMapScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    // TODO: Check if user has completed onboarding
    // For now, always start with onboarding flow
    const hasCompletedOnboarding = false;

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={hasCompletedOnboarding ? 'Home' : 'BluetoothRequired'}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.border,
                    },
                    headerTintColor: theme.colors.text,
                    headerTitleStyle: {
                        fontWeight: theme.typography.fontWeights.semibold,
                    },
                    cardStyle: {
                        backgroundColor: theme.colors.background,
                    },
                }}
            >
                {/* Onboarding Screens */}
                <Stack.Screen
                    name="BluetoothRequired"
                    component={BluetoothRequiredScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LocationPermission"
                    component={LocationPermissionScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BatteryOptimization"
                    component={BatteryOptimizationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PrivacyPermissions"
                    component={PrivacyPermissionsScreen}
                    options={{ headerShown: false }}
                />

                {/* Main App Screens */}
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SOS"
                    component={SOSScreen}
                    options={{
                        title: 'Emergency SOS',
                        headerStyle: {
                            backgroundColor: theme.colors.background,
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.border,
                        },
                    }}
                />
                <Stack.Screen
                    name="Map"
                    component={EmergencyMapScreen}
                    options={{ headerShown: false }} // Full screen map
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        title: 'Settings',
                        headerStyle: {
                            backgroundColor: theme.colors.background,
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.border,
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
