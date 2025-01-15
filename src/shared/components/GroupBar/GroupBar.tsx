import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { useAppThemeContext } from "../../contexts";
// Defina o tipo dos dados do gráfico
type ChartData = {
  categoria: string;
  total: number;
};

interface FullScreenBarChartProps {
  data: ChartData[]; // Propriedade 'data' é um array do tipo 'ChartData'
}

export const FullScreenBarChart: React.FC<FullScreenBarChartProps> = ({
  data,
}) => {
  // Agora chamamos o hook dentro do componente
  const { themeName } = useAppThemeContext();

  return (
    <Box
      marginX={2}
      sx={{
        width: "96%",
        height: "30vh", // Ajuste o tamanho para 60% da altura da tela
        padding: 2,
        backgroundColor: themeName === "dark" ? "#303134" : "#ffffff",
        borderRadius: 2,
      }}
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="categoria" />
          <YAxis />
          <Tooltip accessibilityLayer />
          <Bar dataKey="total" fill="#8884d8" barSize={70} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
