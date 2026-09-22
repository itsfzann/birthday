window.addEventListener("DOMContentLoaded", () => {
  const openingScreen = document.getElementById("openingScreen");
  const openBtn = document.getElementById("openBtn");
  const mainContent = document.getElementById("mainContent");
  const bgMusic = document.getElementById("bgMusic");

  if (openingScreen) {
    openingScreen.style.display = "none";
    openingScreen.style.opacity = "0";
    openingScreen.style.visibility = "hidden";
    openingScreen.style.pointerEvents = "none";
    openingScreen.classList.remove("hide");
  }

  if (mainContent) {
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
    mainContent.style.visibility = "visible";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("show");
  }
  const musicPlayer = document.getElementById("musicPlayer");
  const musicToggle = document.getElementById("musicToggle");
  const musicClose = document.getElementById("musicClose");
  const musicStatus = document.getElementById("musicStatus");
  const musicProgress = document.getElementById("musicProgress");
  const currentTimeDisplay = document.getElementById("currentTime");
  const durationDisplay = document.getElementById("duration");
  const volumeControl = document.getElementById("volumeControl");
  const musicTimer = document.getElementById("musicTimer");
  const comparisonSlider = document.getElementById("comparisonSlider");
  const thenImage = document.querySelector(".then-image");
  const sliderLine = document.getElementById("sliderLine");
  const readLetter = document.getElementById("readLetter");
  const letterEnvelope = document.getElementById("letterEnvelope");
  const letterPaper = document.getElementById("letterPaper");
  const quizResult = document.getElementById("quizResult");
  const wishMessage = document.getElementById("wishMessage");
  const surpriseBtn = document.getElementById("surpriseBtn");
  const finalScreen = document.getElementById("finalScreen");
  const backHome = document.getElementById("backHome");

  let musicTimerTimeout = null;

  if (bgMusic) {
    bgMusic.volume = 0.35;
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${secondsPart}`;
  }

  function setMusicStatus(message) {
    if (musicStatus) {
      musicStatus.textContent = message;
    }
  }

  function updateMusicUI() {
    if (!bgMusic || !Number.isFinite(bgMusic.duration)) {
      return;
    }

    const progress =
      bgMusic.duration > 0 ? (bgMusic.currentTime / bgMusic.duration) * 100 : 0;

    if (musicProgress) {
      musicProgress.value = progress;
    }

    if (currentTimeDisplay) {
      currentTimeDisplay.textContent = formatTime(bgMusic.currentTime);
    }

    if (durationDisplay) {
      durationDisplay.textContent = formatTime(bgMusic.duration);
    }
  }

  function playMusic() {
    if (!bgMusic) {
      return;
    }

    if (musicPlayer) {
      musicPlayer.classList.add("active");
    }

    if (musicToggle) {
      musicToggle.textContent = "Ⅱ";
    }

    setMusicStatus("Playing");

    const playPromise = bgMusic.play();

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          if (musicPlayer) {
            musicPlayer.classList.add("active");
          }

          if (musicToggle) {
            musicToggle.textContent = "Ⅱ";
          }

          setMusicStatus("Playing");
        })
        .catch(() => {
          if (musicToggle) {
            musicToggle.textContent = "▶";
          }
          setMusicStatus("Klik play untuk memulai");
        });
    }
  }

  function pauseMusic() {
    if (!bgMusic) {
      return;
    }

    bgMusic.pause();

    if (musicPlayer) {
      musicPlayer.classList.add("active");
    }

    if (musicToggle) {
      musicToggle.textContent = "▶";
    }

    setMusicStatus("Paused");
  }

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "float-heart";
    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.bottom = `${Math.random() * 20}vh`;
    heart.style.fontSize = `${12 + Math.random() * 20}px`;
    heart.style.animationDuration = `${2 + Math.random() * 2}s`;
    document.body.appendChild(heart);

    window.setTimeout(() => {
      heart.remove();
    }, 4000);
  }

  function burstConfetti(amount = 80) {
    const palette = ["#f5b4c8", "#b5d7ff", "#f6e7a8", "#b9f0d1", "#d9c3ff"];

    for (let index = 0; index < amount; index += 1) {
      const confetti = document.createElement("span");
      confetti.className = "confetti-piece";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.background =
        palette[Math.floor(Math.random() * palette.length)];
      confetti.style.animationDelay = `${(Math.random() * 0.35).toFixed(2)}s`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(confetti);
    }

    window.setTimeout(() => {
      document
        .querySelectorAll(".confetti-piece")
        .forEach((piece) => piece.remove());
    }, 2600);
  }

  function createHearts(amount = 10) {
    for (let index = 0; index < amount; index += 1) {
      window.setTimeout(() => {
        createHeart();
      }, index * 180);
    }
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      if (openingScreen) {
        openingScreen.classList.add("hide");
        openingScreen.style.opacity = "0";
        openingScreen.style.visibility = "hidden";
        openingScreen.style.pointerEvents = "none";
      }

      if (mainContent) {
        mainContent.classList.remove("hidden");
        mainContent.classList.add("show");
        mainContent.style.display = "block";
        mainContent.style.opacity = "1";
        mainContent.style.visibility = "visible";
      }

      if (musicPlayer) {
        musicPlayer.classList.add("active");
      }

      window.setTimeout(() => {
        if (openingScreen) {
          openingScreen.style.display = "none";
        }
      }, 650);

      createHearts(8);
    });
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (!bgMusic) {
        return;
      }

      if (bgMusic.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    });

    musicToggle.setAttribute("aria-label", "Main music toggle");
  }

  if (musicClose) {
    musicClose.addEventListener("click", () => {
      pauseMusic();

      if (musicPlayer) {
        musicPlayer.classList.remove("active");
      }
    });
  }

  if (bgMusic) {
    bgMusic.muted = false;
    bgMusic.volume = 0.35;
    bgMusic.pause();

    bgMusic.addEventListener("timeupdate", updateMusicUI);
    bgMusic.addEventListener("loadedmetadata", () => {
      if (durationDisplay) {
        durationDisplay.textContent = formatTime(bgMusic.duration);
      }
    });
    bgMusic.addEventListener("play", () => {
      if (musicToggle) {
        musicToggle.textContent = "Ⅱ";
      }
      setMusicStatus("Playing");
    });
    bgMusic.addEventListener("pause", () => {
      if (musicToggle) {
        musicToggle.textContent = "▶";
      }

      if (musicStatus && musicStatus.textContent !== "Timer selesai") {
        setMusicStatus("Paused");
      }
    });
    bgMusic.addEventListener("ended", () => {
      if (musicToggle) {
        musicToggle.textContent = "▶";
      }
      setMusicStatus("Paused");
    });
    bgMusic.addEventListener("error", () => {
      setMusicStatus("Klik play untuk memulai");
    });
  }

  if (musicProgress && bgMusic) {
    musicProgress.addEventListener("input", () => {
      if (!Number.isFinite(bgMusic.duration)) {
        return;
      }

      bgMusic.currentTime =
        (Number(musicProgress.value) / 100) * bgMusic.duration;
    });
  }

  if (volumeControl && bgMusic) {
    volumeControl.addEventListener("input", () => {
      bgMusic.volume = Number(volumeControl.value) || 0;
    });
  }

  if (musicTimer) {
    musicTimer.addEventListener("change", () => {
      window.clearTimeout(musicTimerTimeout);

      const selectedSeconds = Number(musicTimer.value);

      if (selectedSeconds === 0) {
        setMusicStatus(bgMusic && !bgMusic.paused ? "Playing" : "Paused");
        return;
      }

      setMusicStatus(`Timer ${selectedSeconds / 60} menit`);

      musicTimerTimeout = window.setTimeout(() => {
        pauseMusic();
        if (musicTimer) {
          musicTimer.value = "0";
        }
        setMusicStatus("Timer selesai");
      }, selectedSeconds * 1000);
    });
  }

  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.scroll;

      if (button.classList.contains("primary-btn") && musicPlayer) {
        musicPlayer.classList.add("active");

        if (bgMusic && bgMusic.paused) {
          playMusic();
        }
      }

      if (!targetId) {
        return;
      }

      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  function initializeReveal() {
    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

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

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  initializeReveal();

  function updateComparison() {
    if (!comparisonSlider || !thenImage || !sliderLine) {
      return;
    }

    const value = Number(comparisonSlider.value);
    thenImage.style.width = `${value}%`;
    sliderLine.style.left = `${value}%`;
  }

  if (comparisonSlider) {
    comparisonSlider.addEventListener("input", updateComparison);
    updateComparison();
  }

  document.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
      card.classList.toggle("active");
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });

  const quizOptions = document.querySelectorAll(".quiz-option");
  quizOptions.forEach((option) => {
    option.addEventListener("click", () => {
      quizOptions.forEach((item) => {
        item.classList.remove("correct", "wrong");
      });

      if (option.dataset.answer === "correct") {
        option.classList.add("correct");
        if (quizResult) {
          quizResult.textContent =
            "Correct. But honestly... there isn't just one thing. ♡";
        }
        createHearts(6);
        burstConfetti(80);
      } else {
        option.classList.add("wrong");
        if (quizResult) {
          quizResult.textContent =
            "Nice try... but you know there's a better answer. 👀";
        }
      }
    });
  });

  if (readLetter) {
    readLetter.addEventListener("click", (event) => {
      event.preventDefault();

      if (letterEnvelope) {
        letterEnvelope.classList.add("opened");
      }

      window.setTimeout(() => {
        if (letterPaper) {
          letterPaper.classList.add("show");
        }
        createHearts(5);
        burstConfetti(60);
      }, 500);
    });
  }

  const wishes = {
    happiness:
      "Semoga kamu selalu punya alasan untuk tersenyum, bahkan di hari-hari yang sulit. ♡",
    success:
      "Semoga semua usaha dan kerja kerasmu membawa kamu semakin dekat dengan impianmu.",
    dreams:
      "Semoga satu per satu hal yang kamu impikan menemukan jalannya untuk menjadi nyata.",
    love: "Semoga kamu selalu dikelilingi oleh orang-orang yang tulus menyayangi dan menghargaimu. ♡",
  };

  document.querySelectorAll(".wish-buttons button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".wish-buttons button").forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const selectedWish = button.dataset.wish;
      if (wishMessage) {
        wishMessage.textContent = wishes[selectedWish] || "Choose one ♡";
      }

      createHearts(3);
    });
  });

  const galleryLightbox = document.getElementById("galleryLightbox");
  const galleryImage = document.getElementById("galleryImage");
  const galleryClose = document.getElementById("galleryClose");

  function openGalleryModal(imageElement) {
    if (!galleryLightbox || !galleryImage || !imageElement) {
      return;
    }

    galleryImage.src = imageElement.src;
    galleryImage.alt = imageElement.alt || "Photo gallery";
    galleryLightbox.classList.add("active");
    galleryLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeGalleryModal() {
    if (!galleryLightbox) {
      return;
    }

    galleryLightbox.classList.remove("active");
    galleryLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  document
    .querySelectorAll(".now-photo img, .photo-frame img, .comparison-image img")
    .forEach((image) => {
      image.addEventListener("click", () => {
        openGalleryModal(image);
      });
    });

  if (galleryClose) {
    galleryClose.addEventListener("click", closeGalleryModal);
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener("click", (event) => {
      if (event.target === galleryLightbox) {
        closeGalleryModal();
      }
    });
  }

  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {
      if (finalScreen) {
        finalScreen.classList.add("active");
      }

      if (bgMusic) {
        bgMusic.volume = 0.35;
        if (bgMusic.paused) {
          playMusic();
        }
      }

      createHearts(30);
      burstConfetti(120);
    });
  }

  if (backHome) {
    backHome.addEventListener("click", () => {
      if (finalScreen) {
        finalScreen.classList.remove("active");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (finalScreen) {
        finalScreen.classList.remove("active");
      }

      if (galleryLightbox && galleryLightbox.classList.contains("active")) {
        closeGalleryModal();
      }
    }
  });
});
