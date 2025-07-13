const menuIcon = document.getElementById("sandwich");
const dropdown = document.getElementById("dropdownMenu2");
let opened = false;
let previous600screen = false;


const box = document.getElementById('sticky-box');
const rect = box.getBoundingClientRect();
const boxTop = rect.top;
const screenMiddle = window.innerHeight / 2;
const boxInitialTop = box.offsetTop;
const halfBoxHeight = box.offsetHeight / 2;
const stopFixScroll = boxInitialTop + 10000;

if(boxTop < screenMiddle){
  box.style.position = 'fixed';
  box.style.top = `calc(50% - ${halfBoxHeight}px)`;
}



window.onload = function () {
  

  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("rotate");
    dropdown.classList.toggle("open");
    opened = !opened;
  });
};
if (window.innerWidth > 600) {
  previous600screen = true;
  console.log("greater than 600")
 // menuIcon.classList.toggle("rotate");
 //dropdown.classList.toggle("open");
}else{
  previous600screen = false;
}
const dateItems = document.querySelectorAll('.timeline-dates a');

dateItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const yOffset = -130; // Height of the fixed header
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  });
});




window.addEventListener("resize", () => {
  if (window.innerWidth > 600) {
    if(previous600screen == false && opened == true){
      menuIcon.classList.toggle("rotate");
      dropdown.classList.toggle("open");
      console.log("Screen is wider than 600px");
      opened = !opened;
    }
    previous600screen = true;
  } else {
    previous600screen = false;
   // console.log("Screen is 600px or narrower");
  }
});
const posts = document.querySelectorAll('.post');
const dates = document.querySelectorAll('.timeline-dates li');
const timelineBox = document.querySelector('.timeline-box');
const OFFSET = 0; // height of your header

function updateHighlightAtOffset() {
  let closestIndex = 0;
  let minDistance = Infinity;

  posts.forEach((post, index) => {
    const rect = post.getBoundingClientRect();
    const distance = Math.abs(rect.top - OFFSET);

    if (rect.top <= window.innerHeight && distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  dates.forEach((date, index) => {
    if (index === closestIndex) {
      date.style.color = '#3498db';
      date.style.fontWeight = 'bold';

      const dateRect = date.getBoundingClientRect();
      const boxRect = timelineBox.getBoundingClientRect();

      if (dateRect.top < boxRect.top || dateRect.bottom > boxRect.bottom) {
        date.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      date.style.color = '#555';
      date.style.fontWeight = 'normal';
    }
  });
}



window.addEventListener('scroll', updateHighlightAtOffset);


  

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const boxCenterScrollTrigger = boxInitialTop - viewportHeight / 2 + halfBoxHeight;

    if (
      scrollY >= boxCenterScrollTrigger &&
      scrollY < stopFixScroll - viewportHeight / 2 + halfBoxHeight
    ) {
      box.style.position = 'fixed';
      box.style.top = `calc(50% - ${halfBoxHeight}px)`;
    } else if (scrollY >= stopFixScroll - viewportHeight / 2 + halfBoxHeight) {
      box.style.position = 'absolute';
      box.style.top = `${stopFixScroll - viewportHeight / 2}px`;
    } else {
      box.style.position = 'absolute';
      box.style.top = `${boxInitialTop}px`;
    }
  });


/*
const dates = document.querySelectorAll(".timeline-dates li");
const progress = document.querySelector(".timeline-progress");
const timelineScroll = document.querySelector(".timeline-scroll");
const timelineBox = document.querySelector(".timeline-box");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / (docHeight-20);

  // Update progress bar
  progress.style.height = `${scrollPercent * 100}%`;

  // Only one date active based on scroll percentage
  const sectionCount = dates.length;
  const activeIndex = Math.floor(scrollPercent * sectionCount);

  dates.forEach((date, index) => {
    if (index === activeIndex) {
      date.style.color = "#3498db";
      date.style.fontWeight = "bold";

      // Check if the active date is visible inside the scrollable timeline
      const boxTop = timelineBox.getBoundingClientRect().top;
      const boxBottom = timelineBox.getBoundingClientRect().bottom;
      const dateTop = date.getBoundingClientRect().top;
      const dateBottom = date.getBoundingClientRect().bottom;

      const isVisible = dateTop >= boxTop && dateBottom <= boxBottom;

      if (!isVisible) {
        date.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      date.style.color = "#555";
      date.style.fontWeight = "normal";
    }
  });
});*/


let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener("wheel", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY ) {
    if(opened == true){
    menuIcon.classList.toggle("rotate");
    dropdown.classList.toggle("open");
    console.log("scrolled");
    opened = !opened;
    }
    // Scrolling down
    header.classList.add('hidden');
  } else {
    // Scrolling up
    header.classList.remove('hidden');
  }

  lastScrollY = currentScrollY;
});
