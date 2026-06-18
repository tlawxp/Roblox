(function () {
  // DATA ROBUX
  const allRobuxProducts = [
    {
      amount: "80 Robux",
      price: "Rp 15.000",
      desc: "80 Robux untuk pemain casual.",
    },
    {
      amount: "160 Robux",
      price: "Rp 28.000",
      desc: "Paket hemat 160 Robux.",
    },
    {
      amount: "400 Robux",
      price: "Rp 65.000",
      desc: "400 Robux, best value!",
    },
    {
      amount: "800 Robux",
      price: "Rp 125.000",
      desc: "800 Robux populer.",
    },
    {
      amount: "1,700 Robux",
      price: "Rp 240.000",
      desc: "Paket besar 1.7K Robux.",
    },
    {
      amount: "4,500 Robux",
      price: "Rp 620.000",
      desc: "4.500 Robux + bonus.",
    },
    {
      amount: "10,000 Robux",
      price: "Rp 1.250.000",
      desc: "Paket ultimate 10K.",
    },
    {
      amount: "22,500 Robux",
      price: "Rp 2.800.000",
      desc: "Robux super hemat.",
    },
  ];

  const INITIAL_LOAD = 4;
  let currentIndex = INITIAL_LOAD;
  const priceContainer = document.getElementById("priceContainer");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  // Render produk
  function renderProducts(count) {
    priceContainer.innerHTML = "";
    const itemsToShow = allRobuxProducts.slice(0, count);
    itemsToShow.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "price-card";
      card.innerHTML = `
            <div class="robux-amount">${item.amount}</div>
            <div class="price-tag">${item.price}</div>
            <button class="btn-buy" data-index="${idx}"><i class="fas fa-shopping-cart"></i> Beli</button>
          `;
      priceContainer.appendChild(card);
    });

    // Attach event ke tombol beli
    document.querySelectorAll(".btn-buy").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const index = parseInt(this.getAttribute("data-index"));
        openModal(allRobuxProducts[index]);
      });
    });

    // Sembunyikan tombol load more jika semua sudah tampil
    if (currentIndex >= allRobuxProducts.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-flex";
    }
  }

  // Load more
  loadMoreBtn.addEventListener("click", function () {
    currentIndex += 4;
    if (currentIndex >= allRobuxProducts.length) {
      currentIndex = allRobuxProducts.length;
    }
    renderProducts(currentIndex);
  });

  // Modal functions
  const modal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPrice = document.getElementById("modalPrice");
  const modalWaBtn = document.getElementById("modalWhatsAppBtn");
  let selectedProduct = null;

  window.openModal = function (product) {
    selectedProduct = product;
    modalTitle.textContent = product.amount;
    modalDesc.textContent = product.desc;
    modalPrice.textContent = product.price;
    modal.classList.add("active");
  };

  window.closeModal = function () {
    modal.classList.remove("active");
    selectedProduct = null;
  };

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  // WhatsApp integration
  modalWaBtn.addEventListener("click", function () {
    if (!selectedProduct) return;
    const phoneNumber = "6281234567890"; // ganti dengan nomor WA bisnis
    const message = encodeURIComponent(
      `Halo, saya ingin top up ${selectedProduct.amount} seharga ${selectedProduct.price}. Apakah tersedia?`,
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    closeModal();
  });

  // Dark Mode Toggle
  const body = document.body;
  const darkToggle = document.getElementById("darkToggle");
  const darkSidebar = document.getElementById("darkModeSidebar");

  function enableDark() {
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    updateDarkIcons();
  }
  function disableDark() {
    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    updateDarkIcons();
  }
  function updateDarkIcons() {
    const isDark = body.classList.contains("dark");
    const icon = isDark ? "fa-sun" : "fa-moon";
    if (darkToggle) darkToggle.innerHTML = `<i class="fas ${icon}"></i>`;
    if (darkSidebar)
      darkSidebar.innerHTML = `<i class="fas ${icon}"></i> ${isDark ? "Light Mode" : "Dark Mode"}`;
  }

  darkToggle.addEventListener("click", () => {
    body.classList.contains("dark") ? disableDark() : enableDark();
  });
  darkSidebar.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.contains("dark") ? disableDark() : enableDark();
  });

  // Load tema dari localStorage
  if (localStorage.getItem("theme") === "dark") {
    enableDark();
  } else {
    disableDark();
  }

  // Sidebar mobile toggle
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Tutup sidebar saat klik link di mobile
  document.querySelectorAll(".sidebar nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 850) {
        sidebar.classList.remove("open");
      }
    });
  });

  // Scroll to harga
  window.scrollToHarga = function () {
    document.getElementById("harga").scrollIntoView({ behavior: "smooth" });
  };

  // Initial render
  renderProducts(INITIAL_LOAD);
})();
