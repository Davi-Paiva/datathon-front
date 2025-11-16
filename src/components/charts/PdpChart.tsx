import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const API_URL = "http://0.0.0.0:8000/ml/pdp";

// Type returned by backend PDP
interface PdpPoint {
  x: number;
  y: number; 
}

// Props your component receives
interface PDPProps {
  feature: number | string;   // what you send to the backend
}

const PDPChart: React.FC<PDPProps> = ({ feature }) => {
  const [data, setData] = useState<PdpPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch PDP on mount + when feature changes
  useEffect(() => {
    const fetchPDP = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feature }),
        });

        if (!res.ok) {
          throw new Error("Backend returned HTTP " + res.status);
        }

        const json = await res.json();
        setData(json); // Should be an array of points: [{x,y},...]
      } catch (err: any) {
        setError(err.message || "Error fetching PDP");
      } finally {
        setLoading(false);
      }
    };

    fetchPDP();
  }, [feature]);

  if (loading) return <div>Loading PDP…</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No PDP data</div>;

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />

          {/** PDP bar chart */}
          <Bar dataKey="y" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PDPChart;
