import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { generatePalette } from "./utils/colorHelpers";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SingleColorPalette from "./components/SingleColorPalette";
import Palette from "./components/Palette";
import Home from "./components/Home";
import seedColors from "./seeds/seedColors";
import NewPaletteForm from "./components/create/NewPaletteForm";

import "./css/App.css";
import "./css/page.css";

function App() {
  // init
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalette] = useState(savedPalettes || seedColors);

  // fn
  // function syncLocalStorage() {
  //   // window.localStorage.setItem(
  //   //   "palettes",
  //   //   JSON.stringify(palettes.paletteArray)
  //   // );
  //   if (JSON.parse(window.localStorage.getItem("palettes")).lenght <= 0) {
  //     setPalette((st) => [seedColors]);
  //     window.localStorage.setItem("palettes", JSON.stringify(palettes));
  //   } else {
  //     JSON.parse(window.localStorage.getItem("palettes"));
  //   }
  // }
  const savePalette = (newPalette) => {
    return setPalette((st) => [...st, newPalette]);
  };
  const deletePalette = (id) => {
    return setPalette((st) => st.filter((p) => p.id !== id));
  };
  const findPalette = (id) => {
    return palettes.find((p) => p.id === id);
  };
  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  // custom hooks
  const PaletteWrapper = (props) => {
    const { id } = useParams();
    const foundPalette = generatePalette(findPalette(id));
    return <Palette palette={foundPalette} />;
  };
  const SinglePaletteWrapper = (props) => {
    const { paletteId, colorId } = useParams();
    const foundPalette = generatePalette(findPalette(paletteId));
    return <SingleColorPalette palette={foundPalette} colorId={colorId} />;
  };
  const Page = ({ children }) => {
    return <section className="page">{children}</section>;
  };

  const location = useLocation();
  // render
  return (
    // <div className="App">
    <TransitionGroup className="App" location={location}>
      <CSSTransition key={location.key} classNames="page" timeout={500}>
        <Routes location={location}>
          <Route
            exact
            path="/"
            element={
              <Page>
                <Home palettes={palettes} deletePalette={deletePalette} />
              </Page>
            }
          />
          <Route
            exact
            path="/palette/:id"
            element={
              <Page>
                <PaletteWrapper />
              </Page>
            }
          />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            element={
              <Page>
                <SinglePaletteWrapper />
              </Page>
            }
          />
          <Route
            exact
            path="/palette/new"
            element={
              <Page>
                <NewPaletteForm savePalette={savePalette} palettes={palettes} />
              </Page>
            }
          />
          <Route
            path="*"
            element={
              <Page>
                <h1>This</h1>
              </Page>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
    // </div>
  );
}

export default App;
