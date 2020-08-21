import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useObserver } from "mobx-react-lite";
import { ShopkeeperContext } from "../ShopkeeperContext";
import { Champion } from "../typings/Shopkeeper";
import ChampionDisplay from "./ChampionDisplay/ChampionDisplay";
import ChampionsGridDrawer from "./ChampionsGridDrawer/ChampionsGridDrawer";
import "./ChampionsContainer.css";

interface ChampionsData {
  [championId: string]: Champion;
}

function ChampionsContainer() {
  const shopkeeperStore = useContext(ShopkeeperContext);

  const [champions, setChampions] = useState<ChampionsData>({});
  useEffect(() => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${shopkeeperStore.dataDragonVersion}/data/en_US/champion.json`
      )
      .then((res) => setChampions(res.data.data));
  }, [shopkeeperStore]);

  return useObserver(() => (
    <div className="champion-container">
      <ChampionsGridDrawer
        champions={champions}
        onChampionClick={(champion) =>
          shopkeeperStore?.setSelectedChampion(champion)
        }
      />
      {shopkeeperStore.selectedChampion && (
        <ChampionDisplay
          champion={champions[shopkeeperStore.selectedChampion]}
        />
      )}
    </div>
  ));
}

export default ChampionsContainer;
