import React, { createContext } from "react";
import PropTypes, { InferProps } from "prop-types";
import { useLocalStore } from "mobx-react-lite";
import { Champion, Item } from "Typings/Shopkeeper";

export type ShopKeeperStore = {
  dataDragonVersion: string;
  selectedChampion: Champion;
  selectedItems: Array<Item>;
  setDataDragonVersion: (version: string) => void;
  setSelectedChampion: (champion: string) => void;
  addSelectedItem: (item: Item) => void;
  removeSelectedItem: (index: number) => void;
};

export const ShopkeeperContext = createContext<any>(null);

export function ShopkeeperProvider(
  props: InferProps<typeof ShopkeeperProvider.propTypes>
) {
  const shopkeeperStore = useLocalStore(
    (props: InferProps<typeof ShopkeeperProvider.propTypes>) => ({
      /* observables */
      dataDragonVersion: props.dataDragonVersion,
      selectedChampion: {} as Champion,
      selectedItems: [] as Array<Item>,

      /* actions */
      setDataDragonVersion(version: string) {
        shopkeeperStore.dataDragonVersion = version;
      },

      setSelectedChampion(champion: Champion) {
        shopkeeperStore.selectedChampion = champion;
      },

      addSelectedItem(item: Item) {
        if (shopkeeperStore.selectedItems.length < 6) {
          shopkeeperStore.selectedItems.push(item);
        }
      },

      removeSelectedItem(index: number) {
        if (index >= 0 && index < shopkeeperStore.selectedItems.length) {
          shopkeeperStore.selectedItems.splice(index, 1);
        }
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
