// ===== Active link highlight (shared) =====
const page = document.body.dataset.page;
if(page){
  document.querySelectorAll(".nav a").forEach(a => {
    if(a.dataset.page === page) a.classList.add("active");
  });
}


/* ===== Home Image Slider ===== */
(function () {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const track = slider.querySelector(".slider-track");
  const slides = Array.from(slider.querySelectorAll(".slide"));
  const dotsWrap = slider.querySelector(".slider-dots");
  const prevBtn = slider.querySelector('[data-slider="prev"]');
  const nextBtn = slider.querySelector('[data-slider="next"]');

  let index = 0;
  let timer = null;

  function render(){
    track.style.transform = `translateX(${-index * 100}%)`;
    dotsWrap.querySelectorAll(".slider-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-current", i === index ? "true" : "false");
    });
  }

  function go(i){
    index = (i + slides.length) % slides.length;
    render();
  }

  function next(){ go(index + 1); }
  function prev(){ go(index - 1); }

  function buildDots(){
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "slider-dot" + (i === 0 ? " active" : "");
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      b.addEventListener("click", () => {
        stopAuto();
        go(i);
        startAuto();
      });
      dotsWrap.appendChild(b);
    });
  }

  function startAuto(){
    stopAuto();
    timer = setInterval(next, 4000);
  }
  function stopAuto(){
    if(timer) clearInterval(timer);
    timer = null;
  }

  buildDots();
  go(0);
  startAuto();

  nextBtn && nextBtn.addEventListener("click", () => { stopAuto(); next(); startAuto(); });
  prevBtn && prevBtn.addEventListener("click", () => { stopAuto(); prev(); startAuto(); });

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);
  slider.addEventListener("focusin", stopAuto);
  slider.addEventListener("focusout", startAuto);
})();
