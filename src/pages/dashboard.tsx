import { GetServerSideProps } from "next";
import { useContext } from "react";
import SidebarWithHeader from "../components/sidebar/sidebar";
import { AuthContext } from "../context/authContext";
import { parseCookies } from "nookies";
import {
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import DashboardCard from "../components/dashboard/card";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <SidebarWithHeader>
      <Flex width="100%" minH="calc(100vh - 82px)" flexDirection="column">
        <Box
          width="100%"
          minH="calc(100vh - 82px)"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="8px"
          p="20px"
          display="flex"
          flexDirection="column"
        >
          {/* Cards */}
          <Flex
            minH="270px"
            flexDirection={["column", "column", "column", "row", "row"]}
            justifyContent="space-between"
          >
            <DashboardCard
              mediaUltimos30Dias={600}
              totalHoje={660}
              accontName="Todas as contas"
              cardColor="#C361FF"
              infoGrafico={{
                series: [
                  {
                    name: "teste",
                    data: [
                      110, 100, 200, 250, 300, 324, 342, 342, 342, 342, 215,
                      334, 110, 100, 200, 250, 300, 215, 334, 324, 342, 342,
                      342, 342, 234, 324, 234, 324, 434, 434,
                    ],
                  },
                ],
              }}
            />
            <DashboardCard
              mediaUltimos30Dias={300}
              totalHoje={250}
              accontName="Cash"
              cardColor="#7B61FF"
              infoGrafico={{
                series: [
                  {
                    name: "teste",
                    data: [
                      110, 334, 324, 342, 342, 200, 250, 300, 215, 334, 324,
                      342, 342, 342, 342, 234, 324, 434, 110, 100, 300, 215,
                      342, 234, 324, 342, 100, 200, 250, 434,
                    ],
                  },
                ],
              }}
            />
            <DashboardCard
              mediaUltimos30Dias={200}
              totalHoje={60}
              accontName="Pix"
              cardColor="#007AFF"
              infoGrafico={{
                series: [
                  {
                    name: "teste",
                    data: [
                      342, 234, 342, 342, 342, 100, 342, 342, 342, 342, 234,
                      200, 250, 300, 215, 334, 324, 324, 434, 110, 110, 100,
                      200, 250, 300, 215, 334, 324, 324, 434,
                    ],
                  },
                ],
              }}
            />
            <DashboardCard
              mediaUltimos30Dias={400}
              totalHoje={300}
              accontName="Cartão"
              cardColor="#00A62E"
              infoGrafico={{
                series: [
                  {
                    name: "teste",
                    data: [
                      250, 250, 300, 215, 334, 300, 110, 100, 200, 324, 434,
                      324, 342, 342, 342, 342, 234, 110, 342, 342, 234, 100,
                      200, 215, 334, 324, 342, 342, 324, 434,
                    ],
                  },
                ],
              }}
            />
          </Flex>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Dashboard;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { "caixa-simples-token": token } = parseCookies(ctx);

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
