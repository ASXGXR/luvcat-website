document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById("image-track");

  const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

  const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
  }

  const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    const animationDuration = isMobileDevice() ? 600 : 1200; // Adjust duration for mobile devices

    track.animate({
      transform: `translateX(${nextPercentage}%)`
    }, { duration: animationDuration, fill: "forwards" });

    // for (const image of track.getElementsByClassName("image")) {
    //   image.style.objectPosition = `${100 + nextPercentage}% center`;
    // }
  }

  window.onmousedown = e => handleOnDown(e);

  window.ontouchstart = e => handleOnDown(e.touches[0]);

  window.onmouseup = e => handleOnUp(e);

  window.ontouchend = e => handleOnUp(e.touches[0]);

  window.onmousemove = e => handleOnMove(e);

  window.ontouchmove = e => handleOnMove(e.touches[0]);


  // NAV BAR

  const navbarLinks = document.querySelectorAll('.navbar a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const current = entry.target.getAttribute('id');
        navbarLinks.forEach(link => {
          if (link.getAttribute('href') === `#${current}`) {
            navbarLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    });
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

});
