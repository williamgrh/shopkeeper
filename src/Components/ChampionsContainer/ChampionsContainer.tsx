import React from "react";
import axios from "axios";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/core";
import {
  useShopkeeperState,
  useShopkeeperDispatch,
  ActionTypes,
} from "Context/ShopkeeperContext";
import { Champion } from "Typings/Shopkeeper";
import "./ChampionsContainer.css";

interface ChampionsData {
  [championId: string]: Champion;
}

function ChampionsContainer() {
  const { dataDragonVersion } = useShopkeeperState();
  const dispatch = useShopkeeperDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLDivElement>(null);
  const [champions, setChampions] = React.useState<ChampionsData>({});
  React.useEffect(() => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/en_US/champion.json`
      )
      .then((res) => setChampions(res.data.data));
  }, [dataDragonVersion]);

  return (
    <div className="champion-container">
      <Button ref={btnRef} variantColor="teal" onClick={onOpen}>
        Champions
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        size="md"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Select a champion</DrawerHeader>
          <DrawerBody style={{ overflowY: "scroll" }}>
            {Object.values(champions).map((champion) => {
              const { id, image, name } = champion;

              return (
                <img
                  className="champion-image"
                  key={id}
                  src={`https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${image.full}`}
                  alt={name}
                  onClick={() => {
                    dispatch({
                      type: ActionTypes.setSelectedChampion,
                      payload: champion,
                    });
                    onClose();
                  }}
                />
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default ChampionsContainer;
