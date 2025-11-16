import { Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

interface Props {
  maxFeaturesPerSide?: number;
  onLoadComplete?: () => void;
}

interface LimeResponse {
  prediction: number;
  probability: number;
  explanation: Record<string, number>;
}

type Item = {
  feature: string;
  value: number;     // negativo o positivo (tal cual LIME)
  absValue: number;  // magnitud para etiquetas
};

const cleanFeatureLabel = (raw: string): string => {
  const matches = raw.match(/[A-Za-z_][A-Za-z0-9_]*/g);
  if (!matches || matches.length === 0) return raw;
  // normalmente el nombre de la feature será el ÚLTIMO identificador
  return matches[matches.length - 1];
};

const API_URL = "http://0.0.0.0:8000/ml/explain_lime";

const LimeExplanationSplitChart: React.FC<Props> = ({
  maxFeaturesPerSide = 7,
  onLoadComplete,
}) => {
  const [limeData, setLimeData] = useState<LimeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Llamada al endpoint al montar el componente
  useEffect(() => {
    const fetchLimeExplanation = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL, {
          method: "POST", // o "POST" si tu endpoint lo requiere
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const json = (await res.json()) as LimeResponse;
        setLimeData(json);
        if (onLoadComplete) {
          onLoadComplete();
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Error al cargar explicación LIME");
      } finally {
        setLoading(false);
      }
    };

    fetchLimeExplanation();
  }, [onLoadComplete]);

  if (loading) return <Skeleton height="400px" variant="shine" />;
  if (error) return <div>Error al cargar explicación LIME: {error}</div>;
  if (!limeData) return null;

  // ============================
  // A partir de aquí va tu lógica
  // ============================

  const entries = Object.entries(limeData.explanation);

  const negatives: Item[] = entries
    .filter(([, v]) => v < 0)
    .map(([feature, value]) => ({
      feature,
      value, // negativo
      absValue: Math.abs(value),
    }))
    .sort((a, b) => b.absValue - a.absValue)
    .slice(0, maxFeaturesPerSide)
    .reverse(); // para que la más grande quede abajo

  const positives: Item[] = entries
    .filter(([, v]) => v > 0)
    .map(([feature, value]) => ({
      feature,
      value, // positivo
      absValue: value,
    }))
    .sort((a, b) => b.absValue - a.absValue)
    .slice(0, maxFeaturesPerSide)
    .reverse();

  const maxAbs =
    entries.length > 0
      ? Math.max(...entries.map(([, v]) => Math.abs(v)))
      : 1;

  return (
    <div
      style={{
        background: "#2e2e2e",
        padding: 20,
        color: "#ddd",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* títulos */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: "bold", color: "#6ab4ff" }}>
          Lose Product
        </div>
        <div style={{ fontSize: 28, fontWeight: "bold", color: "#ffa640" }}>
          Win Product
        </div>
      </div>

      {/* dos columnas + línea central */}
      <div style={{ display: "flex", alignItems: "stretch", height: 420 }}>
        {/* izquierda (negativos) */}
        <div style={{ flex: 1, paddingRight: 10 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={negatives}
              layout="vertical"
              margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#555"
              />
              <XAxis
                type="number"
                domain={[-maxAbs, 0]}
                hide
              />
              <YAxis
                type="category"
                dataKey="feature"
                orientation="right"
                width={200}
                tick={{ fill: "#ddd", fontSize: 12 }}
                tickFormatter={(value) => cleanFeatureLabel(value as string)}
              />
              <Tooltip
                formatter={(value: number) => value.toFixed(3)}
                labelFormatter={(label) => `Regla: ${label}`}
                contentStyle={{ backgroundColor: "#333", border: "none" }}
              />
              <Bar dataKey="value" fill="#6ab4ff">
                <LabelList
                  dataKey="absValue"
                  position="right"
                  formatter={(v) => typeof v === 'number' ? v.toFixed(2) : ''}
                  style={{ fill: "#ddd", fontSize: 12 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* derecha (positivos) */}
        <div style={{ flex: 1, paddingLeft: 10 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={positives}
              layout="vertical"
              margin={{ top: 10, right: 50, left: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#555"
              />
              <XAxis
                type="number"
                domain={[0, maxAbs]}
                hide
              />
              <YAxis
                type="category"
                dataKey="feature"
                width={200}
                tick={{ fill: "#ddd", fontSize: 14 }}
                tickFormatter={(value) => cleanFeatureLabel(value as string)}
              />
              <Tooltip
                formatter={(value: number) => value.toFixed(3)}
                labelFormatter={(label) => `Regla: ${label}`}
                contentStyle={{ backgroundColor: "#333", border: "none" }}
              />
              <Bar dataKey="value" fill="#ffa640">
                <LabelList
                  dataKey="absValue"
                  position="right"
                  formatter={(v) => typeof v === 'number' ? v.toFixed(2) : ''}
                  style={{ fill: "#ddd", fontSize: 12 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LimeExplanationSplitChart;
