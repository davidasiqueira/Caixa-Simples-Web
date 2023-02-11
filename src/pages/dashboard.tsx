import { GetServerSideProps } from "next";
import { useContext } from "react";
import SidebarWithHeader from "../components/sidebar/sidebar";
import { AuthContext } from "../context/authContext";
import { parseCookies } from "nookies";


const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return <SidebarWithHeader>
    
  </SidebarWithHeader>;
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