import React, { Fragment, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";

function Top() {
  return (
    <div>
      <h2>This is top page</h2>
      <button onClick={() => navigate("/app")}>DEMO</button>
    </div>
  );
}

export default Top;