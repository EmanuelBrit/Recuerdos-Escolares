// forro.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("uploadForm");
    const photoGallery = document.getElementById("photoGallery");
    const categoryLinks = document.querySelectorAll('.sidebar ul li a');
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const imageInput = document.getElementById("imageInput");
        const imageName = document.getElementById("imageName").value;
        const category = document.getElementById("categorySelect").value;

        if (imageInput.files.length > 0 && imageName) {
            const imageURL = URL.createObjectURL(imageInput.files[0]);

            // Crear un contenedor para la imagen subida
            const photoDiv = document.createElement("div");
            photoDiv.classList.add("post");
            photoDiv.setAttribute("data-category", category);
            photoDiv.setAttribute("data-name", imageName.toLowerCase()); // Almacenar el nombre de la imagen en minúsculas para facilitar la búsqueda

            // Añadir imagen y nombre
            const img = document.createElement("img");
            img.src = imageURL;
            img.alt = imageName;
            img.classList.add('post-image');

            const nameP = document.createElement("p");
            nameP.textContent = imageName;

            // Botones de Like/Dislike
            const actionsDiv = document.createElement("div");
            actionsDiv.classList.add("actions");

            const likeBtn = document.createElement("button");
            likeBtn.textContent = "👍 Like (0)";
            likeBtn.classList.add("like-btn");

            const dislikeBtn = document.createElement("button");
            dislikeBtn.textContent = "👎 Dislike (0)";
            dislikeBtn.classList.add("dislike-btn");

            let likeCount = 0; // Contador de likes
            let dislikeCount = 0; // Contador de dislikes

            // Manejo de evento para el botón de like
            likeBtn.addEventListener("click", function() {
                likeCount++;
                likeBtn.textContent = `👍 Like (${likeCount})`; // Actualiza el texto con el nuevo conteo
            });

            // Manejo de evento para el botón de dislike
            dislikeBtn.addEventListener("click", function() {
                dislikeCount++;
                dislikeBtn.textContent = `👎 Dislike (${dislikeCount})`; // Actualiza el texto con el nuevo conteo
            });

            actionsDiv.appendChild(likeBtn);
            actionsDiv.appendChild(dislikeBtn);

            // Sección de comentarios
            const commentSection = document.createElement("div");
            commentSection.classList.add("comment-section");

            const commentInput = document.createElement("input");
            commentInput.type = "text";
            commentInput.placeholder = "Escribe un comentario...";
            commentInput.classList.add("comment-input");

            const commentButton = document.createElement("button");
            commentButton.textContent = "Comentar";
            commentButton.classList.add("comment-button");

            // Manejo de evento para el botón de comentar
            commentButton.addEventListener("click", function() {
                const commentText = commentInput.value.trim();
                if (commentText) {
                    const commentP = document.createElement("p");
                    commentP.textContent = commentText;
                    commentSection.appendChild(commentP);
                    commentInput.value = ""; // Limpiar el campo de entrada
                }
            });

            // Añadir todo al div de la foto
            photoDiv.appendChild(img);
            photoDiv.appendChild(nameP);
            photoDiv.appendChild(actionsDiv);
            commentSection.appendChild(commentInput);
            commentSection.appendChild(commentButton);
            photoDiv.appendChild(commentSection);

            // Añadir la foto a la galería
            photoGallery.appendChild(photoDiv);

            // Limpiar el formulario
            form.reset();
        } else {
            alert("Por favor, sube una imagen y agrega un nombre.");
        }
    });

    // Filtrar imágenes por categoría
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            const images = document.querySelectorAll('.post');

            images.forEach(image => {
                if (category === 'all' || image.getAttribute('data-category') === category) {
                    image.style.display = 'block'; // Mostrar imagen
                } else {
                    image.style.display = 'none'; // Ocultar imagen
                }
            });
        });
    });

    // Función de búsqueda
    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.toLowerCase(); // Convertir a minúsculas para una búsqueda no sensible a mayúsculas
        const images = document.querySelectorAll('.post');

        images.forEach(image => {
            const imageName = image.getAttribute('data-name');
            if (imageName.includes(searchTerm)) {
                image.style.display = 'block'; // Mostrar imagen si coincide con la búsqueda
            } else {
                image.style.display = 'none'; // Ocultar imagen si no coincide
            }
        });
    });
});