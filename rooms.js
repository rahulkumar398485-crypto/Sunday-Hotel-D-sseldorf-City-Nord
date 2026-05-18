document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("roomModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.querySelector(".modal-close");

  function t(key, fallback) {
    if (window.translations && window.currentLang) {
      return window.translations[window.currentLang][key] || fallback;
    }
    return fallback;
  }

  const roomDetails = {
    standardSingle: {
      titleKey: "room_standard_single_modal_title",
      detailsKey: "room_standard_single_modal",
      title: "Standard Single Room",
      details:
        "A comfortable room for single occupancy with comfortable bedding, free Wi-Fi, flat-screen TV, a workspace desk by the window and a modern bathroom with large shower, hairdryer, vanity mirror and heat lamp.",
    },

    standardDouble: {
      titleKey: "room_standard_double_modal_title",
      detailsKey: "room_standard_double_modal",
      title: "Standard Double Room",
      details:
        "A comfortable double room for single or double occupancy, ideal for business travellers, leisure guests and transit stays. Includes free Wi-Fi, flat-screen TV, workspace desk and modern bathroom amenities.",
    },

    twin: {
      titleKey: "room_twin_modal_title",
      detailsKey: "room_twin_modal",
      title: "Twin Room",
      details:
        "A practical twin room with comfortable bedding, free Wi-Fi, flat-screen TV, workspace desk and modern bathroom facilities, ideal for colleagues, friends or group travellers.",
    },

    superior: {
      titleKey: "room_superior_modal_title",
      detailsKey: "room_superior_modal",
      title: "Superior Room",
      details:
        "A spacious room option with enhanced comfort, modern amenities, free Wi-Fi, flat-screen TV, workspace desk and a relaxing atmosphere for work or leisure.",
    },

    family: {
      titleKey: "room_family_modal_title",
      detailsKey: "room_family_modal",
      title: "Family Room",
      details:
        "A comfortable room option for families with flexible space, comfortable bedding, free Wi-Fi, flat-screen TV, modern bathroom amenities and pet-friendly options available.",
    },
  };

  document.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.room;
      const room = roomDetails[key];

      if (!room || !modal) return;

      modalTitle.textContent = t(room.titleKey, room.title);
      modalDetails.textContent = t(room.detailsKey, room.details);

      modal.classList.add("active");
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  const animatedElements = document.querySelectorAll("[data-animate]");

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  const filters = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".room-card");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const type = card.dataset.type;

        if (filter === "all" || filter === type) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
});