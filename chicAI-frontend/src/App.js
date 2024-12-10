import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are loaded
import OutfitManagement from "./components/outfitsManage/OutfitManagement";
import Suggestions from "./components/outfitsManage/Suggestions";

function App() {
  // Fetch suggestions from the Suggestions logic
  const suggestedOutfits = Suggestions();

  return (
    <div className="App">
      {/* Pass suggested outfits to OutfitManagement */}
      {/* <OutfitManagement suggestedOutfits={suggestedOutfits} /> */}
      <OutfitManagement userId="user_2q0JuFr5SPDCEVSG3jdjarMRAFh" />

    </div>
  );
}

export default App;
