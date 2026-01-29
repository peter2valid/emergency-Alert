/**
 * Emergency Response App - Type Definitions
 */

export enum NetworkStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    ONLINE = 'online',
    OFFLINE = 'offline',
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable',
}

export interface BluetoothStatus {
    isActive: boolean;
    connectedDevices: number;
    lastUpdate: Date;
}

export interface InternetStatus {
    isOnline: boolean;
    connectionType?: 'wifi' | 'ethernet' | 'unknown';
    lastUpdate: Date;
}

export interface CellularStatus {
    isAvailable: boolean;
    signalStrength?: number;
    carrierName?: string;
    lastUpdate: Date;
}

export interface SystemStatus {
    bluetooth: BluetoothStatus;
    internet: InternetStatus;
    cellular: CellularStatus;
}

export interface EmergencyAlert {
    id: string;
    userId: string;
    location: {
        latitude: number;
        longitude: number;
    };
    timestamp: Date;
    type: 'manual' | 'motion_detected' | 'other';
    message?: string;
    relayCount: number;
    smsStatus: 'sent' | 'pending' | 'failed' | 'unavailable';
}

export interface MeshPeer {
    id: string;
    deviceName: string;
    distance?: number;
    signalStrength: number;
    lastSeen: Date;
    isRelay: boolean;
}

export interface AppSettings {
    backgroundModeEnabled: boolean;
    motionBasedSOSEnabled: boolean;
    alertRadiusMeters: number;
    demoMode: boolean;
}

export interface PermissionStatus {
    bluetooth: boolean;
    location: boolean;
    batteryOptimizationDisabled: boolean;
}

export type RootStackParamList = {
    BluetoothRequired: undefined;
    LocationPermission: undefined;
    BatteryOptimization: undefined;
    PrivacyPermissions: undefined;
    Home: undefined;
    SOS: undefined;
    Map: undefined;
    Settings: undefined;
};
