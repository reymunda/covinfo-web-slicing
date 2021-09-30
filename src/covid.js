import jquery, { nodeName } from 'jquery';
window.$ = window.jQuery = jquery;
import './style/covid.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../node_modules/lightslider/dist/css/lightslider.css';
require('lightslider');
import axios from 'axios';

$(document).ready(function() {
    $("#light-slider").lightSlider({
        pager: false,
        autoWidth: false,
        slideMargin: -100
    });
});

axios.get('https://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=f236c6f23d13411ab924ce6172a37a67',{
    params: {
        country: 'id',
        category: 'news',
        apiKey: 'f236c6f23d13411ab924ce6172a37a67'

    }
})
    .then(res => {
        const article = res.data.articles;
        const articleContainer = document.querySelector('#light-slider')
        article.forEach(e => {
            const articleComponent =document.createElement('li');
            const descWord = e.description.split(' ');
            const croppedDesc = [];
            for(let i = 0;i < 10;i++){
                croppedDesc.push(descWord[i]);
            }
            articleComponent.innerHTML = `
            <a href="${e.url}" target="_blank">
                <div class=" col-md-3 news-item">
                    <img src="${e.urlToImage}" width="100%" height="150px" alt="">
                    <p>${e.title}</p>
                    <p>${e.author}</p>
                    <p>${croppedDesc.join(" ")}<span style="color: #71ACF0">...Read more</span></p>
                </div>
            </a>
          `
            articleContainer.appendChild(articleComponent);
        })
        // console.log(res.data.articles);
    })