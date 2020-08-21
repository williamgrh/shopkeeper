import React, { useContext } from "react";
import { useObserver } from "mobx-react-lite";
import { ShopkeeperContext } from "../../ShopkeeperContext";
import { Item } from "../../typings/Shopkeeper";

function ItemsDisplay() {
  const shopkeeperStore = useContext(ShopkeeperContext);

  return useObserver(() => (
    <>
      {shopkeeperStore.selectedItems.map((item: Item, index: number) => (
        <img
          key={item.name}
          src={`https://ddragon.leagueoflegends.com/cdn/${shopkeeperStore.dataDragonVersion}/img/item/${item.image.full}`}
          alt={item.name}
          onClick={() => shopkeeperStore.removeSelectedItem(index)}
        />
      ))}
    </>
  ));
}

export default ItemsDisplay;
