import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./home/Home.js";
import Details from "./details/Details.js";

export default function Pages() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:code" exact component={Details} />
    </Switch>
  );
}