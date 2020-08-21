import React, { useContext } from "react";
import PropTypes, { InferProps } from "prop-types";
import { ShopkeeperContext } from "../../ShopkeeperContext";

function ChampionsGrid({
  champions,
  onChampionClick,
}: InferProps<typeof ChampionsGrid.propTypes>) {
  const shopkeeperStore = useContext(ShopkeeperContext);

  return (
    <div className="champions-grid">
      {Object.values(champions).map((champion) => {
        const { id, image, name } = champion;

        return (
          <img
            className="champion-image"
            key={id}
            src={`https://ddragon.leagueoflegends.com/cdn/${shopkeeperStore.dataDragonVersion}/img/champion/${image.full}`}
            alt={name}
            onClick={() => onChampionClick(id)}
          />
        );
      })}
    </div>
  );
}

ChampionsGrid.propTypes = {
  champions: PropTypes.object.isRequired,
  onChampionClick: PropTypes.func.isRequired,
};

export default ChampionsGrid;
