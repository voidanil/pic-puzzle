const photoInput = document.querySelector("#photoInput");
const preview = document.querySelector(".photo-preview");
const puzzle = document.querySelector(".puzzle");
var slices = document.querySelectorAll(".slice");
var slicesImg = document.querySelectorAll(".slice img");
const info = document.querySelector(".info");
const suffleBtn = document.querySelector(".suffle-btn");
var imgPathStr = "";

const initialSlices = slices;
const initialslicesImg = slicesImg;
const initialImageIdList = Array.from(initialslicesImg).map((img) => img.id);

const drag = (ev) => {
  removeDraggingClass();
  ev.target.classList.add("dragging");
  ev.dataTransfer.setData("text", ev.target.id);
};

const allowDrop = (ev) => {
  ev.preventDefault();
};

const removeDraggingClass = () => {
  document.querySelector(".dragging")?.classList.remove("dragging");
};

const infoHandler = (msg) => {
  info.innerHTML = msg ?? "Tips: Arrange the pieces in correct order.";
};

infoHandler("PLAY :  Select a image and solve the puzzle."); //initialize the info

const suffleSlices = () => {
  const array = Array.from(initialSlices); // Convert to array for easier manipulation
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  infoHandler();
  return array;
};

const ckeckIsSoved = () => {
  const imageIdList = Array.from(document.querySelectorAll(".slice img")).map(
    (img) => img.id
  );

  if (imageIdList.toString() === initialImageIdList.toString()) {
    setTimeout(() => {
      infoHandler("Congratulatiions !!!");
      window.outerWidth < 1400
        ? confetti({
            particleCount: 150,
            spread: 200,
            gravity: 0.8,
            scalar: 1,
            startVelocity: 55,
            origin: { y: 0.6 },
            shapes: ["circle", "square"],
            zIndex: 2000,
          })
        : confetti({
            particleCount: 200,
            ticks: 170,
            spread: 170,
            gravity: 0.8,
            scalar: 1.5,
            startVelocity: 80,
            origin: { y: 0.6 },
            shapes: ["circle", "square"],
            zIndex: 2000,
          });
    }, 300);
  } else {
    infoHandler();
  }
};

//adding drag attributes/properties to each slices
const updateSliceNode = () => {
  slices = document.querySelectorAll(".slice");
  slices.forEach((element) => {
    element.draggable = true;
    element.ondragstart = drag;
    element.ondrop = drop;
    element.ondragover = allowDrop;
    element.style.cursor = "grab";
  });
};

//initalize the puzzle contianer for new-image upload
const initializePuzzleContainer = (imgPath) => {
  puzzle.innerHTML = "";
  suffleSlices().forEach((element) => {
    puzzle.append(element);
  });

  //add src to each img node
  initialslicesImg.forEach((element) => {
    element.style.visibility = "visible";
    element.src = imgPath;
  });
};

const drop = (ev) => {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  const dataElement = document.getElementById(data);
  const targetElement = ev.target;

  targetElement.classList.remove("dragging");
  if (dataElement == null) return null;
  dataElement.classList.remove("dragging");

  const targetCloneNode = targetElement.cloneNode(true);
  const dataCloneNode = dataElement.cloneNode(true);

  //checks if the target and drag node is same
  if (
    dataCloneNode.id !== targetCloneNode.id &&
    targetElement.tagName !== "IMG" &&
    dataElement.tagName !== "IMG"
  ) {
    puzzle.replaceChild(targetCloneNode, dataElement);
    puzzle.replaceChild(dataCloneNode, targetElement);
  }

  updateSliceNode(); //cloned nodes needs updated slices
  ckeckIsSoved();
};

const imageUploadHandler = () => {
  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const img = document.createElement("img");
    img.src = reader.result;
    img.classList.add("image");
    preview.innerHTML = "";
    preview.appendChild(img);

    imgPathStr = reader.result;
    //initialize the puzzle container
    initializePuzzleContainer(reader.result);
  };

  updateSliceNode();
  infoHandler();
  reader.readAsDataURL(file);
};

// handling  on image-upoad
photoInput.addEventListener("change", imageUploadHandler);

suffleBtn.onclick = () => {
  if (imgPathStr !== "") {
    initializePuzzleContainer(imgPathStr);
  }
};

document.onmouseup = () => {
  removeDraggingClass();
};
