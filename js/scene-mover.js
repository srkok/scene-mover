import { now, move } from "./settings.js";

AFRAME.registerComponent("scene-mover", {
  schema: {
    up: { type: "int" },
    right: { type: "int" },
  },
  init: function () {
    this.el.setAttribute("color", "green");
    this.el.classList.add("arrow");
    this.el.classList.add("raycastable");
  },
  events: {
    mouseenter: function () {
      this.el.setAttribute("scale", "1.2 1.2 1.2");
      this.target()?.classList.add("target");
    },
    mouseleave: function () {
      this.el.setAttribute("scale", "1 1 1");
      this.target()?.classList.remove("target");
    },
    click: function () {
      document.querySelectorAll(".arrow").forEach((el) => {
        el.setAttribute("visible", false);
        el.classList.remove("raycastable");
      });
      this.target()?.classList.remove("target");
      move(now[0] + this.data.up, now[1] + this.data.right);
    },
  },
  target: function () {
    return document.querySelector("#matrix").children[now[0] + this.data.up]
      ?.children[now[1] + this.data.right];
  },
});
