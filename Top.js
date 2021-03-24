import React, { Fragment, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import Button from "./Button";
import Acunit from "./Acunit";

function Top() {
  return (
    <div>
      <h2><Acunit />Diarictron</h2>
      <p>毎日を記録しよう✋</p>
      <ul>
        <li>✓ダークモード</li>
        <li>✓キーボードショートカット</li>
        <li>✓マークダウン対応</li>
        <li>✓オープンソース</li>
      </ul>
      <Button type="outlined" onClick={() => navigate("/app")}>VIEW DEMO</Button>
      <Button type="outlined" onClick={() => navigate("/app")}>DOWNLOAD</Button>
      <footer>ソースコード | 利用規約 | プライバシーポリシー</footer>
    </div>
  );
}

export default Top;