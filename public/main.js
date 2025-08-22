const html5QrCode = new Html5Qrcode("reader");

function startScanner() {
  html5QrCode.start(
    { facingMode: "environment" }, // Kamera belakang (jika ada)
    { fps: 10, qrbox: 250 },
    (decodedText) => {

      html5QrCode.stop()

      fetch("http://localhost:3000/data-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Id : decodedText })
      })
      .then(res => res.json())
      .then(data => console.log(data));
    },
    (errorMessage) => {
      // Bisa diabaikan atau untuk debug
    }
  ).catch(err => {
    console.error("Gagal memulai scanner", err);
  });
}

// Jalankan scanner otomatis saat halaman dimuat
window.addEventListener("load", startScanner);
