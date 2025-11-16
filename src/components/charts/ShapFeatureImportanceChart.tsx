
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

interface Props {
  maxFeatures?: number; // por si quieres limitar al top-k
}

interface ShapGlobalResponse {
  model: string;
  global_importance: Record<string, number>;
}

const API_URL = "http://0.0.0.0:8000/ml/explain_shap_global";

const ShapFeatureImportanceChart: React.FC<Props> = ({
  maxFeatures = 14,
}) => {
  const [data, setData] = useState<ShapGlobalResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Llamada al endpoint al montar el componente
  useEffect(() => {
    const fetchShapGlobal = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const json = (await res.json()) as ShapGlobalResponse;
        setData(json);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Error al cargar SHAP global");
      } finally {
        setLoading(false);
      }
    };

    fetchShapGlobal();
  }, []);

  if (loading) return <div>Cargando SHAP global...</div>;
  if (error) return <div>Error al cargar SHAP global: {error}</div>;
  if (!data) return null;

  // 1. Pasar shap_values (objeto) a array
  const items = Object.entries(data.global_importance)
    .map(([feature, shap]) => ({
      feature,
      shap,
      importance: Math.abs(shap), // magnitud = importancia
    }))
    // 2. ordenar por importancia descendente
    .sort((a, b) => b.importance - a.importance)
    .slice(0, maxFeatures)
    // 3. invertimos para que la más importante quede abajo
    .reverse();

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        background: "#2e2e2e",
        padding: 20,
        color: "#ddd",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 10 }}>SHAP Feature Importance - media abs(|SHAP|)</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={items}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#555" />

          {/* eje X: importancia (|SHAP|) */}
          <XAxis
            type="number"
            tick={{ fill: "#ddd", fontSize: 12 }}
          />

          {/* eje Y: nombre feature */}
          <YAxis
            type="category"
            dataKey="feature"
            width={200}
            tick={{ fill: "#ddd", fontSize: 12 }}
            interval={0} 
          />

          <Tooltip
            formatter={(props: any) => {
              const { payload } = props;
              return [
                `|SHAP|: ${payload.importance.toFixed(4)} (SHAP: ${payload.shap.toFixed(
                  4
                )})`,
                "Importancia",
              ];
            }}
            labelFormatter={(label) => `Feature: ${label}`}
            contentStyle={{ backgroundColor: "#333", border: "none" }}
          />

          <Bar dataKey="importance">
            {items.map((item, idx) => (
              <Cell
                key={idx}
                // color distinto según si la contribución global es + o -
                fill={item.shap >= 0 ? "#ffa640" : "#6ab4ff"}
              />
            ))}
            <LabelList
              dataKey="importance"
              position="right"
              formatter={(v: any) => typeof v === 'number' ? v.toFixed(2) : ''}
              style={{ fill: "#ddd", fontSize: 11 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShapFeatureImportanceChart;
