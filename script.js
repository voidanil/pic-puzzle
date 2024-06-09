const preview = document.querySelector(".photo-preview");
const photoInput = document.querySelector("#photoInput");
const slicesImg = document.querySelectorAll(".slice img");

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
      element.style.visibility = "visible";
    });
  };

  reader.readAsDataURL(file);
});
