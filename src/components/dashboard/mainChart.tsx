import { Card, useColorModeValue } from "@chakra-ui/react";
import { CardData } from "../../types/lancamento";
import dynamic from "next/dynamic";
import { getLast30Days } from "../util/funcoes";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MainChart = ({ accountName, registro30Dias, cardColor }: CardData) => {
  const ultimos30dias = getLast30Days();

  registro30Dias.options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: ultimos30dias,
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      colors: [cardColor],
    },
    title: {
      text: accountName,
      align: "left",
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
      boxShadow="lg"
    >
      <ReactApexChart
        options={registro30Dias.options}
        series={registro30Dias.series}
        width={"100%"}
        height={200}
      />
    </Card>
  );
};
export default MainChart;
