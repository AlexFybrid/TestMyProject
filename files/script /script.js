const swup = new Swup({
  plugins: [
    new SwupProgressPlugin({
      className: 'swup-progress-bar',
      transition: 500,
      delay: 200,
      initialValue: 0,
      hideImmediately: true
    }),
    new SwupPreloadPlugin({
      requestSize: 4, // количество страниц для предзагрузки
      // injectionSelector: '[data-swup-preload]', // селектор ссылок для предзагрузки

    })
  ]
});

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
});








function scrollto (){
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const offset = -(window.innerHeight / 4);
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        scroll.scrollTo(target, {
          offset: offset,
        });
      }
    });
  });

}







function swupActiveLinks() {
  let currentPath = window.location.pathname;
  let links = document.querySelectorAll('nav a'); // <- put your link selector here
  for (const link of links) {
    let linkPath = (new URL(link.href)).pathname;
    link.ariaCurrent = linkPath == currentPath ? 'page' : false;
  }
}



PrewBar = function () {
  scroll.on('scroll', (obj) => {
    const bar = document.querySelector('.progress-bar');
    const scrollPercentage = obj.scroll.y / obj.limit.y;

    if (scrollPercentage >= 0.1 && scrollPercentage <= 0.8) {
      const scale = (scrollPercentage - 0.1) * 94;
      bar.style.top = `${scale}%`;
    } else {
      bar.style.top = 'none';
    }
  });



}


scaleIMG = function () {
  scroll.on('scroll', (obj) => {
    const scrollPercentage = obj.scroll.y / obj.limit.y;
    const image = document.querySelector('.scroll-image');
    const percentage = document.querySelector('.percentage');


    
    if (scrollPercentage >= 0.8) {
      const scale = 1 + (scrollPercentage - 0.8) * 5;
      image.style.transform = `scale(${scale})`;

      percentage.textContent = `${Math.round((scale - 1) / 0.01) * 1}%`;

      if (scrollPercentage >= 1) {
        swup.loadPage({
          url: 'index4.html'
        });
      }
    } else {

      image.style.transform = 'none';
      percentage.textContent = '0%';
    }
  });
}










swup.on('contentReplaced', () => { 
  
  Reload();
  swupActiveLinks();

});

Reload();
swupActiveLinks();
resize();

async function Reload() {
  await new Promise((resolve, reject) => {
    scroll.destroy();
    resolve();
  });

  await new Promise((resolve, reject) => {
    scroll.init();
    resolve();
  });

  await new Promise((resolve, reject) => {
    PrewBar();
    resolve();
    scrollto();
  });

  scaleIMG();
}

function resize() {

  var resizeTimeout;
  window.addEventListener('resize', function () {
    // Если есть запланированный вызов функции, отменяем его
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    // Добавляем свойство opacity 0 к объекту .prew_bar
    prewBar.style.transition = '0.1s';
    prewBar.style.opacity = 0;
    imgbox.style.opacity = 0;

    resizeTimeout = setTimeout(function () {
      // Выполняем функцию через задержку
      scroll.update();

      // Возвращаем свойство opacity 1 к объекту .prew_bar
      prewBar.style.transition = '0.5s';
      prewBar.style.opacity = 1;
      imgbox.style.opacity = 1;
    }, 1000);
  });
}


// function reloadPage() {
//   swup.loadPage(window.location.href);
// }


// window.addEventListener('resize', function () {
//   reloadPage();
// });

