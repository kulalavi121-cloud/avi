import { useState, useEffect } from 'react';
import { fetchWWTPData } from '../services/api';

export const useWWTPData = (skip = 0, limit = 100) => {
    const [data, setData] = useState({ total: 0, items: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const result = await fetchWWTPData(skip, limit);
                setData(result);
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [skip, limit]);

    return { data, loading, error };
};
