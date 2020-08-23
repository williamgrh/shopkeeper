import React from "react";
import LoadoutContainer from "Components/LoadoutContainer/LoadoutContainer";
import ChampionsContainer from "Components/ChampionsContainer/ChampionsContainer";
import ItemsContainer from "Components/ItemsContainer/ItemsContainer";
import "./index.css";

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
