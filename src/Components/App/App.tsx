import React from "react";
import axios from "axios";
import { ShopkeeperProvider } from "Context/ShopkeeperContext";
import { ThemeProvider } from "@chakra-ui/core";
import ShopkeeperContainer from "Components/ShopkeeperContainer/ShopkeeperContainer";
import Footer from "Components/Footer/Footer";
import "./index.css";

const App = () => {
  const [dataDragonVersion, setDataDragonVersion] = React.useState<string>("");
  React.useEffect(() => {
    axios
      .get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => setDataDragonVersion(res.data[0]));
  }, []);

  return (
    <div className="app">
      {dataDragonVersion && (
        <ThemeProvider>
          <ShopkeeperProvider dataDragonVersion={dataDragonVersion}>
            <>
              <ShopkeeperContainer />
            </>
          </ShopkeeperProvider>
          <Footer />
        </ThemeProvider>
      )}
    </div>
  );
};

export default App;
