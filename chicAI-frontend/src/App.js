import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are loaded
import OutfitManagement from "./components/outfitsManage/OutfitManagement";
import OutfitCreator from "./components/outfitsManage/OutfitCreator";

function App() {

  return (
    <div className="App">
      {/* Pass suggested outfits to OutfitManagement */}
      {/* <OutfitManagement suggestedOutfits={suggestedOutfits} /> */}
      {/* <OutfitManagement userId="user_2q0JuFr5SPDCEVSG3jdjarMRAFh" /> */}
      <OutfitCreator userId="user_2q0a6hxnhL1ou9w5PlVpD1P8wXh" />

    </div>
  );
}

export default App;
