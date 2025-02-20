const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show')
    })
  }
}
showMenu('nav-toggle', 'nav-menu')

const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
  const navMenu = document.getElementById('nav-menu')
  // When I click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// scroll sections active link
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollDown = window.scrollY

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link')
    } else {
      sectionsClass.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

// scroll reveal animation
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });
// Skills animation

document.addEventListener('DOMContentLoaded', () => {
  const skillBars = document.querySelectorAll('.skills__bar');
  skillBars.forEach(bar => {
    const percentageSpan = bar.closest('.skills__data').querySelector('.skills__percentage');
    const percentage = parseFloat(percentageSpan.textContent);
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = `${percentage}%`;
    }, 500);
  });
});

// Toast notification
const sendButton = document.querySelector('.contact__button');
const toast = document.getElementById('toast');



//the condition
if (sendButton && toast) {
  sendButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    const emailInput = document.querySelector('.contact__input[type="mail"]');
    const messageInput = document.querySelector('textarea.contact__input');
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
      toast.style.display = 'block';
    } else if (!emailRegex.test(email)) {
      toast.textContent = 'Please enter a valid email';
      toast.style.display = 'block';
    } else if (message === '') {
      toast.textContent = 'Please add your message';
      toast.style.display = 'block';
    } else {
      toast.textContent = "Thanks for your message, I'll reach out soon";
      toast.style.display = 'block';
      // form values
      const nameInput = document.querySelector('.contact__input[type="text"]');
      const name = nameInput.value.trim();
      const contactData = {
        name: name,
        email: email,
        message: message,
      };

      // Console log the JSON object
      console.log("Received contact data:\n", JSON.stringify(contactData, null, 2));

      // // an output for my js when the form is submitted
    }

    setTimeout(() => {
      toast.style.display = 'none';
      toast.textContent = "Thanks for your message, I'll reach out soon"; // Reset the text
    }, 3000); // Hide the toast after 3 seconds
  });
}
