import React from "react";
import ItemsContainer from "../ItemsContainer/ItemsContainer";
import ChampionsContainer from "../ChampionsContainer/ChampionsContainer";

function ShopkeeperContainer() {
  return (
    <div className="Shopkeeper-container">
      <>
        <ChampionsContainer />
        <ItemsContainer />
      </>
    </div>
  );
}

export default ShopkeeperContainer;
