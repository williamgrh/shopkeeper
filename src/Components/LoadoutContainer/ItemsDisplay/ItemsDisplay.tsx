import React from "react";
import {
  useShopkeeperState,
  useShopkeeperDispatch,
  ActionTypes,
} from "Context/ShopkeeperContext";
import { Item } from "Typings/Shopkeeper";

function ItemsDisplay() {
  const { selectedItems, dataDragonVersion } = useShopkeeperState();
  const dispatch = useShopkeeperDispatch();

  return (
    <>
      {selectedItems.map((item: Item, index: number) => (
        <img
          key={index}
          src={`https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/item/${item.image.full}`}
          alt={item.name}
          onClick={() =>
            dispatch({ type: ActionTypes.removeSelectedItem, payload: index })
          }
        />
      ))}
    </>
  );
}

export default ItemsDisplay;
