'use client';

import { useState, useEffect } from 'react';

export default function ApiTestPage() {
  const [healthData, setHealthData] = useState<any>(null);
  const [metricsData, setMetricsData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        // Test health endpoint
        const healthResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}/health`);
        if (healthResponse.ok) {
          const health = await healthResponse.json();
          setHealthData(health);
        }

        // Test metrics endpoint
        const metricsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}/metrics`);
        if (metricsResponse.ok) {
          const metrics = await metricsResponse.json();
          setMetricsData(metrics);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    testBackendConnection();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Configuration:</h2>
        <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
        <p>Environment: {process.env.NEXT_PUBLIC_ENVIRONMENT}</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {healthData && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <h3 className="font-semibold">Health Check ✅</h3>
          <pre>{JSON.stringify(healthData, null, 2)}</pre>
        </div>
      )}

      {metricsData && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <h3 className="font-semibold">Metrics ✅</h3>
          <pre>{JSON.stringify(metricsData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}