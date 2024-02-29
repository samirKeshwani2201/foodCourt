import React, { useState } from "react";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { BarChart } from "@mui/x-charts/BarChart";
import { Button, ButtonGroup } from "@mui/material";

const Graph = () => {
  const selectedWeekData = {
    Monthly: [{ data: [14, 6, 21, 8, 5, 17, 10, 25, 13] ,
    color:"#ff6d4d"
    }],
    Weekly: [{ data: [5, 8, 11, 3, 16, 7, 12, 29, 9] }],
    Today: [{ data:  [9, 12, 18, 4, 7, 22, 13, 5, 20] ,color:"#20c997"}],
  };

  const [graphData, setGraphData] = useState(selectedWeekData.Monthly);
  const [selectedGraphWeek, setSelectedGraphWeek] = useState({
    Monthly: true,
    Weekly: false,
    Today: false,
  });

  function graphClickHandler(e) {
    let ans = {};
    for (let item in selectedGraphWeek) {
      if (item == e.target.innerText) {
        ans[item] = true;
        setGraphData(selectedWeekData[item]);
      } else {
        ans[item] = false;
      }
    }
    setSelectedGraphWeek(ans);
    console.log("Index", graphData);
  }

  console.log(selectedGraphWeek);
  return (
    <div>
    
      <Box
        sx={{
          minWidth: "fit-content",
          width: "100%",
          background: "white",
          borderRadius: "6px",
          p: "5px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <Box
          margin={"10px"}
          padding={"10px"}
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
        >
          <h1
            style={{
              color: "#3D4465",
            }}
          >
            Earnings
          </h1>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              background: "#F4F6FD",
              padding: "7px",
              borderRadius: "5px",
              transition: "0.5s ease",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <span
              className={`home-bar-top-right ${
                selectedGraphWeek.Monthly ? "active" : ""
              }`}
              onClick={graphClickHandler}
            >
              Monthly
            </span>
            <span
              className={`home-bar-top-right ${
                selectedGraphWeek.Weekly ? "active" : ""
              }`}
              onClick={graphClickHandler}
            >
              Weekly
            </span>
            <span
              className={`home-bar-top-right ${
                selectedGraphWeek.Today ? "active" : ""
              }`}
              onClick={graphClickHandler}
            >
              Today
            </span>
          </Box>
        </Box> 
        <BarChart
          height={300}
          series={graphData}
          xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8], scaleType: "band" }]}
        />
      </Box>
    </div>
  );
};

export default Graph;
