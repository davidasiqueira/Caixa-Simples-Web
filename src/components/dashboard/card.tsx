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
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DashboardCard = ( { accountName, registro30Dias, cardColor }: CardData) => {
  
  const mediaUltimos30Dias = Number(
    (
      registro30Dias.series[0].data.reduce(
        (acumulador, data) => data + acumulador,
        0
      ) / 30
    ).toFixed(2)
  );
  const totalHoje = registro30Dias.series[0].data.at(-1);
  const fracaoDototal = Math.round(
    (totalHoje - mediaUltimos30Dias) / (mediaUltimos30Dias / 100)
  );

  registro30Dias.options = {
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
      show: false,
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      colors: [cardColor],
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
      display="flex"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Heading size="sm" mb="15px">
        {accountName}
      </Heading>
      <Stat>
        <StatLabel>Média ultimos 30 dias</StatLabel>
        <StatNumber color={cardColor}>R$ {mediaUltimos30Dias}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Total hoje</StatLabel>
        <StatNumber color={cardColor}>R$ {totalHoje}</StatNumber>
        <StatHelpText>
          <StatArrow type={fracaoDototal > 0 ? "increase" : "decrease"} />
          {fracaoDototal + "%"}
        </StatHelpText>
      </Stat>
      <Stack>
        <ReactApexChart
          options={registro30Dias.options}
          series={registro30Dias.series}
          width={"100%"}
          height={90}
        />
      </Stack>
    </Card>
  );
};
export default DashboardCard;
