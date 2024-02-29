import React from "react";
import "./Home.css";
import Graph from "../../Components/HomeComponents/Graph";
import { Box } from "@mui/material";
import InfoGrid from "../../Components/HomeComponents/InfoGrid";
import PieChartGraph from "../../Components/HomeComponents/PieChart";
import SellingItems from "../../Components/HomeComponents/SellingItems";
const Home = () => {
  return (
    <Box width={"100%"} height={"fit-content"} bgcolor={"#faf9f7"} p={"30px 33px"}>
      <Box width={"100%"} display={"flex"} gap={3}>
        <Box flex={1}>
          <Graph />
        </Box>
        <Box flex={1} display={"flex"} flexWrap={"wrap"}>
          <InfoGrid />
        </Box>
      </Box>
      <Box width={"100%"} display={"flex"} gap={4}>
        <Box flex={1}> 
          <PieChartGraph/>  
        </Box>
        <Box flex={0.98}>
          <SellingItems/>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
