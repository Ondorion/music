//меню категорий товаров

const categoryBtns = document.querySelectorAll('button.category-header__link'),
  body = document.querySelector('body'),
  subcategory = document.querySelectorAll('.submenu-nav__link'),
  subLists = document.querySelectorAll('.block-submenu-nav__list'),
  subMenuElements = document.querySelectorAll('.submenu-nav__item'),
  stockBtn = document.querySelector('.category-header__link-stock');


categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    if (btn.classList.contains('category-header__link--active')) {
      btn.classList.remove('category-header__link--active');
      btn.nextElementSibling.classList.remove('submenu-nav__active');
    } else {
      categoryBtns.forEach(subbtn => {
        subbtn.classList.remove('category-header__link--active');
        subbtn.nextElementSibling.classList.remove('submenu-nav__active');
      });
      btn.classList.add('category-header__link--active');

      btn.nextElementSibling.classList.add('submenu-nav__active');
    }
  });
});

body.addEventListener('click', (e) => {
  const targetElement = e.target;

  if (targetElement.closest('.category-header__item') == null) {
    categoryBtns.forEach(btn => {
      btn.classList.remove('category-header__link--active');
      btn.nextElementSibling.classList.remove('submenu-nav__active');
    });
  }
});



subcategory.forEach(sub => {
  sub.addEventListener('mouseover', (e) => {
    const targetElement = e.target;
    const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
    const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);

    subMenuElements.forEach(menu => {
      menu.classList.remove('submenu-nav__item--active');
    });
    sub.closest('.submenu-nav__item').classList.add('submenu-nav__item--active');
    if (subMenu) {
      subLists.forEach(list => {
        list.classList.remove('block-submenu-nav__list--active');
      });
      subMenu.classList.add('block-submenu-nav__list--active');
    }
  });
});


stockBtn.addEventListener('click', () => {
  stockBtn.classList.toggle('category-header__link-stock--active');

  if (stockBtn.classList.contains('category-header__link-stock--active')) {
    document.querySelectorAll('.stock-submenu-nav').forEach(subitem => {
      subitem.classList.remove('submenu-nav__stock--active');
    });
  } else {

    document.querySelectorAll('.stock-submenu-nav').forEach(subitem => {
      subitem.classList.add('submenu-nav__stock--active');
      console.log('gbfvd');

    });
  }
});

//Слайдер
//1

const swiper = new Swiper('.main-page__slider', {
  speed: 750,
  spaceBetween: 50,
  parallax: true,
  autoplay: {
    delay: 1000,
    stopOnLastSlide: true,

  },
  pagination: {
    el: ".main-page__dots",
  },
});


//2

const swiper1 = new Swiper('.marks__slider', {
  slidesPerView: 7,
  spaceBetween: 25,
  slidesPerGroup: 1,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: ".marks-button-next",
    prevEl: ".marks-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    500: {
      slidesPerView: 3,
    },
    720: {
      slidesPerView: 4,
    },
    850: {
      slidesPerView: 5,
    },
    1020: {
      slidesPerView: 7,
    },
  }
});

//3

const swiper3 = new Swiper('.stock__slider', {
  speed: 400,
  spaceBetween: 20,
  slidesPerView: 2,
  navigation: {
    nextEl: ".stock-arrow-prev",
    prevEl: ".stock-arrow-next",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    750: {
      slidesPerView: 2,
    },
  }
});

const swiper4 = new Swiper('.novelties__slider', {
  speed: 400,
  slidesPerView: 4,
  navigation: {
    nextEl: ".novelties-arrow-next",
    prevEl: ".novelties-arrow-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    515: {
      slidesPerView: 2,
    },
    840: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    }
  }
});


//меню буггер

const burgerMenu = document.querySelector('.burger-menu'),
  addLink = document.querySelector('.header-nav-list__link-add'),
  categoryMenu = document.querySelector('.bottom-header__menu'),
  backBtn = document.querySelector('.bottom-header__back'),
  subBackBtns = document.querySelectorAll('.submenu-nav__back');
subMenuNavs = document.querySelectorAll('.submenu-nav');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('burger-menu--active');
  categoryMenu.classList.remove('bottom-header__menu--active');
  document.querySelector('.header-nav-list').classList.toggle('header-nav-list--active');
});

addLink.addEventListener('click', (e) => {
  e.preventDefault();
  categoryMenu.classList.add('bottom-header__menu--active');
});

