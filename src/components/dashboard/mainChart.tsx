import {
  Card,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChartConfig } from "../../types/lancamento";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  accontName: string;
  mediaUltimos30Dias: number;
  totalHoje: number;
  infoGrafico: ChartConfig;
  cardColor: string;
}

const MainChart = ({
  accontName,
  infoGrafico,
  cardColor,
}: Props) => {

  infoGrafico.options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      show: false,
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      colors: [cardColor],
    },
    title: {
      text: accontName,
      align: 'left'
    },
    grid: {
      show: false,
    },
  };

  return (
    <Card
      width="100%"
      border="1px solid"
      minH="100%"
      minW="240px"
      p="16px"
      display="flex"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("white", "gray.800")}
    >
      
        <ReactApexChart
          options={infoGrafico.options}
          series={infoGrafico.series}
          width={"100%"}
          height={200}
        />
    </Card>
  );
};
export default MainChart;
