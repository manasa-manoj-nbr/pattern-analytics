import { useState, useEffect, useCallback } from 'react';
import type { TopFailuresResponse, FailureCategory } from '../types';

const API_BASE = 'http://localhost:3001/api';

interface UseTopFailuresResult {
  data: FailureCategory[];
  customerName: string | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refetch: () => void;
}

export function useTopFailures(customerId: number): UseTopFailuresResult {
  const [data, setData] = useState<FailureCategory[]>([]);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData([]);
    setCustomerName(null);

    try {
      const res = await fetch(
        `${API_BASE}/analytics/top-failures/${customerId}`
      );
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const json: TopFailuresResponse = await res.json();
      setData(json.data);
      setCustomerName(json.customerName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    customerName,
    loading,
    error,
    isEmpty: !loading && !error && data.length === 0,
    refetch: fetchData,
  };
}
