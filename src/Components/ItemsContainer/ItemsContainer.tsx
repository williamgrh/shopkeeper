import React from "react";
import axios from "axios";
import {
  useShopkeeperState,
  useShopkeeperDispatch,
  ActionTypes,
} from "Context/ShopkeeperContext";
import { Item } from "Typings/Shopkeeper";

interface ItemsData {
  [itemId: string]: Item;
}

const hiddenItemsList = [
  "2419", // Commencing Stopwatch
  "2421", // Broken Stopwatch
  "2424", // Broken Stopwatch
  "3042", // Muramana (duplicate)
  "3599", // Black Spear
  "3600", // Black Spear
  "3671", // Enchantment: Warrior (boots)
  "3672", // Enchantment: Cinderhulk (boots)
  "3673", // Enchantment: Runic Echoes (boots)
  "3675", // Enchantment: Bloodrazor (boots)
];

function ItemsContainer() {
  const { dataDragonVersion } = useShopkeeperState();
  const dispatch = useShopkeeperDispatch();
  const [items, setItems] = React.useState<ItemsData>({});
  React.useEffect(() => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/en_US/item.json`
      )
      .then((res) => setItems(res.data.data));
  }, [dataDragonVersion]);

  // TODO: filter in champ specific items when they're selected

  return (
    <div>
      {Object.keys(items).map((itemId) => {
        const { name, image, maps, consumed, tags } = items[itemId];

        if (
          maps["11"] !== true ||
          consumed === true ||
          tags.includes("Consumable") || // TODO: elixirs
          tags.includes("Trinket") || // TODO: elixirs
          name.includes("(Quick Charge)") ||
          hiddenItemsList.includes(itemId)
        ) {
          return null;
        }

        return (
          <img
            key={itemId}
            src={`https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/item/${image.full}`}
            alt={name}
            onClick={() =>
              dispatch({
                type: ActionTypes.addSelectedItem,
                payload: items[itemId],
              })
            }
          />
        );
      })}
    </div>
  );
}

export default ItemsContainer;
