// function scrollToAboutSection(section) {
//   // Znajdź sekcję z klasą "about"
//   const aboutSection = document.querySelector(section);

//   // Sprawdź, czy sekcja istnieje
//   if (aboutSection) {
//     // Przewiń do sekcji z płynnością
//     aboutSection.scrollIntoView({
//       behavior: "smooth",
//       block: "start"
//     });
//   } else {
//     console.error('Sekcja z klasą "about" nie została znaleziona.');
//   }
// }

function updateFavicons() {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches; // Sprawdza, czy aktywny jest tryb ciemny

  // Definicje favicon dla jasnego i ciemnego trybu
  const favicons = [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      light: "/img/favicon_black/apple-touch-icon.png",
      dark: "/img/favicon_white/apple-touch-icon.png"
    },
    {
      rel: "icon",
      type: "image/x-icon",
      light: "/img/favicon_black/favicon.ico",
      dark: "/img/favicon_white/favicon.ico"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      light: "/img/favicon_black/favicon-16x16.png",
      dark: "/img/favicon_white/favicon-16x16.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      light: "/img/favicon_black/favicon-32x32.png",
      dark: "/img/favicon_white/favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "48x48",
      light: "/img/favicon_black/favicon-48x48.png",
      dark: "/img/favicon_white/favicon-48x48.png"
    }
  ];

  favicons.forEach(({ rel, type, sizes, light, dark }) => {
    let link = document.querySelector(`link[rel='${rel}'][sizes='${sizes}']`);

    // Jeśli link nie istnieje, utwórz go
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      if (type) link.type = type;
      if (sizes) link.sizes = sizes;
      document.head.appendChild(link);
    }

    // Zmień favicon na odpowiednią wersję
    link.href = darkMode ? dark : light;
  });
}

// Wywołanie funkcji przy pierwszym załadowaniu strony
updateFavicons();

// Nasłuchiwanie zmian w systemowych ustawieniach motywu
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateFavicons);

function scrollToAboutSection(duration = 2000, section) {
  const aboutSection = document.querySelector(section);

  if (!aboutSection) {
    console.error('Sekcja z klasą "about" nie została znaleziona.');
    return;
  }

  const startPosition = window.pageYOffset; // Początkowa pozycja scrolla
  const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset; // Pozycja docelowa
  const distance = targetPosition - startPosition; // Całkowity dystans do przewinięcia
  let startTime = null;

  // Funkcja animacji
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1); // Upewnij się, że nie przekracza 1

    // Easing (płynność)
    const ease = easeInOutQuad(progress);

    window.scrollTo(0, startPosition + distance * ease); // Przewiń do nowej pozycji

    if (timeElapsed < duration) {
      requestAnimationFrame(animation); // Kontynuuj animację
    }
  }

  // Funkcja easing (możesz zmienić na inną)
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  requestAnimationFrame(animation); // Rozpocznij animację
}

let lastScrollTop = 0; // Zmienna do przechowywania ostatniej pozycji scrolla
const nav = document.querySelector("nav"); // Wybór elementu nawigacji

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop; // Aktualna pozycja scrolla

  if (currentScroll > lastScrollTop) {
    // Scrollowanie w dół
    nav.classList.add("off"); // Usunięcie klasy "on"
  } else {
    // Scrollowanie w górę
    nav.classList.remove("off"); // Dodanie klasy "on"
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Aktualizacja ostatniej pozycji scrolla
});

// zmiana tła

// Funkcja do dodawania i usuwania klasy bg2
function toggleBgClass(classPhoto, bgClass) {
  const targetElement = document.querySelector(classPhoto);
  const bodyElement = document.body;
  const logo = document.querySelector(".logo");

  // Użycie Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Dodaj klasę bg2, gdy element jest widoczny
        bodyElement.classList.add(bgClass);
        if (bgClass == "bg1") logo.classList.remove("hide");
      } else {
        // Usuń klasę bg2, gdy element nie jest widoczny
        bodyElement.classList.remove(bgClass);
        if (bgClass == "bg1") logo.classList.add("hide");
      }
    });
  });

  // Obserwuj element
  if (targetElement) {
    observer.observe(targetElement);
  }
}

// Wywołaj funkcję po załadowaniu strony
document.addEventListener("DOMContentLoaded", toggleBgClass(".photo00", "bg1"));
document.addEventListener("DOMContentLoaded", toggleBgClass(".photo01", "bg2"));
document.addEventListener("DOMContentLoaded", toggleBgClass(".photo02", "bg3"));
document.addEventListener("DOMContentLoaded", toggleBgClass(".photo03", "bg4"));
//const header = document.querySelector("header");
//const logo = document.querySelector(".logo");

// const photo01 = document.querySelector(".photo01");
// // Sprawdzamy, czy elementy zostały znalezione
// if (body) {
//   const photo01Bottom = photo01.getBoundingClientRect().bottom;
//   const photo01Top = photo01.getBoundingClientRect().top;
//   // Dodajemy nasłuchiwanie na zdarzenie scroll
//   window.addEventListener("scroll", () => {
//     if (window.scrollY > photo01Bottom || window.scrollY < photo01Top) {
//       body.classList.remove("bg2"); // Dodaj klasę 'hide'
//     } else if (window.scrollY <= photo01Bottom || window.scrollY >= photo01Top - 10)0 {
//       body.classList.add("bg2"); // Usuń klasę 'hide'
//     }
//   });
// }

// Wywołanie funkcji
// scrollToAboutSection(2000); // Przewiń w ciągu 2 sekund

// Wywołanie funkcji
// scrollToAboutSection();
document.querySelector(".link0").addEventListener("click", () => {
  scrollToAboutSection(2000, ".wrapper");
});

document.querySelector(".link1").addEventListener("click", () => {
  scrollToAboutSection(2000, ".about");
});

document.querySelector(".link2").addEventListener("click", () => {
  scrollToAboutSection(3000, ".whatWeDo");
});

document.querySelector(".link3").addEventListener("click", () => {
  scrollToAboutSection(3000, ".leaderboard");
});
