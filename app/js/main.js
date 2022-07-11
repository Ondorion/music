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

//меню буггер

const burgerMenu = document.querySelector('.burger-menu'),
  addLink = document.querySelector('.header-nav-list__link-add'),
  categoryMenu = document.querySelector('.bottom-header__menu'),
  backBtn = document.querySelector('.bottom-header__back');

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