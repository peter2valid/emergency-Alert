/**
 * Emergency Service - Mock API for backend integration
 * 
 * TODO: Replace all functions with actual backend API calls
 */

import { EmergencyAlert, MeshPeer, SystemStatus, AppSettings } from '../types/types';

/**
 * Send emergency alert via mesh network and SMS fallback
 * TODO: replace with backend integration
 */
export const sendEmergencyAlert = async (
    location: { latitude: number; longitude: number },
    type: 'manual' | 'motion_detected' | 'other' = 'manual',
    message?: string
): Promise<{ success: boolean; alert: EmergencyAlert }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const alert: EmergencyAlert = {
        id: `alert_${Date.now()}`,
        userId: 'user_123', // TODO: Get from auth context
        location,
        timestamp: new Date(),
        type,
        message,
        relayCount: Math.floor(Math.random() * 5) + 1, // Mock relay count
        smsStatus: 'sent',
    };

    return { success: true, alert };
};

/**
 * Get nearby mesh network peers
 * TODO: replace with backend integration
 */
export const getMeshPeers = async (): Promise<MeshPeer[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock data
    const mockPeers: MeshPeer[] = [
        {
            id: 'peer_1',
            deviceName: 'Emergency Device 1',
            distance: 45,
            signalStrength: -60,
            lastSeen: new Date(),
            isRelay: true,
        },
        {
            id: 'peer_2',
            deviceName: 'Emergency Device 2',
            distance: 120,
            signalStrength: -75,
            lastSeen: new Date(Date.now() - 5000),
            isRelay: false,
        },
        {
            id: 'peer_3',
            deviceName: 'Emergency Device 3',
            distance: 200,
            signalStrength: -85,
            lastSeen: new Date(Date.now() - 10000),
            isRelay: true,
        },
    ];

    return mockPeers;
};

/**
 * Get current network status
 * TODO: replace with backend integration
 */
export const getNetworkStatus = async (): Promise<SystemStatus> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock data
    return {
        bluetooth: {
            isActive: true,
            connectedDevices: 3,
            lastUpdate: new Date(),
        },
        internet: {
            isOnline: false, // Simulating disaster scenario
            connectionType: undefined,
            lastUpdate: new Date(),
        },
        cellular: {
            isAvailable: false, // Simulating disaster scenario
            signalStrength: 0,
            carrierName: undefined,
            lastUpdate: new Date(),
        },
    };
};

/**
 * Update app settings
 * TODO: replace with backend integration (persist to local storage or backend)
 */
export const updateSettings = async (settings: Partial<AppSettings>): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // TODO: Save to local storage or backend
    console.log('Settings updated:', settings);
};

/**
 * Get current app settings
 * TODO: replace with backend integration
 */
export const getSettings = async (): Promise<AppSettings> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock default settings
    return {
        backgroundModeEnabled: true,
        motionBasedSOSEnabled: false,
        alertRadiusMeters: 2000,
        demoMode: false,
    };
};

/**
 * Get recent emergency alerts in the area
 * TODO: replace with backend integration
 */
export const getEmergencyAlerts = async (): Promise<EmergencyAlert[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock data
    return [
        {
            id: 'alert_1',
            userId: 'user_456',
            location: { latitude: 0, longitude: 0 }, // TODO: Use actual coordinates
            timestamp: new Date(Date.now() - 300000), // 5 minutes ago
            type: 'manual',
            message: 'Need assistance',
            relayCount: 4,
            smsStatus: 'sent',
        },
    ];
};
