import React, { createContext } from "react";
import PropTypes, { InferProps } from "prop-types";
import { useLocalStore } from "mobx-react-lite";

export type ShopKeeperStore = {
  dataDragonVersion: string;
  selectedChampion: string;
  setDataDragonVersion: (version: string) => void;
  setSelectedChampion: (champion: string) => void;
};

export const ShopkeeperContext = createContext<any>(null);

export function ShopkeeperProvider(
  props: InferProps<typeof ShopkeeperProvider.propTypes>
) {
  const shopkeeperStore = useLocalStore(
    (props: InferProps<typeof ShopkeeperProvider.propTypes>) => ({
      /* observables */
      dataDragonVersion: props.dataDragonVersion,
      selectedChampion: "",

      /* actions */
      setDataDragonVersion(version: string) {
        shopkeeperStore.dataDragonVersion = version;
      },

      setSelectedChampion(champion: string) {
        shopkeeperStore.selectedChampion = champion;
      },
    }),
    props
  );

  return (
    <ShopkeeperContext.Provider value={shopkeeperStore}>
      {props.children}
    </ShopkeeperContext.Provider>
  );
}

ShopkeeperProvider.propTypes = {
  dataDragonVersion: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
