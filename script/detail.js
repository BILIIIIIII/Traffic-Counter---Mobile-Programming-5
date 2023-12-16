let trafficData = [];

const vehicleIcon = {
  motorLeft: "../assets/icon/motor-kiri.png",
  mobilLeft: "../assets/icon/mobil-kiri.png",
  trukLeft: "../assets/icon/truk-kiri.png",
  busLeft: "../assets/icon/bus-kiri.png",
  motorRight: "../assets/icon/motor-kanan.png",
  mobilRight: "../assets/icon/mobil-kanan.png",
  trukRight: "../assets/icon/truk-kanan.png",
  busRight: "../assets/icon/bus-kanan.png",
};

document.addEventListener("DOMContentLoaded", function () {
  // Memeriksa apakah ada data yang disimpan di local storage saat halaman dimuat
  const storedTrafficData = localStorage.getItem("trafficData");
  console.log(storedTrafficData);
  const cards = document.getElementById("cards");

  if (storedTrafficData) {
    trafficData = [...JSON.parse(storedTrafficData)]; // Menggabungkan dengan data dari local storage
    displayTrafficDetails();
  }

  function getTimestamp() {
    const now = new Date();

    const jam = `
      ${now.getHours().toString().padStart(2, "0")}
        :
      ${now.getMinutes().toString().padStart(2, "0")}
        `;

    const hari = getDayName(now.getDay());

    const tanggal = `
      ${now.getDate().toString().padStart(2, "0")}
      /
      ${(now.getMonth() + 1).toString().padStart(2, "0")}
      /
      ${now.getFullYear()}
        `;

    return { jam, hari, tanggal };
  }

  function getDayName(dayIndex) {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[dayIndex];
  }

  function displayTrafficDetails() {
    trafficData.forEach((data) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = `${data.id}`;

      const motorLeft = JSON.stringify(data.vehicle.motorLeft);
      const mobilLeft = JSON.stringify(data.vehicle.mobilLeft);
      const trukLeft = JSON.stringify(data.vehicle.trukLeft);
      const busLeft = JSON.stringify(data.vehicle.busLeft);

      const motorRight = JSON.stringify(data.vehicle.motorRight);
      const mobilRight = JSON.stringify(data.vehicle.mobilRight);
      const trukRight = JSON.stringify(data.vehicle.trukRight);
      const busRight = JSON.stringify(data.vehicle.busRight);

      card.innerHTML = ` 
          <div class="time">
            <span> 
              ${data.timeStamp.jam},
              ${data.timeStamp.hari},
              ${data.timeStamp.tanggal}
            </span>
         
          </div>

          <div class="v">
            <div class="lv">
                <div class="item motor-l">
                    <img src="${vehicleIcon.motorLeft}" alt="Motor Kiri">
                    <span class="value">${motorLeft}</span>
                </div>
                <div class="item mobil-l">
                    <img src="${vehicleIcon.mobilLeft}" alt="Mobil Kiri">
                    <span class="value">${mobilLeft}</span>
                </div>
                <div class="item truk-l">
                    <img src="${vehicleIcon.trukLeft}" alt="Truk Kiri">
                    <span class="value">${trukLeft}</span>
                </div>
                <div class="item bus-l">
                    <img src="${vehicleIcon.busLeft}" alt="Bus Kiri">
                    <span class="value">${busLeft}</span>
                </div>
            </div>
            <div class="rv">
                <div class="item motor-r">
                    <img src="${vehicleIcon.motorRight}" alt="Motor Kanan">
                    <span class="value">${motorRight}</span> 
                </div>
                <div class="item mobil-r">
                    <img src="${vehicleIcon.mobilRight}" alt="Mobil Kanan">
                    <span class="value">${mobilRight}</span> 
                </div>
                <div class="item truk-r">
                    <img src="${vehicleIcon.trukRight}" alt="Truk Kanan">
                    <span class="value">${trukRight}</span> 
                </div>
                <div class="item bus-r">
                    <img src="${vehicleIcon.busRight}" alt="Bus Kanan">
                    <span class="value">${busRight}</span> 
                </div>
            </div>
          </div>

      `;

      cards.appendChild(card);
    });
  }

  // Menambahkan event listener pada tombol "Clear All"
  const clearDataButton = document.getElementById("clearDataButton");
  clearDataButton.addEventListener("click", function () {
    confirmClearAllTrafficData();
  });

  function confirmClearAllTrafficData() {
    // Menampilkan pesan konfirmasi
    const confirmation = confirm("Apakah Anda yakin ingin menghapus semua data lalu lintas?");
    if (confirmation) {
      clearAllTrafficData();
    }
  }

  function clearAllTrafficData() {
    // Menghapus semua data trafficData dari local storage
    localStorage.removeItem("trafficData");

    // Mengosongkan array trafficData
    trafficData = [];

    // Menghapus semua elemen kartu pada halaman
    const cards = document.getElementById("cards");

    cards.innerHTML = ""; // Mengosongkan elemen cards
    showToast("Semua data lalu lintas telah dihapus.");
  }
});

function showToast(message) {
  alert(message);
}

// -------------------------------------------------------------------------------------------------------------------------------

// Ambil URL halaman saat ini
var currentLocation = window.location.href;

// Ambil semua elemen anchor di dalam elemen header
var menuLinks = document.querySelectorAll("header ul li a");

// Loop melalui setiap tautan menu
menuLinks.forEach(function (link) {
  // Jika URL pada tautan sama dengan URL halaman saat ini
  if (link.href === currentLocation) {
    // Tambahkan kelas .active ke tautan yang sesuai
    link.classList.add("active");
  }

  // Tambahkan event listener untuk setiap tautan
  link.addEventListener("click", function () {
    // Hapus kelas .active dari semua tautan
    menuLinks.forEach(function (menuLink) {
      menuLink.classList.remove("active");
    });
    // Tambahkan kelas .active ke tautan yang sedang diklik
    this.classList.add("active");
  });
});
