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

// Funkcja, która dodaje klasę 'hide' do <div class="logo">
const body = document.querySelector("body");
const header = document.querySelector("header");
const logo = document.querySelector(".logo");

// Sprawdzamy, czy elementy zostały znalezione
if (header && logo) {
  const headerBottom = header.getBoundingClientRect().bottom;

  // Dodajemy nasłuchiwanie na zdarzenie scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > headerBottom) {
      logo.classList.add("hide"); // Dodaj klasę 'hide'
      body.classList.remove("bg1");
    } else {
      logo.classList.remove("hide"); // Usuń klasę 'hide'
      body.classList.add("bg1");
    }
  });
}

// zmiana tła

// Funkcja do dodawania i usuwania klasy bg2
function toggleBgClass(classPhoto, bgClass) {
  const targetElement = document.querySelector(classPhoto);
  const bodyElement = document.body;

  // Użycie Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Dodaj klasę bg2, gdy element jest widoczny
        bodyElement.classList.add(bgClass);
      } else {
        // Usuń klasę bg2, gdy element nie jest widoczny
        bodyElement.classList.remove(bgClass);
      }
    });
  });

  // Obserwuj element
  if (targetElement) {
    observer.observe(targetElement);
  }
}

// Wywołaj funkcję po załadowaniu strony
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
  scrollToAboutSection(4000, ".wrapper");
});

document.querySelector(".link1").addEventListener("click", () => {
  scrollToAboutSection(4000, ".about");
});

document.querySelector(".link2").addEventListener("click", () => {
  scrollToAboutSection(4000, ".whatWeDo");
});

document.querySelector(".link3").addEventListener("click", () => {
  scrollToAboutSection(4000, ".leaderboard");
});
