const menuIcon = document.getElementById("sandwich");
const dropdown = document.getElementById("dropdownMenu2");
let opened = false;
let previous600screen = false;


let lastScrollTop = 0;
const headerr = document.getElementById('header');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    headerr.classList.add('header--hidden');
    if(opened == true){
      menuIcon.classList.toggle("rotate");
      dropdown.classList.toggle("open");
      opened = !opened;
    }
  } else {
    // Scrolling up
    headerr.classList.remove('header--hidden');
  }
  lastScrollTop = scrollTop;
});




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

let rightnow = "2025";

let latestButton = document.getElementById("latest");

latestButton.addEventListener("click", () => {
  window.location.href = rightnow;
});
latestButton.addEventListener("mouseover", () => {
  latestButton.style.cursor = "pointer";
  latestButton.style.color = "#ddd";
});
latestButton.addEventListener("mouseout", () => {
  latestButton.style.color = "";
});
function rn() {
   window.location.href = rightnow;
}

const posts = document.querySelectorAll('.main-content div');
const dates = document.querySelectorAll('#toc li');
const timelineBox = document.querySelector('#toc');
const OFFSET = 150; // height of your header
const tocLinks = document.querySelectorAll("#toc a");
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
      const tocc = date.querySelector('a');
      tocc.classList.add("active")

      const dateRect = date.getBoundingClientRect();
      const boxRect = timelineBox.getBoundingClientRect();

      if (dateRect.top < boxRect.top || dateRect.bottom > boxRect.bottom) {
        date.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      const tocc = date.querySelector('a');
      tocc.classList.remove("active")
    }
  });
}
const dateItems = document.querySelectorAll('#toc a');

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

window.addEventListener('scroll', updateHighlightAtOffset);

// const tocLinks = document.querySelectorAll("#toc a");
// const sectionDivs = document.querySelectorAll("#intro, #building-plane, #electronics, #outcome-1, #outcome-2");

// // Scroll Spy: highlight current section
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     const id = entry.target.getAttribute("id");
//     const tocLink = document.querySelector(`#toc a[href="#${id}"]`);

//     if (entry.isIntersecting) {
//       tocLinks.forEach(link => link.classList.remove("active"));
//       if (tocLink) tocLink.classList.add("active");
//     }
//   });
// }, {
//   rootMargin: "-160px 0px -60% 0px", // allow intro to register when it's at top
//   threshold: 0.1 // allow partial visibility to trigger
// });

// sectionDivs.forEach(section => observer.observe(section));

// // Smooth scroll with 150px offset
// tocLinks.forEach(link => {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const targetId = this.getAttribute("href").substring(1);
//     if (!targetId) {
//       // Handle "Intro" case (scroll to top)
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     const targetSection = document.getElementById(targetId);
//     const heading = targetSection.querySelector("h1");

//     if (heading) {
//       const offsetTop = heading.getBoundingClientRect().top + window.pageYOffset - 150;
//       window.scrollTo({ top: offsetTop, behavior: "smooth" });
//     }
//   });
// });





// // Force highlight "Intro" when page loads at top
// window.addEventListener("load", () => {
//   if (window.scrollY === 0) {
//     tocLinks.forEach(link => link.classList.remove("active"));
//     const introLink = document.querySelector('#toc a[href="#"]');
//     if (introLink) introLink.classList.add("active");
//   }
// });

// // Update highlight on scroll back to top
// window.addEventListener("scroll", () => {
//   if (window.scrollY < 160) {
//     tocLinks.forEach(link => link.classList.remove("active"));
//     const introLink = document.querySelector('#toc a[href="#"]');
//     if (introLink) introLink.classList.add("active");
//   }
// });




function positionTOC() {
  const mainContent = document.querySelector('.main-content');
  const toc = document.getElementById('toc');

  if (mainContent && toc) {
    const mainRight = mainContent.getBoundingClientRect().right + window.scrollX;
    const tocLeft = mainRight + 50; // 100px to the right of main content

    toc.style.left = `${tocLeft}px`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  positionTOC();  // runs earlier than window.onload
});

// Run on load and resize
window.addEventListener("load", positionTOC);
window.addEventListener("resize", positionTOC);
const boxxx = document.getElementById('toc');
const stickyStart = 260; // px from top where box starts
const stickyStop = 110;  // px from top where it should stop

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY >= stickyStart - stickyStop) {
    boxxx.style.position = 'fixed';
    boxxx.style.top = `${stickyStop}px`;
  } else {
    boxxx.style.position = 'absolute';
    boxxx.style.top = `${stickyStart}px`;
  }
});