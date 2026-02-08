fetch("data/players.json")
  .then(res => res.json())
  .then(players => {
    const roster = document.getElementById("roster");

    players.forEach(player => {
      const item = document.createElement("div");
      item.className = "player-item";
      item.textContent = player.name;
      item.onclick = () => showPlayer(player);
      roster.appendChild(item);
    });
  });

function showPlayer(player) {
  const video = document.getElementById("playerVideo");
  const headshot = document.getElementById("headshot");

  // Reset
  video.style.display = "block";
  video.src = player.video;
  video.currentTime = 0;
  video.play();

  headshot.style.opacity = 0;
  headshot.style.backgroundImage = `url(${player.headshot})`;

  // After 5 seconds → headshot cinematic
  setTimeout(() => {
    video.style.display = "none";

    gsap.fromTo(headshot,
      { scale: 2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
    );

    gsap.fromTo(headshot,
      { backgroundPosition: "50% 40%" },
      { backgroundPosition: "50% 50%", duration: 1.2 }
    );
  }, 5000);

  document.getElementById("playerName").textContent = player.name;
  document.getElementById("playerMeta").textContent =
    `Joined ${player.joined} • ${player.countries.join(" / ")}`;

  const trophies = document.getElementById("playerTrophies");
  trophies.innerHTML = "";
  player.trophies.forEach(t => {
    const span = document.createElement("span");
    span.textContent = t;
    trophies.appendChild(span);
  });
}
