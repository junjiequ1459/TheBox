document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "cornflowerblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
