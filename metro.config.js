const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Resolve @rnmapbox/maps to empty module on web to avoid bundling errors
config.resolver = {
    ...config.resolver,
    resolveRequest: (context, moduleName, platform) => {
        // Exclude native-only libraries on web
        if (platform === 'web') {
            if (moduleName === '@rnmapbox/maps') {
                return { type: 'empty' };
            }
            if (moduleName === 'react-native-maps') {
                return {
                    filePath: require.resolve('./src/utils/react-native-maps-web-mock.tsx'),
                    type: 'sourceFile',
                };
            }
        }
        // Default resolver
        return context.resolveRequest(context, moduleName, platform);
    },
};

module.exports = config;
