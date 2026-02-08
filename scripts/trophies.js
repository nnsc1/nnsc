fetch("data/trophies.json")
  .then(res => res.json())
  .then(trophies => {
    const hall = document.getElementById("trophyHall");

    trophies.forEach(t => {
      const div = document.createElement("div");
      div.className = "trophy";
      div.innerHTML = `
        <h2>${t.name}</h2>
        <p>${t.date}</p>
        <p>Final: ${t.finalScore}</p>
      `;

      gsap.from(div, { opacity: 0, y: 40, duration: 0.8 });

      hall.appendChild(div);
    });
  });