backBtn.addEventListener('click', (e) => {
  categoryMenu.classList.remove('bottom-header__menu--active');
});



subBackBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    subMenuNavs.forEach(subMenu => {
      subMenu.classList.remove('submenu-nav__active');
    });

  });
});



//динамический адаптив

function DynamicAdapt(type) {
  this.type = type;
}

DynamicAdapt.prototype.init = function () {
  const _this = this;
  // массив объектов
  this.оbjects = [];
  this.daClassname = "_dynamic_adapt_";
  // массив DOM-элементов
  this.nodes = document.querySelectorAll("[data-da]");

  // наполнение оbjects объктами
  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    const data = node.dataset.da.trim();
    const dataArray = data.split(",");
    const оbject = {};
    оbject.element = node;
    оbject.parent = node.parentNode;
    оbject.destination = document.querySelector(dataArray[0].trim());
    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
    оbject.index = this.indexInParent(оbject.parent, оbject.element);
    this.оbjects.push(оbject);
  }

  this.arraySort(this.оbjects);

  // массив уникальных медиа-запросов
  this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
    return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  });

  // навешивание слушателя на медиа-запрос
  // и вызов обработчика при первом запуске
  for (let i = 0; i < this.mediaQueries.length; i++) {
    const media = this.mediaQueries[i];
    const mediaSplit = String.prototype.split.call(media, ',');
    const matchMedia = window.matchMedia(mediaSplit[0]);
    const mediaBreakpoint = mediaSplit[1];

    // массив объектов с подходящим брейкпоинтом
    const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, оbjectsFilter);
    });
    this.mediaHandler(matchMedia, оbjectsFilter);
  }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  if (matchMedia.matches) {
    for (let i = 0; i < оbjects.length; i++) {
      const оbject = оbjects[i];
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.moveTo(оbject.place, оbject.element, оbject.destination);
    }
  } else {
    for (let i = 0; i < оbjects.length; i++) {
      const оbject = оbjects[i];
      if (оbject.element.classList.contains(this.daClassname)) {
        this.moveBack(оbject.parent, оbject.element, оbject.index);
      }
    }
  }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);
  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }
  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }
  destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);
  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === "min") {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return -1;
        }

        if (a.place === "last" || b.place === "first") {
          return 1;
        }

        return a.place - b.place;
      }

      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return 1;
        }

        if (a.place === "last" || b.place === "first") {
          return -1;
        }

        return b.place - a.place;
      }

      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};

const da = new DynamicAdapt("max");
da.init();

// слайдер фильтр


$(function () {

  var $carousel;
  var $slickCache;
  var previousFilter = '';
  var currentFilter = 'all';
  var filtered = 'false';

  $('.sale__filbtn').on('click', function (event) {
    $(".sale__filbtn").removeClass("active");
    $(this).addClass("active");
    filterHandler(event.currentTarget.value);
  });

  /**
   * Filter function for carousel
   * @param  {String} [tag=''] filter string to be applied
   */
  filterHandler = function (tag) {
    var query = '[data-tags*="' + tag + '"]';
    var slick = $carousel[0].slick;

    // Removes filter state if cache is active ( indicates a filter is applied).
    // Work around for https://github.com/kenwheeler/slick/issues/3161
    if (slick.$slidesCache !== null) {
      slick.unload();
      slick.$slideTrack.children(slick.options.slide).remove();
      $slickCache.appendTo(slick.$slideTrack);
      slick.reinit();
      slick.goTo(0);
    }

    // Store a deep copy of the original carousel
    $slickCache = slick.$slides.clone(true, true);

    // Store the previous filter for reference
    previousFilter = currentFilter;

    // If the filter is being removed
    if (tag === '' || tag === 'all') {

      // Store useful properties. Log
      filtered = false;
      currentFilter = '';

      // A filter is being applied
    } else {
      // Pass custom function to slick to query UI for our target
      slick.filterSlides(function (index, element) {
        return $(element).find(query).length > 0;
      });

      // Reset slider position
      slick.goTo(0);

      // Store useful properties.
      filtered = true;
      currentFilter = tag;
    }

    return currentFilter;
  }



  /*----------  Carousel Slick ----------*/
    $carousel = $('.sale__slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: $('.slider-sale__prev'),
    nextArrow: $('.slider-sale__next'),
    
    infinite: false,
    
    responsive: [{
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 515,
        settings: {
          slidesToShow: 1,
        },
      }
    ],
  });


});