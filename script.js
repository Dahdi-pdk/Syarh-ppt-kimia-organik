document.addEventListener("DOMContentLoaded", () => {
  // Buat elemen blackbox overlay
  const blackbox = document.createElement("div");
  blackbox.classList.add("blackbox");
  blackbox.innerHTML = `<img src="" alt="preview">`;
  document.body.appendChild(blackbox);

  const blackboxImg = blackbox.querySelector("img");

  let scale = 1;       // skala zoom
  let posX = 0, posY = 0; // posisi drag
  let isDragging = false;
  let startX, startY;

  // Fungsi membuka preview
  function openBlackbox(src) {
    blackboxImg.src = src;
    scale = 1;
    posX = 0;
    posY = 0;
    applyTransform();
    blackbox.classList.add("active");
  }

  // Fungsi menutup preview
  function closeBlackbox() {
    blackbox.classList.remove("active");
    blackboxImg.src = "";
  }

  // Terapkan transformasi zoom & drag
  function applyTransform() {
    blackboxImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    blackboxImg.style.transition = "transform 0.05s linear";
    blackboxImg.style.cursor = scale > 1 ? "grab" : "default";
  }

  // Pasang event klik ke semua thumbnail
  document.querySelectorAll(".image-viewer img").forEach(img => {
    img.addEventListener("click", () => {
      openBlackbox(img.src);
    });
  });

  // Klik area luar untuk tutup
  blackbox.addEventListener("click", (e) => {
    if (e.target === blackbox) {
      closeBlackbox();
    }
  });

  // Tombol Esc untuk menutup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBlackbox();
  });

  // Zoom dengan scroll (desktop)
  blackbox.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    if (e.deltaY < 0) {
      scale = Math.min(scale + zoomIntensity, 5); // max 5x
    } else {
      scale = Math.max(scale - zoomIntensity, 1); // min 1x
      if (scale === 1) {
        posX = 0; posY = 0; // reset posisi kalau balik normal
      }
    }
    applyTransform();
  });

  // Drag dengan mouse
  blackboxImg.addEventListener("mousedown", (e) => {
    if (scale > 1) {
      isDragging = true;
      startX = e.clientX - posX;
      startY = e.clientY - posY;
      blackboxImg.style.cursor = "grabbing";
      e.preventDefault();
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      posX = e.clientX - startX;
      posY = e.clientY - startY;
      applyTransform();
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    if (scale > 1) blackboxImg.style.cursor = "grab";
  });

  // Gesture pinch zoom (ponsel)
  let initialDistance = null;
  blackbox.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      initialDistance = getDistance(e.touches[0], e.touches[1]);
    }
  });

  blackbox.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2 && initialDistance) {
      const newDistance = getDistance(e.touches[0], e.touches[1]);
      const zoomFactor = newDistance / initialDistance;
      scale = Math.min(Math.max(scale * zoomFactor, 1), 5);
      applyTransform();
      initialDistance = newDistance;
      e.preventDefault();
    }
  });

  function getDistance(touch1, touch2) {
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  }
});
