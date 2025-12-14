/**  scene settings ******************************************************/
const n = 3;
const m = 4;
const start = [1, 1];
export const now = [...start];
const errorImage = "#sky-error";

const scenes = Array.from({ length: n }, () => Array(m).fill(errorImage));

scenes[0][1] = "#sky-00";
scenes[0][2] = "#sky-01";
scenes[0][3] = "#sky-02";
scenes[1][0] = "#sky-03";
scenes[1][1] = "#sky-04";
scenes[1][2] = "#sky-05";
scenes[1][3] = "#sky-06";
scenes[2][0] = "#sky-07";
scenes[2][1] = "#sky-08";
scenes[2][3] = "#sky-09";
/*************************************************************************/

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("a-sky")
    .setAttribute("src", scenes[start[0]][start[1]]);
  const table = document.getElementById("matrix");

  for (let i = 0; i < n; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < m; j++) {
      const td = document.createElement("td");
      if (scenes[i][j] !== errorImage) {
        td.classList.add("move-available");
        td.addEventListener("click", () => {
          move(i, j);
        });
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  const nowTd = table.children[start[0]].children[start[1]];
  nowTd.classList.remove("move-available");
  nowTd.classList.add("now");
});

export function move(up, right) {
  // マップ外移動を拒否
  if (up < 0 || up > n || right < 0 || right > m) {
    console.error("you can't move.");
    return;
  }
  // シーンのない場所への移動を拒否
  if (scenes[up][right] === errorImage) {
    console.error("you can't move.");
    return;
  }
  // scene-moverの除去
  document.querySelectorAll(".arrow").forEach((el) => {
    el.setAttribute("visible", false);
    el.classList.remove("raycastable");
  });
  // 移動情報の更新
  now[0] = up;
  now[1] = right;
  // 背景描画画像を変更
  document.querySelector("a-sky").setAttribute("src", scenes[now[0]][now[1]]);
  // マップ表示を変更
  const matrix = document.querySelector("#matrix");
  const oldNowElem = matrix.querySelector(".now");
  if (oldNowElem) {
    oldNowElem.classList.remove("now");
    oldNowElem.classList.add("move-available");
  }
  const newNowElem = matrix.children[now[0]].children[now[1]];
  newNowElem.classList.remove("move-available");
  newNowElem.classList.add("now");
  // 移動可能な操作のみ受付可能とする
  if (now[0] > 0 && scenes[now[0] - 1][now[1]] !== errorImage) {
    const upArrow = document.querySelector("#uparrow");
    upArrow.setAttribute("visible", true);
    upArrow.classList.add("raycastable");
  }
  if (now[0] < n - 1 && scenes[now[0] + 1][now[1]] !== errorImage) {
    const downArrow = document.querySelector("#downarrow");
    downArrow.setAttribute("visible", true);
    downArrow.classList.add("raycastable");
  }
  if (now[1] < m - 1 && scenes[now[0]][now[1] + 1] !== errorImage) {
    const rightArrow = document.querySelector("#rightarrow");
    rightArrow.setAttribute("visible", true);
    rightArrow.classList.add("raycastable");
  }
  if (now[1] > 0 && scenes[now[0]][now[1] - 1] !== errorImage) {
    const leftArrow = document.querySelector("#leftarrow");
    leftArrow.setAttribute("visible", true);
    leftArrow.classList.add("raycastable");
  }
}
