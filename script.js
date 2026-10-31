// Mobile menu: open and close
const menu = document.getElementById("menu");
document.getElementById("burger").onclick = () => menu.classList.toggle("open");
menu.onclick = () => menu.classList.remove("open");

// Dark mode: switch between light and dark
document.getElementById("theme").onclick = () => {
  const root = document.documentElement;
  const isDark =
    root.dataset.theme === "dark" ||
    (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = isDark ? "light" : "dark";
};

// Project filter: show only the cards that match the search and dropdowns
const search = document.getElementById("q");
const category = document.getElementById("cat");
const year = document.getElementById("yr");
const cards = document.querySelectorAll(".project");

function filterProjects() {
  const text = search.value.toLowerCase().trim();
  let shown = 0;

  cards.forEach((card) => {
    const matches =
      (!category.value || card.dataset.category === category.value) &&
      (!year.value || card.dataset.year === year.value) &&
      (!text || card.textContent.toLowerCase().includes(text));
    card.hidden = !matches;
    if (matches) shown++;
  });

  document.getElementById("count").textContent =
    shown + (shown === 1 ? " project found" : " projects found");
  document.getElementById("empty").hidden = shown > 0;
}

search.oninput = category.onchange = year.onchange = filterProjects;
filterProjects();
