import React, { useState, useEffect } from "react";

import Poster from "./Poster";
import { model } from "../model";

function Home() {
  const [state, setState] = useState({
    posters: []
  });

  useEffect(() => {
    setState({
      posters: model.posters
    });
  }, []);

  return state.posters.map(poster => (
    <Poster key={poster.id} poster={poster} />
  ));
}

export default Home;
