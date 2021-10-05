import jquery from 'jquery';
import './style/covid.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import axios from 'axios';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';

window.$ = window.jQuery = jquery;
const owlCarousel = require('owl.carousel');

$(document).ready(() => {
  $('.owl-carousel').owlCarousel({
  });
});
// $(document).ready(function() {
//     $("#light-slider").lightSlider({
//         pager: false,
//         autoWidth: false,
//         slideMargin: -100
//     });
// });

// axios.get('https://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=f236c6f23d13411ab924ce6172a37a67', {
//   params: {
//     country: 'id',
//     category: 'news',
//     apiKey: 'f236c6f23d13411ab924ce6172a37a67',
//   },
// })
axios.get('https://run.mocky.io/v3/01f96cd5-cc3a-426e-abc1-13c4454e596b')
  .then((res) => {
    const article = res.data.articles;
    console.log('takunjay');
    const articleContainer = document.querySelector('.owl-stage');
    article.forEach((e) => {
      const articleComponent = document.createElement('div');
      articleComponent.classList.add('owl-item');
      const descWord = e.description.split(' ');
      const croppedDesc = [];
      for (let i = 0; i < 10; i++) {
        croppedDesc.push(descWord[i]);
      }
      articleComponent.innerHTML = `
            
                <div class="news-item">
                <a href="${e.url}" target="_blank">
                <img src="${e.urlToImage}" width="100%" height="150px" alt="">
                <p>${e.title}</p>
                <p>${e.author}</p>
                <p>${croppedDesc.join(' ')}<span style="color: #71ACF0">...Read more</span></p>
                </a>
                
                </div>
                `;
      articleContainer.appendChild(articleComponent);
    });
    // console.log(res.data.articles);
    if ($('.owl-carousel').hasClass('owl-theme')) { // resize event was triggering an error, this if statement is to go around it
      $('.owl-carousel').trigger('destroy.owl.carousel'); // these 3 lines kill the owl, and returns the markup to the initial state
      $('.owl-carousel').find('.owl-stage-outer').children().unwrap();
      $('.owl-carousel').removeClass('owl-center owl-loaded owl-text-select-on');

      $('.owl-carousel').owlCarousel({
        items: 3.25,
        nav: true,
        navText: ['<img src="./assets/previous.svg" class="me-5" role="presentation">', '<img src="./assets/next.svg" role="presentation">'],
        pagination: false,
        responsive: {
          0: {
            items: 1.10,
          },
          576: {
            items: 1.25,
          },
          768: {
            items: 2.25,
          },
          992: {
            items: 2.25,
          },
          1280: {
            items: 3.25,
          },
        },
      }); // re-initialise the owl
    }
  });
