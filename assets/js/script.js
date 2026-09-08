/* =========================
   OPENING
========================= */

const openingScreen = document.getElementById("openingScreen");
const openBtn = document.getElementById("openBtn");
const mainContent = document.getElementById("mainContent");

openBtn.addEventListener("click", () => {
  openingScreen.classList.add("hide");

  setTimeout(() => {
    mainContent.classList.remove("hidden");
    mainContent.classList.add("show");

    createHearts(8);
  }, 500);
});

/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.scroll);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* =========================
   SECTION REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================
   MEMORY DATA
========================= */

const memories = {
  first: {
    label: "THE BEGINNING",
    title: "Where it all started",
    text: "Setiap cerita pasti punya awal. Dan entah bagaimana, dari sekian banyak orang di dunia, cerita ini mempertemukan kita.",
  },

  moment: {
    label: "LITTLE MOMENTS",
    title: "The little things",
    text: "Kadang bukan momen besar yang paling diingat. Justru percakapan kecil, candaan random, atau hal sederhana yang diam-diam menjadi kenangan.",
  },

  favorite: {
    label: "MY FAVORITE",
    title: "A moment worth keeping",
    text: "Kalau aku boleh menyimpan beberapa momen selamanya, mungkin akan ada banyak momen yang melibatkan kamu di dalamnya.",
  },
};

/* =========================
   MEMORY MODAL
========================= */

const memoryCards = document.querySelectorAll(".memory-card");

const memoryModal = document.getElementById("memoryModal");

const closeModal = document.getElementById("closeModal");

const modalLabel = document.getElementById("modalLabel");

const modalTitle = document.getElementById("modalTitle");

const modalText = document.getElementById("modalText");

memoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.memory;
    const memory = memories[key];

    modalLabel.textContent = memory.label;

    modalTitle.textContent = memory.title;

    modalText.textContent = memory.text;

    memoryModal.classList.add("active");

    createHearts(4);
  });
});

closeModal.addEventListener("click", () => {
  memoryModal.classList.remove("active");
});

memoryModal.addEventListener("click", (event) => {
  if (event.target === memoryModal) {
    memoryModal.classList.remove("active");
  }
});

/* =========================
   QUIZ
========================= */

const quizOptions = document.querySelectorAll(".quiz-option");

const quizResult = document.getElementById("quizResult");

quizOptions.forEach((option) => {
  option.addEventListener("click", () => {
    quizOptions.forEach((item) => {
      item.classList.remove("correct");
      item.classList.remove("wrong");
    });

    if (option.dataset.answer === "correct") {
      option.classList.add("correct");

      quizResult.textContent =
        "Correct. But honestly... there isn't just one thing. ♡";

      createHearts(6);
    } else {
      option.classList.add("wrong");

      quizResult.textContent =
        "Nice try... but you know there's a better answer. 👀";
    }
  });
});

/* =========================
   FLIP CARDS
========================= */

const flipCards = document.querySelectorAll(".flip-card");

flipCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

/* =========================
   LETTER
========================= */

const readLetter = document.getElementById("readLetter");

const letterEnvelope = document.getElementById("letterEnvelope");

const letterPaper = document.getElementById("letterPaper");

readLetter.addEventListener("click", () => {
  letterEnvelope.classList.add("opened");

  setTimeout(() => {
    letterPaper.classList.add("show");

    createHearts(5);
  }, 500);
});

/* =========================
   WISHES
========================= */

const wishButtons = document.querySelectorAll(".wish-buttons button");

const wishMessage = document.getElementById("wishMessage");

const wishes = {
  happiness:
    "Semoga kamu selalu punya alasan untuk tersenyum, bahkan di hari-hari yang sulit. ♡",

  success:
    "Semoga semua usaha dan kerja kerasmu membawa kamu semakin dekat dengan impianmu.",

  dreams:
    "Semoga satu per satu hal yang kamu impikan menemukan jalannya untuk menjadi nyata.",

  love: "Semoga kamu selalu dikelilingi oleh orang-orang yang tulus menyayangi dan menghargaimu. ♡",
};

wishButtons.forEach((button) => {
  button.addEventListener("click", () => {
    wishButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const type = button.dataset.wish;

    wishMessage.textContent = wishes[type];

    createHearts(3);
  });
});

/* =========================
   FINAL SURPRISE
========================= */

const surpriseBtn = document.getElementById("surpriseBtn");

const finalScreen = document.getElementById("finalScreen");

surpriseBtn.addEventListener("click", () => {
  finalScreen.classList.add("active");

  createFinalHearts();
});

/* =========================
   BACK HOME
========================= */

const backHome = document.getElementById("backHome");

backHome.addEventListener("click", () => {
  finalScreen.classList.remove("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =========================
   FLOATING HEART
========================= */

function createHeart() {
  const heart = document.createElement("div");

  heart.className = "float-heart";

  heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.bottom = Math.random() * 20 + "vh";

  heart.style.fontSize = 12 + Math.random() * 20 + "px";

  heart.style.animationDuration = 2 + Math.random() * 2 + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000);
}

function createHearts(amount) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      createHeart();
    }, i * 180);
  }
}

/* =========================
   FINAL HEARTS
========================= */

function createFinalHearts() {
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      createHeart();
    }, i * 100);
  }
}

/* =========================
   RANDOM SMALL HEART
========================= */

setInterval(() => {
  if (document.visibilityState === "visible" && Math.random() > 0.6) {
    createHeart();
  }
}, 5000);

/* =========================
   ESC CLOSE MODAL
========================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    memoryModal.classList.remove("active");
  }
});
