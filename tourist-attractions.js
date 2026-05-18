document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("attractionModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.querySelector(".modal-close");

  function t(key, fallback) {
    if (window.translations && window.currentLang) {
      return window.translations[window.currentLang][key] || fallback;
    }
    return fallback;
  }

  const attractionDetails = {
    citycentre: {
      titleKey: "ta_citycentre_title",
      detailsKey: "ta_citycentre_modal",
      title: "Düsseldorf City Centre",
      details:
        "Düsseldorf City Centre offers shopping, dining, culture and business connections, making it a convenient destination for both leisure and business travellers.",
    },

    oldtown: {
      titleKey: "ta_oldtown_title",
      detailsKey: "ta_oldtown_modal",
      title: "Old Town",
      details:
        "Düsseldorf Old Town is known for its historic streets, restaurants, bars and lively atmosphere, ideal for exploring the city’s local character.",
    },

    rheintower: {
      titleKey: "ta_rheintower_title",
      detailsKey: "ta_rheintower_modal",
      title: "Rhein Tower",
      details:
        "The Rhein Tower is one of Düsseldorf’s most famous landmarks and offers impressive panoramic views over the city and the Rhine.",
    },

    rhinebanks: {
      titleKey: "ta_rhinebanks_title",
      detailsKey: "ta_rhinebanks_modal",
      title: "Banks of the Rhine",
      details:
        "The banks of the Rhine are perfect for scenic walks, relaxed cafés, riverside views and discovering Düsseldorf’s urban atmosphere.",
    },

    koenigsallee: {
      titleKey: "ta_koenigsallee_title",
      detailsKey: "ta_koenigsallee_modal",
      title: "Königsallee",
      details:
        "Königsallee is Düsseldorf’s elegant shopping boulevard, known for luxury boutiques, beautiful city views and a refined atmosphere.",
    },

    gehry: {
      titleKey: "ta_gehry_title",
      detailsKey: "ta_gehry_modal",
      title: "Gehry Bauten",
      details:
        "The Gehry Bauten in Düsseldorf’s Media Harbour are a striking architectural highlight and a popular stop for design and architecture lovers.",
    },
  };

  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.attraction;
      const item = attractionDetails[key];

      if (!item) return;

      modalTitle.textContent = t(item.titleKey, item.title);
      modalDetails.textContent = t(item.detailsKey, item.details);

      modal.classList.add("active");
    });
  });

  if (closeModal) {
    closeModal.onclick = () => modal.classList.remove("active");
  }

  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    };
  }
});