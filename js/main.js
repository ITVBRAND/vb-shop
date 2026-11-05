const notes = [
  "Изучаем фирменный стиль, специфику бизнеса и задачи команды. Формируем концепцию корпоративной одежды, которая отражает характер бренда.",
  "Разрабатываем фасоны, силуэты и цветовые решения. Создаём модели для разных должностей, сохраняя единый визуальный образ команды.",
  "Подбираем ткани, фактуры и детали с учётом комфорта, износостойкости и требований к уходу.",
  "Готовим конструкцию, отшиваем образец и проводим примерку. Корректируем посадку до запуска партии.",
  "Организуем раскрой, пошив и контроль качества. Комплектуем изделия и готовим заказ к передаче.",
  "Сохраняем согласованные решения и поддерживаем образ команды при новых сотрудниках и обновлении комплектов."
];

const header = document.querySelector(".header");
const nav = document.querySelector("#nav");
const menuToggle = document.querySelector(".menu-toggle");
const dialog = document.querySelector("#request");
const form = document.querySelector("#request-form");
const done = document.querySelector(".request__done");
const note = document.querySelector("#timeline-note");

const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-open-request]").forEach((button) => {
  button.addEventListener("click", () => {
    form.hidden = false;
    done.hidden = true;
    dialog.showModal();
  });
});

document.querySelectorAll("[data-close-request]").forEach((button) => {
  button.addEventListener("click", () => dialog.close());
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.hidden = true;
  done.hidden = false;
  form.reset();
});

document.querySelectorAll(".faq__item button").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const open = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".faq__item button").forEach((other) => {
      other.setAttribute("aria-expanded", "false");
      other.nextElementSibling.hidden = true;
    });
    button.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
});

document.querySelectorAll(".timeline button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".timeline button").forEach((other) => {
      other.classList.remove("is-active");
      other.removeAttribute("aria-current");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-current", "step");
    note.textContent = notes[Number(button.dataset.step)];
  });
});
