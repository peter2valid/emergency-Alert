// Mock Mapbox module for web platform
// This prevents errors when bundling for web since @rnmapbox/maps is native-only

export default {
    MapView: () => null,
    Camera: () => null,
    ShapeSource: () => null,
    LineLayer: () => null,
    CircleLayer: () => null,
    setAccessToken: () => { },
};
