import {
  Card,
  Heading,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { CardData, ChartConfig } from "../../types/lancamento";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { getLast30Days } from "../util/funcoes";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  cardData: CardData;
  setMainChartData: Dispatch<SetStateAction<CardData>>;
}

const DashboardCard = ({ cardData, setMainChartData }: Props) => {
  const mediaUltimos30Dias = Number(
    (
      cardData.registro30Dias.series[0].data.reduce(
        (acumulador, data) => data + acumulador,
        0
      ) / 30
    ).toFixed(2)
  );
  const totalHoje = cardData.registro30Dias.series[0].data.at(-1);
  const fracaoDototal = Math.round(
    (totalHoje - mediaUltimos30Dias) / (mediaUltimos30Dias / 100)
  );

  const ultimos30dias = getLast30Days();
  
  const updateMainChartData = () => {
    setMainChartData({
      ...cardData,
    });
  };

  cardData.registro30Dias.options = {
    chart: {
      type: "line",
      sparkline: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: ultimos30dias
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      colors: [cardData.cardColor],
    },
    grid: {
      show: false,
    },
  };

  return (
    <Card
      width="24%"
      border="1px solid"
      minH="100%"
      minW="230px"
      maxW="240px"
      p="16px"
      boxShadow="lg"
      display="flex"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("white", "gray.800")}
      cursor="pointer"
      onClick={updateMainChartData}
      _hover={{
        boxShadow: "xl",
        transform: "scale(1.02)",
      }}
    >
      <Heading size="sm" mb="15px">
        {cardData.accountName}
      </Heading>
      <Stat>
        <StatLabel>Média ultimos 30 dias</StatLabel>
        <StatNumber color={cardData.cardColor}>
          R$ {mediaUltimos30Dias}
        </StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Total hoje</StatLabel>
        <StatNumber color={cardData.cardColor}>R$ {totalHoje}</StatNumber>
        <StatHelpText>
          <StatArrow type={fracaoDototal > 0 ? "increase" : "decrease"} />
          {fracaoDototal + "%"}
        </StatHelpText>
      </Stat>
      <Stack>
        <ReactApexChart
          options={cardData.registro30Dias.options}
          series={cardData.registro30Dias.series}
          width={"100%"}
          height={90}
        />
      </Stack>
    </Card>
  );
};
export default DashboardCard;
