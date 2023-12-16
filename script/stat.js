let trafficData = [];
const dataVehicle = localStorage.getItem("trafficData");
// console.log(dataVehicle);
if (dataVehicle) {
  trafficData = [...JSON.parse(dataVehicle)]; // Menggabungkan dengan data dari local storage
}

console.log(trafficData);

function createChart() {
  const jamData = {}; // Objek untuk menyimpan jumlah kendaraan per jam

  trafficData.forEach((data) => {
    const jam = data.timeStamp.jam;

    if (!jamData[jam]) {
      jamData[jam] = {}; // Inisialisasi objek jamData jika belum ada
    }

    // console.log(jamData);

    // Menghitung jumlah total kendaraan: motor, mobil, truk, dan bus dari kedua sisi jalan (kanan dan kiri)
    const vehiclesCount = data.vehicle;
    const totalVehicles = vehiclesCount.motorRight + vehiclesCount.motorLeft + vehiclesCount.mobilRight + vehiclesCount.mobilLeft + vehiclesCount.trukRight + vehiclesCount.trukLeft + vehiclesCount.busRight + vehiclesCount.busLeft;

    // Menambahkan jumlah total kendaraan per jam ke dalam objek jamData
    if (!jamData[jam].total) {
      jamData[jam].total = 0; // Inisialisasi jumlah total kendaraan jika belum ada
    }
    jamData[jam].total += totalVehicles; // Menambah jumlah total kendaraan per jam
  });

  // Generate label-label jam dari 00:00 hingga 23:59
  const allJamLabels = Array.from({ length: 24 * 60 }, (_, index) => {
    const hour = Math.floor(index / 60); // Mendapatkan nilai jam dari indeks
    const minute = index % 60; // Mendapatkan nilai menit dari indeks
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    return `${formattedHour}:${formattedMinute}`;
  });

  const jamLabels = Array.from({ length: 24 }, (_, index) => {
    const hour = index < 10 ? `0${index}` : `${index}`;
    return `${hour}:00`;
  });

  const labelsWithData = Object.keys(jamData);

  //   Ambil label-label jam yang ada di trafficData
  const sortedLabels = allJamLabels.filter((label) => labelsWithData.includes(label));

  console.log("sorted labels: " + sortedLabels);

  const datasets = [
    {
      label: "Total Kendaraan per jam",
      data: sortedLabels.map((jam) => jamData[jam].total || 0), // Data jumlah total kendaraan per jam
      fill: false,
      borderColor: getRandomColor(),
    },
  ];

  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: sortedLabels, // Menggunakan semua label jam dari 00:00 hingga 23:59
      datasets: datasets,
    },
    options: {
      responsive: true,
    },
  });
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

window.onload = function () {
  createChart();
};

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
