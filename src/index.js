import "./style/variables.scss";
import "./style/body.scss";
import "./style/header.scss";
import "./style/main.scss";
import "./style/section.scss";

import { routes } from "./routes";

let pageArgument;

const setRoute = () => {
  const path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";
  const pageContent = document.getElementById("pageContent");
  console.log(routes);
  routes[path[0]](pageArgument);
  return true;
};

const searchGame = () => {
  const input = document.getElementById("searchinput");
  input.addEventListener("keydown", function () {
    if (event.keyCode == 13) {
      let gameToSearch = input.value;
      gameToSearch = gameToSearch.replace(/\s+/g, "-");
      window.location.href = `#pagelist/${gameToSearch}`;
    }
  });
};

searchGame();

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());