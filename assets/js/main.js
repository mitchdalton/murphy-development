
(function() {
  "use strict";

   /**
*   REFERRAL FILE UPLOAD FORM SUBMISSION
*/
  
  const submitRefForm = (formData) => {

    console.log('ABOUT TO FETCH TO THE SERVERLESS FUNCTION!!!! ')
    fetch('../.netlify/functions/sendInc', {
      method: 'POST',
      body: JSON.stringify({
        patientName : formData.patientName,
        docName     : formData.docName,
        serviceReq  : formData.serviceReq,
        radiographs : formData.radiographs,
        comments    : formData.comments,
        apptTime    : formData.apptTime
      })
    }).then(response => {

      console.log('WE FETCHED! WE ARE NOW IN THE THEN STATEMENT. HERE IS THE RESPONSE JSON!!!', response.json())
      return response.json();
    }).then(data => {
      console.log('data from function', data)
      // some kind of UI responding to submission
    })
  }

  const onRefSubmit = (e) => {
    e.preventDefault()
    const formData = {
      patientName : document.getElementById('referral-patient').value,
      docName     : document.getElementById('referring-doctor').value,
      serviceReq  : document.getElementById('service-requested').value,
      radiographs : document.getElementById('radiographs').value,
      comments    : document.getElementById('comments').value,
      apptTime    : document.getElementById('appt-date-time').value,
    }

    submitRefForm(formData); 

    return console.log('JUST MADE THE OBJECT WITH ALL THE STUFF... HERE IT IS!!!!', formData)
  }

  const refForm = document.getElementById('referral-form')
  if (refForm) {
    console.log('REF FORM EXISTS... SUBMITTING!!!')
    refForm.addEventListener('submit', onRefSubmit)
  }

  
  
  
    
    
    
  



/**
* VISUAL EFFECT - elements slide into view on scroll
*/
  const reveal = () => {
    let reveals = document.querySelectorAll(".reveal")
    
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top
      const elementVisible = 75;
      
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active")
      } else {
        reveals[i].classList.remove("active")
      }
    }
  }
  window.addEventListener("scroll", reveal)
  reveal()



  /**
   * VISUAL EFFECT - read more.../read less... functionality
   */
   function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

   let addMoreBtns = document.querySelectorAll('.read-more-button')
   if (addMoreBtns) {
     addMoreBtns.forEach(e => e.addEventListener('click', readMore))
   }

   function readMore() {
    let content = this.parentElement.querySelector('.read-more-content')
    let btn = this
    if (btn.innerText === 'READ MORE...') {
      content.classList.toggle('read-more-content--open')
      content.style.display = 'inline';
      btn.innerText = 'READ LESS...'
    } else {
      content.classList.toggle('read-more-content--open')
      btn.innerText = 'READ MORE...'
      content.style.display = 'block';
      delay(500).then(() => {
        content.parentElement.querySelector('.scroll-this-into-view').scrollIntoView({block: "center"})
      })
    }
   }


      /**
   * <select> form color fix
   */
      function alterColor() {
        const col = this.selectedIndex == 0 ? 'gray' : 'black'
        this.style.color = col
      }
      let selectElements = document.querySelectorAll('.form-select')
      selectElements.forEach(e => e.addEventListener('change', alterColor))

  

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


   

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Gallery Lightbox 
   */
  const galelryLightbox = GLightbox({
    selector: '.galelry-lightbox'
  });

  

})()