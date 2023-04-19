const output = document.querySelector("#outputField")
const input = document.querySelector("#formFile")
let imagesArray = []

input.addEventListener("change", () => {
  const files = input.files
  for (let i = 0; i < files.length; i++) {
    imagesArray.push(files[i])
  }
  displayImages()
})


function displayImages() {
  let images = ""
  imagesArray.forEach((image, index) => {
    images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="image">
                <span onclick="deleteImage(${index})">&times;</span>
              </div>`
  })
  output.innerHTML = images
}

function deleteImage(index) {
  imagesArray.splice(index, 1)
  displayImages()
}

savedForm.addEventListener("submit", (e) => {
  // prevent the form from submitting
  e.preventDefault()
  // call on the deleteImagesFromServer function
  deleteImagesFromServer()
});

function deleteImagesFromServer() {
  // Make a fetch request to the server with the deleteImages array in the body
  fetch("delete", {
    method: "PUT",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json"
    },
    body: JSON.stringify({deleteImages})
  })
  // Catch the response
  .then(response => {
    // If response status is not 200, throw an error 
    if (response.status !== 200) throw Error(response.statusText)
    deleteImages = []
    serverMessage.innerHTML = response.statusText
    serverMessage.style.cssText = "background-color: #d4edda; color:#1b5e20"
  })
  // display the error message
  .catch(error => {
    serverMessage.innerHTML = error
    serverMessage.style.cssText = "background-color: #f8d7da; color:#b71c1c"
  });

}