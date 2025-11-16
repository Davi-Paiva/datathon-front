import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

interface PdpExplanation {
  feature_type: string;
  grids: number[];
  pdp_values: number[];
  pdp_avg: [number, number][];
}

export interface PdpResponse {
  Model: string;
  prediction: number;
  probability: number;
  pdp_explanation: PdpExplanation;
}

interface PdpChartProps {
  feature: string;
  height?: number;
}

const API_URL = "http://localhost:8000/ml/explain_pdp";

const PdpChart: React.FC<PdpChartProps> = ({ feature, height = 360 }) => {
  const [pdpData, setPdpData] = useState<PdpResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdp = async () => {
      try {
        setLoading(true);
        setError(null);
        setPdpData(null);

        // 👇 Mandamos feature como query param: ?feature=cust_hitrate
        const url = `${API_URL}?feature_to_analyze=${encodeURIComponent(feature)}`;

        const res = await fetch(url, {
          method: "POST", // o "POST" si tu backend lo tiene como POST, pero sin body
        });

        if (!res.ok) {
          // Intentamos leer el detalle del backend
          let detail = "";
          try {
            const errJson = await res.json();
            detail = errJson.detail ? ` - ${JSON.stringify(errJson.detail)}` : "";
          } catch {
            // ignore
          }
          throw new Error(`Error HTTP ${res.status}${detail}`);
        }

        const json = (await res.json()) as PdpResponse;
        setPdpData(json);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Error al cargar PDP");
      } finally {
        setLoading(false);
      }
    };

    if (feature) {
      fetchPdp();
    }
  }, [feature]);

  if (!feature) {
    return <div style={{ color: "#ddd" }}>Selecciona una feature para ver el PDP.</div>;
  }

  if (loading) {
    return <div style={{ color: "#ddd" }}>Cargando PDP de {feature}...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "salmon" }}>
        Error al cargar PDP de {feature}: {error}
      </div>
    );
  }

  if (!pdpData) return null;

  const { feature_type, pdp_avg } = pdpData.pdp_explanation;

  const chartData = pdp_avg.map(([featureValue, pdp]) => ({
    featureValue,
    pdp,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: 360,
        background: "#2e2e2e",
        padding: 20,
        color: "#ddd",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        borderRadius: 8,
      }}
    >
      <h2 style={{ marginBottom: 4 }}>PDP - {feature_type}</h2>
      <p style={{ marginBottom: 16, fontSize: 12, color: "#aaa" }}>
        Relación parcial entre <strong>{feature_type}</strong> y la probabilidad
        predicha (PDP).
      </p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 70, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />

          <XAxis
            dataKey="featureValue"
            tick={{ fill: "#ddd", fontSize: 11 }}
            tickFormatter={(value) => Number(value).toFixed(1)}
            label={{
              value: feature_type,
              position: "insideBottom",
              offset: -10,
              fill: "#ddd",
              fontSize: 12,
            }}
          />

          <YAxis
            tick={{ fill: "#ddd", fontSize: 11 }}
            label={{
              value: "PDP (predicción media)",
              angle: -90,
              position: "insideLeft",
              fill: "#ddd",
              fontSize: 12,
            }}
          />

          <Tooltip
            contentStyle={{ backgroundColor: "#333", border: "none" }}
            labelFormatter={(label) =>
              `${feature_type} = ${Number(label).toFixed(3)}`
            }
            formatter={(value: any) => [
              Number(value).toFixed(4),
              "PDP (predicción media)",
            ]}
          />

          <ReferenceLine
            y={0.5}
            stroke="#888"
            strokeDasharray="4 4"
            ifOverflow="extendDomain"
          />

          <Line
            type="monotone"
            dataKey="pdp"
            stroke="#ffa640"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PdpChart;
