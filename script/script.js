let trafficData = [];

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

saveButton.addEventListener("click", function () {
  const isEmpty = Object.values(vehicles).every((val) => val === 0);

  if (isEmpty) {
    showToast("Semua data kosong. Tidak dapat menyimpan.");
    return;
  }

  const timestamp = getTimestamp();

  // Mengambil data yang sudah ada dari local storage (jika ada)
  const existingData = JSON.parse(localStorage.getItem("trafficData"));

  let newId;
  if (existingData && existingData.length > 0) {
    newId = existingData[existingData.length - 1].id + 1;
  } else {
    newId = 1;
  }

  const dataToSave = {
    id: newId,
    timeStamp: timestamp,
    vehicle: { ...vehicles },
  };

  // Jika ada data sebelumnya, gabungkan dengan data baru
  if (existingData) {
    existingData.push(dataToSave);
    // Simpan kembali gabungan data lama dan baru ke local storage
    localStorage.setItem("trafficData", JSON.stringify(existingData));
  } else {
    // Jika tidak ada data sebelumnya, buat array baru dan simpan data baru ke dalamnya
    const newData = [dataToSave];
    localStorage.setItem("trafficData", JSON.stringify(newData));
  }

  showToast("Berhasil menyimpan data.");
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
