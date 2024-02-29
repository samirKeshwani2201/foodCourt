import { Box } from "@mui/material";

import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const SellingItems = () => {
  const data = [
    {
      name: "Italian pizza",
      total_items_sold: 124,
      image: "https://davur.dexignzone.com/frontend/images/dish/pic5.jpg",
      price: 12.56,
    },
    {
      name: "Cheese Momos",
      total_items_sold: 116,
      image: "https://davur.dexignzone.com/frontend/images/dish/pic4.jpg",
      price: 12.56,
    },
    {
      name: "French fries",
      total_items_sold: 200,
      image: "https://davur.dexignzone.com/frontend/images/dish/pic3.jpg",
      price: 12.56,
    },
    {
      name: "Cheese Sandwich",
      total_items_sold: 50,
      image: "https://davur.dexignzone.com/frontend/images/dish/pic2.jpg",
      price: 12.56,
    },
  ];

  return (
    <div>
      <Box
        sx={{
          minWidth: "fit-content",
          width: "98.5%",
          background: "white",
          borderRadius: "6px",
          p: "5px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          padding: "1.5rem 1.875rem 1.25rem",
        }}
      >
        <h1 className="selling-items-header">Top Selling Items</h1>

        <Box display={"flex"} flexDirection={"column"}>
          {data.map((item) => {
            return (
              <div className="selling-items">
                <img src={item.image} alt={item.name} width={85} />
                <div className="selling-items-details">
                  <div className="selling-items-description">
                    <h1>{item.name}</h1>
                    <p>{`${item.total_items_sold} times`} </p>
                  </div>
                  <div className="selling-items-price">
                    <p>${item.price}</p>
                  </div>
                </div>
                <div className="selling-items-action">
                  <MoreHorizIcon />
                </div>
              </div>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default SellingItems;
