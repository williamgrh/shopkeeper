import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useObserver } from "mobx-react-lite";
import { ShopkeeperContext } from "../ShopkeeperContext";
import { Champion } from "../typings/Shopkeeper";
import ChampionDisplay from "./ChampionDisplay/ChampionDisplay";
import ChampionsGrid from "./ChampionsGrid/ChampionsGrid";
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
      {shopkeeperStore.selectedChampion && (
        <ChampionDisplay
          champion={champions[shopkeeperStore.selectedChampion]}
        />
      )}
      <ChampionsGrid
        champions={champions}
        onChampionClick={(champion) =>
          shopkeeperStore?.setSelectedChampion(champion)
        }
      />
    </div>
  ));
}

export default ChampionsContainer;
