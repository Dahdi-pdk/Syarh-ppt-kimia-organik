document.addEventListener("DOMContentLoaded", () => {
  // Buat elemen blackbox overlay
  const blackbox = document.createElement("div");
  blackbox.classList.add("blackbox");
  blackbox.innerHTML = `<img src="" alt="preview">`;
  document.body.appendChild(blackbox);

  const blackboxImg = blackbox.querySelector("img");

  // Fungsi membuka preview
  function openBlackbox(src) {
    blackboxImg.src = src;
    blackbox.classList.add("active");
  }

  // Fungsi menutup preview
  function closeBlackbox() {
    blackbox.classList.remove("active");
    blackboxImg.src = "";
  }

  // Pasang event klik ke semua thumbnail
  document.querySelectorAll(".image-viewer img").forEach(img => {
    img.addEventListener("click", () => {
      openBlackbox(img.src);
    });
  });

  // Klik pada overlay (di luar gambar) → tutup
  blackbox.addEventListener("click", (e) => {
    // Jika yang diklik bukan gambar (atau area overlay), tutup
    if (e.target === blackbox) {
      closeBlackbox();
    }
  });

  // Tombol Esc untuk menutup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeBlackbox();
    }
  });
});
