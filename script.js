const preview = document.querySelector(".photo-preview");
const photoInput = document.querySelector("#photoInput");
const slices = document.querySelectorAll(".slice");
const slicesImg = document.querySelectorAll(".slice img");

const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

const allowDrop = (ev) => {
  ev.preventDefault();
};

const drop = (ev) => {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  const dataElement = document.getElementById(data);
  //   ev.target.appendChild(dataElement);
};

slices.forEach((element) => {
  element.ondrop = drop;
  element.ondragover = allowDrop;
});

// handling the image image upoad
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const img = document.createElement("img");
    img.src = reader.result;
    img.classList.add("image");
    preview.innerHTML = "";
    preview.appendChild(img);

    //add src to each img node
    slicesImg.forEach((element) => {
      element.src = reader.result;
      element.draggable = true;
      element.ondragstart = drag;
    });
  };

  reader.readAsDataURL(file);
});
