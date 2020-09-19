import React from "react";
import PropTypes from "prop-types";
import produce, { Draft } from "immer";
import { Champion, Item } from "Typings/Shopkeeper";

interface ShopkeeperState {
  readonly dataDragonVersion: string;
  readonly selectedChampion: Champion | undefined;
  readonly selectedItems: readonly Item[];
}

export enum ActionTypes {
  setDataDragonVersion = "setDataDragonVersion",
  setSelectedChampion = "setSelectedChampion",
  addSelectedItem = "addSelectedItem",
  removeSelectedItem = "removeSelectedItem",
}

type Action = { type: ActionTypes; payload: any };
type ShopkeeperDispatch = (action: Action) => void;

const ShopkeeperStateContext = React.createContext<ShopkeeperState | undefined>(
  undefined
);
const ShopkeeperDispatchContext = React.createContext<
  ShopkeeperDispatch | undefined
>(undefined);

function shopkeeperReducer(
  draft: Draft<ShopkeeperState>,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;
  switch (type) {
    case "setDataDragonVersion": {
      draft.dataDragonVersion = payload;
      return;
    }
    case "setSelectedChampion": {
      draft.selectedChampion = payload;
      return;
    }
    case "addSelectedItem": {
      if (draft.selectedItems.length < 6) {
        draft.selectedItems = [...draft.selectedItems, payload];
      }

      return;
    }
    case "removeSelectedItem": {
      if (payload >= 0 && payload < draft.selectedItems.length) {
        draft.selectedItems.splice(payload, 1);
      }

      return;
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

function ShopkeeperProvider(
  props: PropTypes.InferProps<typeof ShopkeeperProvider.propTypes>
) {
  const initialState = {
    dataDragonVersion: props.dataDragonVersion,
    selectedChampion: undefined,
    selectedItems: [],
  };
  const [state, dispatch] = React.useReducer(
    produce(shopkeeperReducer),
    initialState
  );

  return (
    <ShopkeeperStateContext.Provider value={state}>
      <ShopkeeperDispatchContext.Provider value={dispatch}>
        {props.children}
      </ShopkeeperDispatchContext.Provider>
    </ShopkeeperStateContext.Provider>
  );
}

ShopkeeperProvider.propTypes = {
  dataDragonVersion: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

function useShopkeeperState() {
  const context = React.useContext(ShopkeeperStateContext);
  if (context === undefined) {
    throw new Error(
      "useShopkeeperState must be used within a ShopkeeperProvider"
    );
  }
  return context;
}

function useShopkeeperDispatch() {
  const context = React.useContext(ShopkeeperDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useShopkeeperDispatch must be used within a ShopkeeperProvider"
    );
  }
  return context;
}

export { ShopkeeperProvider, useShopkeeperState, useShopkeeperDispatch };
