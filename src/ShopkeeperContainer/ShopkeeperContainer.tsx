import React from "react";
import LoadoutContainer from "../LoadoutContainer/LoadoutContainer";
import ChampionsContainer from "../ChampionsContainer/ChampionsContainer";
import ItemsContainer from "../ItemsContainer/ItemsContainer";

function ShopkeeperContainer() {
  return (
    <div className="Shopkeeper-container">
      <>
        <LoadoutContainer />
        <ChampionsContainer />
        <ItemsContainer />
      </>
    </div>
  );
}

export default ShopkeeperContainer;
