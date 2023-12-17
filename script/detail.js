const vehicleIcon = {
  motorLeft: "../assets/icon/motor-kiri.png",
  mobilLeft: "../assets/icon/car-kiri.png",
  trukLeft: "../assets/icon/truk-kiri.png",
  busLeft: "../assets/icon/bus-kiri.png",
  motorRight: "../assets/icon/motor-kanan.png",
  mobilRight: "../assets/icon/car-kanan.png",
  trukRight: "../assets/icon/truk-kanan.png",
  busRight: "../assets/icon/bus-kanan.png",
};

const API_ENDPOINT = "https://657df4193e3f5b1894635fae.mockapi.io/trafficData";

document.addEventListener("DOMContentLoaded", async function () {
  const cards = document.getElementById("cards");
  // const clearDataButton = document.getElementById("clearDataButton");

  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error("Terjadi kesalahan saat mengambil data.");
    }

    const trafficData = await response.json();

    if (trafficData.length === 0) {
      const noDataText = document.createElement("p");
      noDataText.textContent = "Belum ada data.";
      noDataText.classList.add("noDataText");
      cards.appendChild(noDataText);

      const addButton = document.createElement("button");
      addButton.innerHTML = `
      <a href="../index.html"><button id="btn-tambah">Tambah Data</button></a>
      `;

      cards.appendChild(addButton);

      // clearDataButton.style.display = "none";
    } else {
      // clearDataButton.style.display = "block";
      displayTrafficDetails(trafficData);
    }
  } catch (error) {
    showToast(error.message);
  }

  async function deleteTrafficData(id) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data dari API.");
      }

      // Hapus card dari halaman setelah berhasil menghapus dari API
      const cardToRemove = document.querySelector(`.card[id="${id}"]`);
      if (cardToRemove) {
        cardToRemove.parentNode.removeChild(cardToRemove);
        showToast("Data berhasil dihapus");
        await displayUpdatedTrafficDetails();
      }
    } catch (error) {
      showToast(error.message);
    }
  }

  function displayTrafficDetails(trafficData) {
    trafficData.forEach((data) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = `${data.id}`;

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
                    <span class="value">${data.vehicle.motorLeft}</span>
                </div>
                <div class="item mobil-l">
                    <img src="${vehicleIcon.mobilLeft}" alt="Mobil Kiri">
                    <span class="value">${data.vehicle.mobilLeft}</span>
                </div>
                <div class="item truk-l">
                    <img src="${vehicleIcon.trukLeft}" alt="Truk Kiri">
                    <span class="value">${data.vehicle.trukLeft}</span>
                </div>
                <div class="item bus-l">
                    <img src="${vehicleIcon.busLeft}" alt="Bus Kiri">
                    <span class="value">${data.vehicle.busLeft}</span>
                </div>
            </div>
            <div class="rv">
                <div class="item motor-r">
                    <img src="${vehicleIcon.motorRight}" alt="Motor Kanan">
                    <span class="value">${data.vehicle.motorRight}</span> 
                </div>
                <div class="item mobil-r">
                    <img src="${vehicleIcon.mobilRight}" alt="Mobil Kanan">
                    <span class="value">${data.vehicle.mobilRight}</span> 
                </div>
                <div class="item truk-r">
                    <img src="${vehicleIcon.trukRight}" alt="Truk Kanan">
                    <span class="value">${data.vehicle.trukRight}</span> 
                </div>
                <div class="item bus-r">
                    <img src="${vehicleIcon.busRight}" alt="Bus Kanan">
                    <span class="value">${data.vehicle.busRight}</span> 
                </div>
            </div>

             <button class="deleteButton" >Delete</button>
          </div>

      `;

      const deleteButton = card.querySelector(".deleteButton");
      deleteButton.setAttribute("data-id", data.id);

      deleteButton.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        deleteTrafficData(id); // Menghapus data berdasarkan ID
      });

      cards.appendChild(card);
    });
  }

  async function displayUpdatedTrafficDetails() {
    const cards = document.getElementById("cards");
    cards.innerHTML = ""; // Menghapus semua card yang ada

    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat mengambil data.");
      }

      const trafficData = await response.json();
      trafficData.forEach((data, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

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
                    <span class="value">${data.vehicle.motorLeft}</span>
                </div>
                <div class="item mobil-l">
                    <img src="${vehicleIcon.mobilLeft}" alt="Mobil Kiri">
                    <span class="value">${data.vehicle.mobilLeft}</span>
                </div>
                <div class="item truk-l">
                    <img src="${vehicleIcon.trukLeft}" alt="Truk Kiri">
                    <span class="value">${data.vehicle.trukLeft}</span>
                </div>
                <div class="item bus-l">
                    <img src="${vehicleIcon.busLeft}" alt="Bus Kiri">
                    <span class="value">${data.vehicle.busLeft}</span>
                    </div>
                    </div>
                    <div class="rv">
                <div class="item motor-r">
                    <img src="${vehicleIcon.motorRight}" alt="Motor Kanan">
                    <span class="value">${data.vehicle.motorRight}</span> 
                    </div>
                <div class="item mobil-r">
                    <img src="${vehicleIcon.mobilRight}" alt="Mobil Kanan">
                    <span class="value">${data.vehicle.mobilRight}</span> 
                    </div>
                    <div class="item truk-r">
                    <img src="${vehicleIcon.trukRight}" alt="Truk Kanan">
                    <span class="value">${data.vehicle.trukRight}</span> 
                </div>
                <div class="item bus-r">
                    <img src="${vehicleIcon.busRight}" alt="Bus Kanan">
                    <span class="value">${data.vehicle.busRight}</span> 
                </div>
            </div>

             <button class="deleteButton" >Delete</button>
          </div>
      `;

        const deleteButton = card.querySelector(".deleteButton");
        deleteButton.setAttribute("data-id", data.id);

        deleteButton.addEventListener("click", (event) => {
          const id = event.target.getAttribute("data-id");
          deleteTrafficData(id); // Menghapus data berdasarkan ID
        });

        cards.appendChild(card);
      });
    } catch (error) {
      showToast(error.message);
    }
  }

  // // Menambahkan event listener pada tombol "Clear All"
  // clearDataButton.addEventListener("click", function () {
  //   clearAllTrafficData();
  // });

  // function confirmClearAllTrafficData() {
  //   // Menampilkan pesan konfirmasi
  //   const confirmation = confirm("Apakah Anda yakin ingin menghapus semua data lalu lintas?");
  //   if (confirmation) {
  //     clearAllTrafficData();
  //   }
  // }

  // async function clearAllTrafficData() {
  //   try {
  //     const response_DELETE = await fetch("https://657df4193e3f5b1894635fae.mockapi.io/trafficData", {
  //       method: "DELETE", // Menggunakan metode DELETE untuk menghapus data
  //     });

  //     if (response_DELETE.ok) {
  //       // Mengosongkan array trafficData
  //       trafficData = [];

  //       // Menghapus semua elemen kartu pada halaman
  //       const cards = document.getElementById("cards");
  //       cards.innerHTML = ""; // Mengosongkan elemen cards

  //       showToast("Semua data lalu lintas telah dihapus dari API.");
  //     } else {
  //       throw new Error("Gagal menghapus data lalu lintas dari API.");
  //     }
  //   } catch (error) {
  //     showToast(error.message);
  //   }
  // }
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
