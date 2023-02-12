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

const DashboardCard = ({
  accontName,
  mediaUltimos30Dias,
  totalHoje,
  infoGrafico,
  cardColor,
}: Props) => {
  let fracaoDototal = Math.round(
    (totalHoje - mediaUltimos30Dias) / (mediaUltimos30Dias / 100)
  );

  infoGrafico.options = {
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
      borderColor={useColorModeValue("gray.200", "gray.700")}
      minH="100%"
      minW='230px'
      maxW='240px'
      bg={useColorModeValue("gray.100", "gray.900")}
      p="16px"
      display='flex'
    >
      <Heading size="sm" mb='15px'>{accontName}</Heading>
      <Stat>
        <StatLabel>Média ultimos 30 dias</StatLabel>
        <StatNumber color={cardColor}>R$ {mediaUltimos30Dias}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Total hoje</StatLabel>
        <StatNumber color={cardColor}>R$ {totalHoje}</StatNumber>
        <StatHelpText>
          <StatArrow type={fracaoDototal > 0 ? "increase" : "decrease"} />
          {fracaoDototal}
        </StatHelpText>
      </Stat>
      <Stack>
      <ReactApexChart
            options={infoGrafico.options}
            series={infoGrafico.series}
            width={"100%"}
            height={90}
          />
      </Stack>
    </Card>
  );
};
export default DashboardCard;
