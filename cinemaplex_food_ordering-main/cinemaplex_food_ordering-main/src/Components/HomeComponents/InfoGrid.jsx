import React from "react";

const InfoGrid = () => {
  return (
    <>
      <div className="items-detail-container">
        <img
          src="https://davur.dexignzone.com/frontend/images/food-icon/1.png"
          alt="total_menu"
          width={90}
          height={90}
        />

        <div className="items-detail">
          <h1>128</h1>
          <p>Total Menus</p>
        </div>
      </div>
      <div className="items-detail-container">
        <img
          src="https://davur.dexignzone.com/frontend/images/food-icon/2.png"
          alt="Revenue"
          width={90}
          height={90}
        />

        <div className="items-detail">
          <h1>400</h1>
          <p>Revenue</p>
        </div>
      </div>
      <div className="items-detail-container">
        <img
          src="https://davur.dexignzone.com/frontend/images/food-icon/3.png"
          alt="total_menu"
          width={90}
          height={90}
        />

        <div className="items-detail">
          <h1>678</h1>
          <p>Item Sold</p>
        </div>
      </div>
      <div className="items-detail-container">
        <img
          src="https://davur.dexignzone.com/frontend/images/food-icon/4.png"
          alt="total_menu"
          width={90}
          height={90}
        />

        <div className="items-detail">
          <h1>128</h1>
          <p>Total Menus</p>
        </div>
      </div>
    </>
  );
};

export default InfoGrid;
