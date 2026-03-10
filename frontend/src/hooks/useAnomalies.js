import { useState, useEffect } from 'react';
import { fetchAnomalies } from '../services/api';

export const useAnomalies = (limit = 10) => {
    const [anomalies, setAnomalies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAnomalies = async () => {
            try {
                setLoading(true);
                const result = await fetchAnomalies(limit);
                setAnomalies(result);
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to fetch anomalies');
            } finally {
                setLoading(false);
            }
        };
        loadAnomalies();
    }, [limit]);

    return { anomalies, loading, error };
};
