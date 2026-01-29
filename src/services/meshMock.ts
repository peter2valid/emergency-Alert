export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface MeshPeer {
    id: string;
    name: string;
    location: Coordinates;
    status: 'active' | 'inactive';
}

export interface MeshAlert {
    id: string;
    sourcePeerId: string;
    location: Coordinates;
    radius: number; // meters
    timestamp: number;
    active: boolean;
}

export interface Transformation {
    from: Coordinates;
    to: Coordinates;
    id: string;
}

// User starting location (Mock: Central London for demo, can be changed)
export const USER_LOCATION: Coordinates = {
    latitude: 51.5074,
    longitude: -0.1278,
};

// Generate random mock peers around a center point
export const generateMockPeers = (center: Coordinates, count: number = 5): MeshPeer[] => {
    const peers: MeshPeer[] = [];
    for (let i = 0; i < count; i++) {
        peers.push({
            id: `peer-${i}`,
            name: `Peer ${i + 1}`,
            location: {
                latitude: center.latitude + (Math.random() - 0.5) * 0.01,
                longitude: center.longitude + (Math.random() - 0.5) * 0.01,
            },
            status: 'active',
        });
    }
    return peers;
};

// Generate connections (Peer <-> Peer, User <-> Peer)
// Simple MST-like or nearest neighbor connections for visual clarity
export const generateMockConnections = (userLoc: Coordinates, peers: MeshPeer[]) => {
    const connections: { from: Coordinates; to: Coordinates; id: string }[] = [];

    // Connect user to nearest 2 peers
    peers.forEach((peer, index) => {
        if (index < 3) { // Connect to first few peers
            connections.push({
                id: `link-user-${peer.id}`,
                from: userLoc,
                to: peer.location
            });
        }

        // Chain peers
        if (index > 0) {
            connections.push({
                id: `link-${index}-${index - 1}`,
                from: peers[index].location,
                to: peers[index - 1].location
            });
        }
    });

    return connections;
};

export const MOCK_ALERTS: MeshAlert[] = [
    {
        id: 'alert-initial',
        sourcePeerId: 'peer-1',
        location: {
            latitude: 51.5090,
            longitude: -0.1260,
        },
        radius: 1200, // 1.2km
        timestamp: Date.now(),
        active: true,
    }
];
