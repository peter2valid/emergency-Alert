export const mapTheme = {
    background: '#000000',
    danger: '#580000', // Dark Maroon
    dangerPulse: 'rgba(88, 0, 0, 0.4)',
    textSecondary: '#666666', // Muted Gray
    textPrimary: '#FFFFFF',

    // Mesh Nodes
    userNode: '#3b82f6', // Distinctive Blue for "You"
    peerNode: '#580000', // Muted Maroon for Peers (as per request "Gray or muted maroon") -> Choosing muted maroon to align with danger theme but distinct enough? User asked for "Gray or muted maroon". Let's stick to Muted Maroon as default but maybe Gray for neutral peers? 
    // Re-reading: "Gray or muted maroon dots". Let's use a muted maroon/gray blend.
    peerNodeColor: '#4a4a4a', // Dark Gray for peers to not confuse with active SOS
    nodeStroke: '#000000',

    // Links
    link: 'rgba(100, 100, 100, 0.5)', // Subtle thin lines

    // UI
    overlayBackground: 'rgba(0, 0, 0, 0.8)',
};
