import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import SidebarWithHeader from "../components/sidebar/sidebar";
import { AuthContext } from "../context/authContext";
import { parseCookies } from "nookies";
import { Flex } from "@chakra-ui/react";
import DashboardCard from "../components/dashboard/card";
import MainChart from "../components/dashboard/mainChart";
import { CardData } from "../types/lancamento";

const mockCardData: CardData[] = [
  {
    cardColor: "#C361FF",
    accountName: "Todas as contas",
    registro30Dias: {
      series: [
        {
          name: "Total do dia",
          data: [
            110, 100, 200, 250, 300, 324, 342, 342, 342, 342, 215, 334, 110,
            100, 200, 250, 300, 215, 334, 324, 342, 342, 342, 342, 234, 324,
            234, 324, 434, 600,
          ],
        },
      ],
    },
  },
  {
    cardColor: "#7B61FF",
    accountName: "Cash",
    registro30Dias: {
      series: [
        {
          name: "Total do dia",
          data: [
            110, 100, 200, 250, 300, 324, 342, 342, 342, 342, 215, 334, 110,
            100, 200, 250, 300, 215, 334, 324, 342, 342, 342, 342, 234, 324,
            234, 324, 434, 200,
          ],
        },
      ],
    },
  },

  {
    cardColor: "#007AFF",
    accountName: "Pix",
    registro30Dias: {
      series: [
        {
          name: "Total do dia",
          data: [
            110, 100, 200, 250, 300, 324, 342, 342, 342, 342, 215, 334, 110,
            100, 200, 250, 300, 215, 334, 324, 342, 342, 342, 342, 234, 324,
            234, 324, 434, 16,
          ],
        },
      ],
    },
  },
  {
    cardColor: "#00A62E",
    accountName: "Cartão",
    registro30Dias: {
      series: [
        {
          name: "Total do dia",
          data: [
            110, 100, 200, 250, 300, 324, 342, 342, 342, 342, 215, 334, 110,
            100, 200, 250, 300, 215, 334, 324, 342, 342, 342, 342, 234, 324,
            234, 324, 434, 140,
          ],
        },
      ],
    },
  },
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [mainChartData, setMainChartData] = useState<CardData>(mockCardData[0]);

  return (
    <SidebarWithHeader>
      <Flex
        width="100%"
        minH="calc(100vh - 82px)"
        flexDirection="column"
        rowGap="25px"
      >
        {/* Cards */}
        <Flex
          minH="270px"
          flexDirection={["column", "column", "column", "column", "row"]}
          rowGap="25px"
          columnGap="25px"
          alignSelf="center"
        >
          <Flex
            rowGap="25px"
            columnGap="25px"
            flexDirection={["column", "column", "row", "row", "row"]}
          >
            <DashboardCard
              cardData={{ ...mockCardData[0] }}
              setMainChartData={setMainChartData}
            />
            <DashboardCard
              cardData={{ ...mockCardData[1] }}
              setMainChartData={setMainChartData}
            />
          </Flex>
          <Flex
            rowGap="25px"
            columnGap="25px"
            flexDirection={["column", "column", "row", "row", "row"]}
          >
            <DashboardCard
              cardData={{ ...mockCardData[2] }}
              setMainChartData={setMainChartData}
            />
            <DashboardCard
              cardData={{ ...mockCardData[3] }}
              setMainChartData={setMainChartData}
            />
          </Flex>
        </Flex>
        {/* MainChart */}
        <Flex alignSelf="center" w="91%">
          <MainChart {...mainChartData}></MainChart>
        </Flex>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "caixa-simples-token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
