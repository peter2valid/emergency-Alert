# Icon Assets

This directory contains icon images used throughout the Emergency Network app.

## Icons

- **bluetooth.png** - Red Bluetooth icon used in BluetoothRequiredScreen and PermissionCard
- **location.png** - Red location/map pin icon used in LocationPermissionScreen and PermissionCard
- **battery.png** - Red battery icon used in BatteryOptimizationScreen and PermissionCard
- **privacy.png** - Privacy warning icon used in PrivacyPermissionsScreen
- **satellite.png** - Red satellite/signal icon (available for future use)

## Usage

All icons are 100x100px in the main screens and 48x48px in PermissionCard components, with `resizeMode="contain"` to maintain aspect ratio.

### Example

```tsx
<Image 
  source={require('../../assets/icons/bluetooth.png')} 
  style={{ width: 100, height: 100 }}
  resizeMode="contain"
/>
```

## Design

All icons follow the emergency response theme with red coloring (#CC0000 - #DC143C) to match the app's dark maroon aesthetic.
