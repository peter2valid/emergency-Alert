/**
 * Custom hook for monitoring network status
 */

import { useState, useEffect } from 'react';
import { SystemStatus } from '../types/types';
import { getNetworkStatus } from '../services/emergencyService';

export const useNetworkStatus = () => {
    const [status, setStatus] = useState<SystemStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshStatus = async () => {
        try {
            setLoading(true);
            setError(null);
            const networkStatus = await getNetworkStatus();
            setStatus(networkStatus);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch network status');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshStatus();

        // Poll every 10 seconds for status updates
        const interval = setInterval(refreshStatus, 10000);

        return () => clearInterval(interval);
    }, []);

    return { status, loading, error, refreshStatus };
};
