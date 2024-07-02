let initialValues = [
  { id: 1, name: "Begonia" },
  { id: 2, name: "Lily" },
  { id: 3, name: "Dahlia" },
  { id: 4, name: "Iris" },
  { id: 5, name: "Azalea" },
  { id: 6, name: "Orchids" },
  { id: 7, name: "Lavender" },
  { id: 8, name: "Daffodil" },
  { id: 9, name: "Tulips" },
  { id: 10, name: "Marigold" },
];

const wrapper = document.querySelector(".wrapper");

let selected = null;

initialValues.forEach((val) => {
  let item = document.createElement("div");
  item.classList.add("item");
  item.setAttribute("draggable", "true");
  item.setAttribute("order", val.id);

  let details = document.createElement("p");
  details.textContent = val.name;
  details.classList.add("details");

  let icon = document.createElement("span");
  icon.textContent = "drag_indicator";
  icon.classList.add("icon");
  icon.classList.add("material-symbols-outlined");

  wrapper.appendChild(item).append(details, icon);
});

const items = document.querySelectorAll(".item");

items.forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    selected = event.target;

    item.firstChild.style.fontWeight = "800";
    item.firstChild.style.textShadow = "1px 1px 10px #fc0";
    item.lastChild.style.textShadow = "1px 1px 10px #fc0";
    
    item.classList.add("dragging");

  });

  item.addEventListener("dragend", (event) => {
    selected = event.target;

    item.firstChild.style.fontWeight = "400";
    item.firstChild.style.textShadow = "none";
    item.lastChild.style.textShadow = "none";

    item.classList.remove("dragging");
  });

  item.addEventListener("dragover", (event) => {
    event.preventDefault();
    item.classList.add("dragged-over");
  });

  item.addEventListener("dragleave", (event) => {
    event.preventDefault();
    item.classList.remove("dragged-over");
  });

  item.addEventListener("drop", (event) => {
    event.preventDefault();

    const draggingItem = wrapper.querySelector(".dragging");

    let itemClone = item.cloneNode(true);
    let draggingItemClone = draggingItem.cloneNode(true);

    draggingItem.replaceChildren(...itemClone.childNodes);
    item.replaceChildren(...draggingItemClone.childNodes);

    item.firstChild.style.fontWeight = "400";
    item.firstChild.style.textShadow = "none";
    item.lastChild.style.textShadow = "none";

    item.classList.remove("dragged-over");
  });
});

wrapper.addEventListener("dragover", (event) => {
  event.preventDefault();
  wrapper.style.borderStyle = "dashed";
});

wrapper.addEventListener("dragleave", (event) => {
  wrapper.style.borderStyle = "solid";
});

wrapper.addEventListener("dragend", (event) => {
  wrapper.style.borderStyle = "solid";
});
