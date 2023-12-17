let trafficData = [];

const API_ENDPOINT = "https://657df4193e3f5b1894635fae.mockapi.io/trafficData";

// const vehicleButtons = document.querySelectorAll(".vehicle-btn button");
// const span = document.querySelectorAll(".vehicle-btn button span");
const resetButton = document.getElementById("btn-reset");
const saveButton = document.getElementById("btn-save");

let vehicles = {
  motorLeft: 0,
  mobilLeft: 0,
  trukLeft: 0,
  busLeft: 0,
  motorRight: 0,
  mobilRight: 0,
  trukRight: 0,
  busRight: 0,
};

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

// Ambil elemen-elemen tombol
const buttons = document.querySelectorAll(".btn-v");

// Loop melalui setiap tombol dan atur teks serta nilai berdasarkan objek kendaraan
buttons.forEach((button) => {
  const id = button.id;
  const spanElement = button.querySelector(`.value-${id}`);

  button.innerHTML = `<img src="${vehicleIcon[id]}" alt="gambar kendaraan">  0`;

  button.addEventListener("click", () => {
    vehicles[id]++; // Tingkatkan nilai pada objek kendaraan saat tombol diklik
    if (spanElement) {
      button.innerHTML = `<img src="${vehicleIcon[id]}" alt="gambar kendaraan">  ${vehicles[id]}`; // Menyesuaikan teks tombol
      spanElement.textContent = vehicles[id]; // Atur nilai pada span di dalam tombol
      console.log("muncul");
    } else {
    }
  });
});

// vehicleButtons.forEach((button) => {
//   // Di bagian dalam loop forEach untuk tombol kendaraan, tambahkan baris ini di dalam fungsi event click
//   button.addEventListener("click", function () {
//     vehicles[button.id]++;
//     button.textContent = `${button.id} : ${vehicles[button.id]}`;
//   });
// });

resetButton.addEventListener("click", function () {
  // Mengatur ulang semua nilai kendaraan menjadi 0
  Object.keys(vehicles).forEach((key) => {
    vehicles[key] = 0;
    // Mengupdate teks pada tombol untuk menampilkan nilai yang sudah direset
    const button = document.querySelector(`#${key}`);
    button.innerHTML = `<img src="${vehicleIcon[key]}" alt="gambar kendaraan">  ${vehicles[key]}`;

    console.log("reset success");
  });
});

saveButton.addEventListener("click", async function () {
  const isEmpty = Object.values(vehicles).every((val) => val === 0);

  if (isEmpty) {
    showToast("Semua data kosong. Tidak dapat menyimpan.");
    return;
  }

  const timestamp = getTimestamp();

  const dataToSave = {
    timeStamp: timestamp,
    vehicle: { ...vehicles },
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    });

    if (response.ok) {
      showToast("Berhasil menyimpan data.");
    } else {
      throw new Error("Gagal menyimpan data.");
    }
  } catch (error) {
    showToast(error.message);
  }
});

function getTimestamp() {
  const now = new Date();
  const jam = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  const hari = getDayName(now.getDay());
  const tanggal = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`;

  return { jam, hari, tanggal };
}

function getDayName(dayIndex) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return days[dayIndex];
}

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
