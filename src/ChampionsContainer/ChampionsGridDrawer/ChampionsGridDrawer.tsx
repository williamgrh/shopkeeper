import React, { useContext, useRef } from "react";
import PropTypes, { InferProps } from "prop-types";
import { ShopkeeperContext } from "../../ShopkeeperContext";
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

function ChampionsGrid({
  champions,
  onChampionClick,
}: InferProps<typeof ChampionsGrid.propTypes>) {
  const shopkeeperStore = useContext(ShopkeeperContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);

  return (
    <>
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
          <DrawerBody
            style={{overflowY: "scroll"}}
          >
            {Object.values(champions).map((champion) => {
              const { id, image, name } = champion;

              return (
                <img
                  className="champion-image"
                  key={id}
                  src={`https://ddragon.leagueoflegends.com/cdn/${shopkeeperStore.dataDragonVersion}/img/champion/${image.full}`}
                  alt={name}
                  onClick={() => {
                    onChampionClick(id);
                    onClose();
                  }}
                />
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

ChampionsGrid.propTypes = {
  champions: PropTypes.object.isRequired,
  onChampionClick: PropTypes.func.isRequired,
};

export default ChampionsGrid;
