// 




const JSCarousel = ({
  carouselSelector,
  slideSelector,
  enablePagination = true,
  autoPlay = true,
  autoPlayInterval = 1000 // milliseconds
}) => {
  let currentSlideIndex = 0;
  let prevBtn, nextBtn;
  let paginationContainer;
  let autoPlayIntervalId; // Interval ID for auto-play

  const carousel = document.querySelector(carouselSelector);
  if (!carousel) {
    console.error("Specify a valid selector for the carousel.");
    return null;
  }

  const slides = carousel.querySelectorAll(slideSelector);
  if (!slides.length) {
    console.error("Specify a valid selector for slides.");
    return null;
  }

  const addElement = (tag, attributes, children) => {
    const element = document.createElement(tag);

    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    if (children) {
      if (typeof children === "string") {
        element.textContent = children;
      } else {
        children.forEach((child) => {
          if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
          } else {
            element.appendChild(child);
          }
        });
      }
    }

    return element;
  };

  const tweakStructure = () => {
    carousel.setAttribute("tabindex", "0");

    const carouselInner = addElement("div", {
      class: "carousel-inner"
    });
    carousel.insertBefore(carouselInner, slides[0]);

    slides.forEach((slide) => {
      carouselInner.appendChild(slide);
    });

    prevBtn = addElement(
      "button",
      {
        class: "carousel-btn carousel-btn--prev-next carousel-btn--prev",
        "aria-label": "Previous Slide"
      },
      "<"
    );
    carouselInner.appendChild(prevBtn);

    nextBtn = addElement(
      "button",
      {
        class: "carousel-btn carousel-btn--prev-next carousel-btn--next",
        "aria-label": "Next Slide"
      },
      ">"
    );
    carouselInner.appendChild(nextBtn);

    if (enablePagination) {
      paginationContainer = addElement("nav", {
        class: "carousel-pagination",
        role: "tablist"
      });
      carousel.appendChild(paginationContainer);
    }

    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 100}%)`;
      if (enablePagination) {
        const paginationBtn = addElement(
          "button",
          {
            class: `carousel-btn carousel-btn--pagination`,
            role: "tab"
          },
          `${index + 1}`
        );

        paginationContainer.appendChild(paginationBtn);

        if (index === 0) {
          paginationBtn.classList.add("carousel-btn--active");
          paginationBtn.setAttribute("aria-selected", true);
        }

        paginationBtn.addEventListener("click", () => {
          handlePaginationBtnClick(index);
        });
      }
    });
  };

  const adjustSlidePosition = () => {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlideIndex)}%)`;
    });
  };

  const updatePaginationBtns = () => {
    const paginationBtns = paginationContainer.children;
    const prevActiveBtns = Array.from(paginationBtns).filter((btn) =>
      btn.classList.contains("carousel-btn--active")
    );
    prevActiveBtns.forEach((btn) => {
      btn.classList.remove("carousel-btn--active");
      btn.removeAttribute("aria-selected");
    });

    const currActiveBtns = paginationBtns[currentSlideIndex];
    if (currActiveBtns) {
      currActiveBtns.classList.add("carousel-btn--active");
      currActiveBtns.setAttribute("aria-selected", true);
    }
  };

  const updateCarouselState = () => {
    if (enablePagination) {
      updatePaginationBtns();
    }
    adjustSlidePosition();
  };

  const moveSlide = (direction) => {
    const newSlideIndex =
      direction === "next"
        ? (currentSlideIndex + 1) % slides.length
        : (currentSlideIndex - 1 + slides.length) % slides.length;
    currentSlideIndex = newSlideIndex;
    updateCarouselState();
  };

  const handlePaginationBtnClick = (index) => {
    currentSlideIndex = index;
    updateCarouselState();
  };

  const handlePrevBtnClick = () => moveSlide("prev");
  const handleNextBtnClick = () => moveSlide("next");

  const attachEventListeners = () => {
    prevBtn.addEventListener("click", handlePrevBtnClick);
    nextBtn.addEventListener("click", handleNextBtnClick);
  };

  const autoPlayNextSlide = () => {
    moveSlide("next");
  };

  const startAutoPlay = () => {
    autoPlayIntervalId = setInterval(autoPlayNextSlide, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayIntervalId);
  };

  const create = () => {
    tweakStructure();
    attachEventListeners();

    if (autoPlay) {
      startAutoPlay();
    }
  };

  const destroy = () => {
    prevBtn.removeEventListener("click", handlePrevBtnClick);
    nextBtn.removeEventListener("click", handleNextBtnClick);
    if (enablePagination) {
      const paginationBtns = paginationContainer.querySelectorAll(
        ".carousel-btn"
      );
      if (paginationBtns.length) {
        paginationBtns.forEach((btn) => {
          btn.removeEventListener("click", handlePaginationBtnClick);
        });
      }
    }
    if (autoPlay) {
      carousel.removeEventListener("mouseenter", stopAutoPlay);
      carousel.removeEventListener("mouseleave", startAutoPlay);
      stopAutoPlay();
    }
  };

  return { create, destroy };
};

const carousel1 = JSCarousel({
  carouselSelector: "#carousel-1",
  slideSelector: ".slide",
  enablePagination: true,
  autoPlay: true,
  autoPlayInterval: 3000
});
carousel1.create();

window.addEventListener("unload", () => {
  carousel1.destroy();
});
