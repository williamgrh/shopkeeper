import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useObserver } from "mobx-react-lite";
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
import { ShopkeeperContext } from "../ShopkeeperContext";
import { Champion } from "../typings/Shopkeeper";
import "./ChampionsContainer.css";

interface ChampionsData {
  [championId: string]: Champion;
}

function ChampionsContainer() {
  const shopkeeperStore = useContext(ShopkeeperContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);
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
                  src={`https://ddragon.leagueoflegends.com/cdn/${shopkeeperStore.dataDragonVersion}/img/champion/${image.full}`}
                  alt={name}
                  onClick={() => {
                    shopkeeperStore.setSelectedChampion(champion);
                    onClose();
                  }}
                />
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  ));
}

export default ChampionsContainer;
