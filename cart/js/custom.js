// AJAX & LOCALSTORAGE FUNCTIONS
function ajaxCallback(file, success) {
  $.ajax({
    type: "get",
    url: "data/" + file,
    success: success,
  });
}
function createLS(name) {
  ajaxCallback(name + ".json", function (data) {
    localStorage.setItem(name, JSON.stringify(data));
  });
}
function getLS(name) {
  return JSON.parse(localStorage.getItem(name));
}
function setLS(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

function removeLS(name) {
  localStorage.removeItem(name);
}

// RENDER FUNCTIONS

function renderNav() {
  createLS("navigation");
  var navItems = getLS("navigation");

  var url = window.location.pathname;
  mobileNav();
  mainNav();
  function mainNav() {
    var html = `<div class="container">
                <div class="row">
                    <div class="col-lg-3">
                    <div class="header__logo">
                        <a href="index.html"><img src="img/logo.png" alt="Logo" /></a>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <nav class="header__menu">
                        <ul>`;
    navItems.forEach((el) => {
      html += `<li class="${el.name == url ? "active" : ""}"><a href="./${
        el.href
      }">${el.title}</a></li>`;
    });
    html += `</ul>
                    </nav>
                    </div>
                    <div class="col-lg-3">
                    <div class="header__cart">
                        <ul>
                        <li>
                            <a href="cart.html"
                            ><i class="fa fa-shopping-bag"></i>  <div class="cartSpan"> </div></a
                            >
                        </li>
                        </ul>
                        <div class="header__cart__price"><div class="priceSpan"> </div></div>
                    </div>
                    </div>
                </div>
                <div class="humberger__open">
                    <i class="fa fa-bars"></i>
                </div>
                </div>`;

    $("#headerWrap").html(html);
  }

  function mobileNav() {
    createLS("icons");
    createLS("navigation");

    var icons = getLS("icons");
    var navItems = getLS("navigation");

    var html = `<div class="humberger__menu__logo">
    <a href="index.html"><img src="img/logo.png" alt="logo" /></a>
  </div>
  <div class="humberger__menu__cart">
    <ul>
      <li>
        <a href="#"><i class="fa fa-shopping-bag"></i>  <div class="cartSpan"> </div></a>
      </li>
    </ul>
    <div class="header__cart__price"> <div class="priceSpan"> </div></span></div>
  </div>
  <nav class="humberger__menu__nav mobile-menu">
  <ul class="list-unstyled">`;

    navItems.forEach((el) => {
      html += `
      <li><a class="text-dark"  href="./${el.href}">${el.title}</a></li>`;
    });

    html += `</ul> 
  </nav>
  </div>
  <div class="header__top__right__social">
  `;
    icons.forEach((el) => {
      html += `
      <a href="${el.href}"><i class="${el.class}"></i></a>`;
    });
    html += `
  </div>
  <div class="humberger__menu__contact">
    <ul>
      <li><i class="fa fa-envelope"></i> ogani@staff.com</li>
      <li>Free Shipping for all Order of $99</li>
    </ul>
  </div>`;

    $("#mobileNav").html(html);
  }
}

function renderHero() {
  renderCategories();
  renderCover();
  function renderCategories() {
    createLS("categories");
    var categories = getLS("categories");

    var html = `<div class="hero__categories">
                    <div class="hero__categories__all">
                    <i class="fa fa-bars"></i>
                    <span>All categories</span>
                    </div>
                    <ul>`;
    categories.forEach((el) => {
      html += `<li><a href="#">${el.name}</a></li>`;
    });
    html += `</ul>
                </div>`;

    $("#categoriesWrap").html(html);
  }

  function renderCover() {
    ajaxCallback("cover.json", function (data) {
      html = `
        <div class="hero__text">
          <span>${data.eyebrow}</span>
          <h2>${data.title}</h2>
          <p>${data.desc}</p>
          <a href="${data.btn.href}" class="primary-btn">${data.btn.text}</a>
        </div>
      `;

      $("#heroCover").html(html);
    });
  }
}

function renderCarousel() {
  var html = "";
  var owl = $(".categories__slider").owlCarousel({
    loop: true,
    smartSpeed: 100,
    autoplay: true,
    autoplaySpeed: 100,
    mouseDrag: false,
    margin: 10,
    animateIn: "slideInUp",
    animateOut: "fadeOut",
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });
  ajaxCallback("carousel.json", function (data) {
    let html = ``;
    data.forEach((el) => {
      html += `<div class="col-lg-3">
                    
                    <img class="img-fluid" src="img/categories/cat-1.jpg"/>
                        <h5><a href="#">Fresh Fruit</a></h5>
                    
                    </div>`;
    });

    $.each(data, function (k, v) {
      owl.trigger("add.owl.carousel", [
        jQuery(
          `<div class="col-lg-3">
                    
                    <img class="img-fluid" src="img/${v.img.src}"/>
                        <h5 class="text-center primary-font text-bold"><a class="text-dark " href="#">${returnCategory(
                          v.id
                        )}</a></h5>
                    
                    </div>`
        ),
      ]);
    });

    owl.trigger("refresh.owl.carousel");

    function returnCategory(id) {
      createLS("categories");

      var categs = getLS("categories");
      var t;
      categs.forEach((el) => {
        if (el.id == id) {
          t = el.name;
        }
      });
      return t;
    }
  });
}

function renderBanner() {
  ajaxCallback("banners.json", function (data) {
    let html = `<div class="container">
                <div class="row">`;
    data.forEach((el) => {
      html += `
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="banner__pic">
                     <a href="${el.link}">
                        <img src="img/banner/${el.image.src}" alt="${el.image.alt}" />
                      </a>
                    </div>
                  </div>`;
    });
    html += `
    </div>
  </div>`;
    $("#bannerWrap").html(html);
  });
}

function renderBlog(perRow = 3, limit = null, type = 0) {
  createLS("blogs");

  var blogs = getLS("blogs");

  html = ``;
  var i = 0;
  if (perRow == 2) {
    var bcat = [];
    $(".checkCategories:checked").each(function () {
      bcat.push(parseInt($(this).val()));
    });
  }
  if (perRow == 1) {
    bloh = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  blogs.forEach((el) => {
    if (limit != null) {
      if (i >= limit) {
        return;
      }
      i++;
    }
    let date = new Date(el.date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dateDisplay = `${
      months[date.getMonth()]
    } ${date.getDate()},${date.getFullYear()}`;
    if (perRow == 3) {
      html += `<div class="col-lg-4 col-md-4 col-sm-6">
                
                <a href="#" class="blog__item" data-id="${el.id}" data-toggle="modal" data-target="#blogModal">
                  <div class="blog__item__pic">
                    <img src="img/${el.image.href}" alt="${el.image.alt}" />
                  </div>
                  <div class="blog__item__text">
                    <ul>
                      <li><i class="fa fa-calendar-o"></i> ${dateDisplay}</li>
                    </ul>
                    <h5 class="text-bold">${el.title}</h5>
                    
                  </div>
                </a>
                
              </div>`;
    } else if (perRow == 2) {
      let searchVal = $("#searchBlog").val();
      if (searchVal.length > 0) {
        let provera = el.title.toLowerCase().indexOf(searchVal.toLowerCase());

        if (provera == -1) {
          return;
        }
      }

      if (bcat.length > 0) {
        var provera = bcat.includes(el.blog_category);
        if (!provera) {
          return;
        }
      }

      html += `<div class="col-lg-6 col-md-6 col-sm-6">
                
                    <div class="blog__item" class="blog__item" data-id="${
                      el.id
                    }" data-toggle="modal" data-target="#blogModal">
                      <div class="blog__item__pic">
                        <img src="img/${el.image.href}" alt="${el.image.alt}" />
                      </div>
                      <div class="blog__item__text">
                        <ul>
                          <li><i class="fa fa-calendar-o"></i> ${dateDisplay}</li>
                          <li>${returnBlogCategory(el.blog_category)}</li>
                        </ul>
                        <h5><a href="#">${el.title}</a></h5>
                       
                      </div>
                    </div>
                  </div>`;
    } else if (perRow == 1) {
      html += `<a href="#" class="blog__sidebar__recent__item">
        <div class="blog__sidebar__recent__item__pic">
          <img width="60px" src="img/${el.image.href}" alt="${el.image.alt}" />
        </div>
        <div class="blog__sidebar__recent__item__text">
          <h6>${el.title}
          </h6>
          <span>${dateDisplay}</span>
        </div>
      </a>`;

      $("#blogSidebar").html(html);
    }
  });

  if (perRow == 1) {
    return;
  }
  $("#blogWrap").html(html);
  function returnBlogCategory(id) {
    createLS("blog_categories");
    var categories = getLS("blog_categories");

    var name;
    categories.forEach((el) => {
      if (el.id == id) {
        name = el.name;
      }
    });
    return name;
  }

  $(".blog__item").click(function () {
    var id = $(this).data("id");
    createLS("blogs");
    var blogs = getLS("blogs");
    var item;
    blogs.forEach((el) => {
      if (el.id == id) {
        item = el;
      }
    });
    $("#modalImage").attr("src", "img/" + item.image.href);
    $("#modalTitle").html(item.title);
    $("#modalDescription").html(item.description);
  });
}

function renderBrandCategories() {
  let html = ``;
  createLS("blog_categories");
  var categories = getLS("blog_categories");
  categories.forEach((el) => {
    html += `<li><input type="checkbox" value="${
      el.id
    }" class="checkCategories" name="b-category${el.id}"id="b-category${
      el.id
    }"> ${el.name} (${countCategoryBlog(el.id)})</input></li>`;
  });

  function countCategoryBlog(id) {
    createLS("blogs");
    var blogs = getLS("blogs");

    return blogs.filter((x) => x.blog_category == id).length;
  }
  $("#blogCategoriesWrap").html(html);
}

function renderItems(display = 0) {
  createLS("products");
  createLS("categories");

  var categories = getLS("categories");
  var products = getLS("products");
  let html = ``;
  var disp = localStorage.getItem("display");

  if (disp != null) {
    display = disp;
  }

  applyFilters();
  var noProducts = products.length;
  $("#noProducts").html(noProducts);

  if (noProducts == 0) {
    html += `<h1 class="text-center">No Items!</h1>`;
    $("#itemsWrap").html(html);
    return;
  }

  if (display == 0) {
    products.forEach((el) => {
      html += `<div class="col-lg-4 col-md-6 col-sm-6">
    <div class="product__item">
      <div
        class="product__item__pic set-bg"
        data-setbg="img/${el.image.src}"
      >
      ${
        el.price.discount != null
          ? `
      <div class="product__discount__percent">` +
            el.price.discount +
            `%</div>`
          : ""
      }
        <ul class="product__item__pic__hover">
      
          <li>
            <a href="#" class="itemAdd" data-id="${
              el.id
            }"><i class="fa fa-shopping-cart"></i></a>
          </li>
        </ul>
      </div>

      <div class="product__discount__item__text">
        <span>${returnCategoryName(el.category_id)}</span>
        <h5><a href="#">${el.title}</a></h5>
        <div class="product__item__price">
          $${el.price.current} ${
        el.price.old != null ? "<span>$" + el.price.old + "</span>" : ""
      } 
        </div>
      </div>
    </div>
  </div>`;
    });
  } else if (display == 1) {
    products.forEach((el) => {
      html += `<div class="col-lg-12 col-md-6 col-sm-6">
      <div class="product__item row">
        <div class="col-sm-4">
          <div
          class="product__item__pic set-bg"
          data-setbg="img/${el.image.src}"
          >
          ${
            el.price.discount != null
              ? `
          <div class="product__discount__percent">` +
                el.price.discount +
                `%</div>`
              : ""
          }
            <ul class="product__item__pic__hover">
              <li>
                <a href="#" class="itemAdd" data-id="${
                  el.id
                }"><i class="fa fa-shopping-cart"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-8 d-flex align-items-center">
          <div class="text-start">
            <span class="muted-price">${returnCategoryName(
              el.category_id
            )}</span>
            <h5>${el.title}</h5>
            <div class="product__item__price">
            $${el.price.current} ${
        el.price.old != null ? "<span>$" + el.price.old + "</span>" : ""
      } 
            </div>
          </div>
        </div>
      </div>
    </div>`;
    });
  }

  $("#itemsWrap").html(html);
  $(".itemAdd").click(function (e) {
    e.preventDefault();
    let id = $(this).data("id");
    addToCart(id);
  });

  function applyFilters() {
    applyCategories();
    applyPrice();
    applySizes();
    applySort();
    function applyCategories() {
      var catArray = [];

      $(".productCategory:checked").each(function () {
        catArray.push(parseInt($(this).val()));
      });

      if (catArray.length > 0) {
        products = products.filter((x) => catArray.includes(x.category_id));
      }

      return products;
    }

    function applyPrice() {
      var min = $("#startPrice").val();
      var max = $("#endPrice").val();

      if (min != "") {
        min = parseInt(min);

        products = products.filter((x) => x.price.current >= min);
      }
      if (max != "") {
        max = parseInt(max);

        products = products.filter((x) => x.price.current <= max);
      }
    }
    function applySizes() {
      var sizeArray = [];

      $(".sizeCheckbox:checked").each(function () {
        sizeArray.push(parseInt($(this).val()));
      });
      if (sizeArray.length > 0) {
        products = products.filter((x) => sizeArray.includes(x.size_id));
      }

      return products;
    }

    function applySort() {
      var sort = $("#sortItems").val();

      if (sort == 0) {
        return;
      }
      switch (sort) {
        case "priceAsc":
          products = products.sort((a, b) => a.price.current - b.price.current);
          break;

        case "priceDesc":
          products = products.sort((a, b) => b.price.current - a.price.current);
          break;

        case "nameAsc":
          products = products.sort(
            (a, b) => a.title[0].charCodeAt(0) - b.title[0].charCodeAt(0)
          );
          break;

        case "nameDesc":
          products = products.sort(
            (a, b) => b.title[0].charCodeAt(0) - a.title[0].charCodeAt(0)
          );
          break;

        case "sizeAsc":
          products = products.sort((a, b) => b.size_id - a.size_id);
          break;
      }
      return products;
    }
  }
  function returnCategoryName(id) {
    var name;
    categories.forEach((el) => {
      if (el.id == id) {
        name = el.name;
      }
    });
    return name;
  }

  renderImages();
}

function renderFilters() {
  loadCategories();
  loadPrice();
  loadSizes();
  function loadCategories() {
    createLS("categories");
    createLS("products");
    var categories = getLS("categories");
    var html = "";
    var products = getLS("products");
    categories.forEach((el) => {
      html += `
    <li> <input type="checkbox" value="${el.id}" id="cat${el.id}" name="cat${
        el.id
      }" class="productCategory"/> ${el.name} (${countCategoryProduct(
        el.id
      )})</li>
    `;
    });
    $("#productCategories").html(html);

    function countCategoryProduct(id) {
      return products.filter((x) => x.category_id == id).length;
    }
  }
  function loadPrice() {
    createLS("products");
    var products = getLS("products");

    var min = products.sort((a, b) => a.price.current - b.price.current)[0]
      .price.current;
    var max = products.sort((a, b) => b.price.current - a.price.current)[0]
      .price.current;

    var html = `<div class="col-sm-6">
    <label for="startPrice">From:</label>
    <input
      type="number"
      class="form-control"
      name="startPrice"
      id="startPrice"
      min="${min}"
      max="${max}"
      value="${min}"
    />
  </div>
  <div class="col-sm-6">
  
  <label for="endPrice">To:</label>
    <input
      type="number"
      class="form-control"
      name="endPrice"
      id="endPrice"
      max="${max}"
      min="${min}"
      placeholder="${max}"
      value="${max}"
    />
  </div>`;
    $("#priceRange").html(html);
  }
  function loadSizes() {
    createLS("sizes");
    createLS("products");
    var sizes = getLS("sizes");
    var html = "<h4>Popular Size</h4>";
    sizes.forEach((x) => {
      html += `<div class="d-flex align-items-center">
                <input type="checkbox" value="${x.id}" class="sizeCheckbox" id="size${x.id}" name="size${x.id}" />
                <div class="sidebar__item__size mb-0 my-2 ml-2">
                  <label for="large"> ${x.name} </label>
                </div>
              </div>`;
    });
    $("#sizesWrap").html(html);
  }
}

function renderImages() {
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });
}

function renderCart() {
  var items = getLS("cart");
  var html;
  if (items == null || items.length == 0) {
    html = "<h1 class='text-center'>No articles in your cart!</h1>";
    $("#cartWrap").html(html);
    return;
  }
  var html = `<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <div class="shoping__cart__table">
        <table>
          <thead>
            <tr>
              <th class="shoping__product">Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>`;

  items.forEach((el) => {
    html += `<tr>
    <td class="shoping__cart__item">
      <img width="100px" src="img/${returnProperty(
        el.id,
        "image"
      )}" alt="${returnProperty(el.id, "alt")}" />
      <h5>${returnProperty(el.id, "title")}</h5>
    </td>
    <td class="shoping__cart__price">$${returnProperty(el.id, "price")}</td>
    <td class="shoping__cart__quantity">
      <div class="quantity d-flex justify-content-center">
        <div
          class="pro-qty d-flex align-items-center justify-content-between"
        >
          <a href="#" class="p-3 text-dark minusItem" data-id="${el.id}"
            >-</a
          >
          ${el.qty}
          <a href="#" class="p-3 text-dark plusItem" data-id="${el.id}"
            >+</a
          >
        </div>
      </div>
    </td>
    <td class="shoping__cart__total">$${
      returnProperty(el.id, "price") * el.qty
    }</td>
    <td class="shoping__cart__item__close">
      <span data-id="${el.id}" class="removeItem icon_close"></span>
    </td>
  </tr>`;
  });

  html += `</tbody>
  </table>
</div>
</div>
</div>
<div class="row">
<div class="col-lg-12">
<div class="shoping__cart__btns">
  <a href="shop.html" class="primary-btn cart-btn"
    >CONTINUE SHOPPING</a
  >
</div>
</div>
<div class="col-lg-6">
<div class="shoping__continue">
  <div class="shoping__discount">
    <h5>Discount Codes</h5>
    <form action="#">
      <label for="btnCoupon">Use coupon "popust" for 20% discount!</label> <br/>
      <input type="text" name="coupon" id="coupon" placeholder="Enter your coupon code" />
      <button type="button" id="btnCoupon" name="btnCoupon" class="site-btn">APPLY COUPON</button>
      <br/>
      <span class="text-danger" id="spanError"> </span>
    </form>
  </div>
</div>
</div>
<div class="col-lg-6">
<div class="shoping__checkout">
  <h5>Cart Total</h5>
  <ul>
   `;
  items.forEach((el) => {
    html += `
    <li>${returnProperty(el.id, "title")} <span>$${
      returnProperty(el.id, "price") * el.qty
    }</span></li>`;
  });
  var disc = getLS("popust");

  if (disc != null) {
    if (disc) {
      html += `<li>Total <span>$${returnTotal()}</span></li>
      <li>DISCOUNT <span>-$${returnTotal("discount")}</span></li>`;
    }
  }
  html += `<li>Total <span>$${returnTotal("final")}</span></li>
  </ul>
  <a href="#" id="checkoutCart" class="primary-btn">PROCEED TO CHECKOUT</a>
</div>
</div>
</div>
</div>`;

  function returnProperty(id, property) {
    createLS("products");
    var products = getLS("products");
    var value;
    products.forEach((el) => {
      if (el.id == id) {
        switch (property) {
          case "price":
            value = el.price.current;
            break;
          case "image":
            value = el.image.src;
            break;
          case "alt":
            value = el.image.alt;
            break;
          case "title":
            value = el.title;
            break;
        }
      }
    });
    return value;
  }

  function returnTotal(type = 0) {
    let price = 0;
    items.forEach((el) => {
      price += returnArticlePrice(el.id) * el.qty;
    });

    function returnArticlePrice(id) {
      createLS("products");

      var articles = getLS("products");
      var cena;
      articles.forEach((el) => {
        if (el.id == id) {
          cena = el.price.current;
        }
      });
      return cena;
    }
    if (type != 0) {
      var popust = getLS("popust");
      if (popust != null) {
        if (popust) {
          if (type == "discount") {
            price *= 0.2;
            price = Math.round(price * 100) / 100;
          }
          if (type == "final") {
            price *= 0.8;
            price = Math.round(price * 100) / 100;
          }
        }
      }
    }
    return price;
  }

  $("#cartWrap").html(html);

  cartEvents();
}

function renderContactInfo() {
  createLS("info");
  var data = getLS("info");
  var html = "";
  data.forEach((el) => {
    html += `<div class="col-lg-3 col-md-3 col-sm-6 text-center">
                <div class="contact__widget">
                  <span class="${el.class}"></span>
                  <h4>${el.title}</h4>
                  <p>${el.value}</p>
                </div>
              </div>`;
  });

  $("#contactInfoWrap").html(html);
}

function renderFooter() {
  createLS("icons");
  var icons = getLS("icons");

  createLS("navigation");
  var navigations = getLS("navigation");

  html = ` <div class="container">
  <div class="row">
    <div class="col-lg-3 col-md-6 col-sm-6">
      <div class="footer__about">
        <div class="footer__about__logo">
          <a href="./index.html"><img src="img/logo.png" alt="" /></a>
        </div>
        <ul>
          <li>Address: 60-49 Road 11378 New York</li>
          <li>Phone: +65 11.188.888</li>
          <li>Email: hello@colorlib.com</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
      <div class="footer__widget">
        <h6>Useful Links</h6>
        <ul>`;
  navigations.forEach((el) => {
    html += `<li><a href="${el.href}">${el.title}</a></li>`;
  });
  html += `
        </ul>
      </div>
    </div>
    <div class="col-lg-4 col-md-12">
      <div class="footer__widget">
        <h6>Social Medias</h6>
        <p>
          Click on the links for more information.
        </p>
        
        <div class="footer__widget__social">
        `;
  icons.forEach((el) => {
    html += `<a href="${el.href}"><i class="${el.class}"></i></a>`;
  });
  html += `
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <div class="footer__copyright">
        <div class="footer__copyright__text">
          <p>
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
            Copyright &copy; 2023
           
         </p>
        </div>
        <div class="footer__copyright__payment">
          <img src="img/payment-item.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</div>`;

  $("#footerWrap").html(html);
}

// FUNCTION TRIGGERS

function displayCartNumber() {
  var items = getLS("cart");

  html = "";
  var price = 0;
  if (items != null) {
    html += `<span>${items.length}</span>`;
    $(".cartSpan").html(html);
    items.forEach((el) => {
      price += returnArticlePrice(el.id) * el.qty;
    });

    var text = `Cart: <span>$${price}</span>`;
    $(".priceSpan").html(text);
  }
  if (price == 0) {
    var text = `Cart: <span>$${price}</span>`;
    $(".priceSpan").html(text);
  }

  function returnArticlePrice(id) {
    createLS("products");

    var articles = getLS("products");
    var cena;
    articles.forEach((el) => {
      if (el.id == id) {
        cena = el.price.current;
      }
    });
    return cena;
  }
}

function addToCart(id) {
  var cart = getLS("cart");

  if (cart == null || cart.length == 0) {
    setLS("cart", []);
    var cart = getLS("cart");
  }

  var provera = false;

  cart.forEach((el) => {
    if (el.id == id) {
      provera = true;
    }
  });
  if (provera) {
    cart.forEach((el) => {
      if (el.id == id) {
        el.qty++;
      }
    });
  } else {
    let data = { id: id, qty: 1 };
    cart.push(data);
  }
  setLS("cart", cart);

  let el = document.querySelector("#myToast");
  let toast = new bootstrap.Toast(el, { autohide: false });

  toast.show();
  setTimeout(function () {
    toast.hide();
  }, 1500);

  displayCartNumber();
}

function productFilterTriggers() {
  $("#itemsDisplayGrid").click(function () {
    localStorage.setItem("display", 0);
    renderItems();
    renderImages();
    $(".itemAdd").click(function (e) {
      e.preventDefault();
      let id = $(this).data("id");
      addToCart(id);
    });
  });
  $("#itemsDisplaySingle").click(function () {
    localStorage.setItem("display", 1);
    renderItems(1);
    renderImages();
    $(".itemAdd").click(function (e) {
      e.preventDefault();
      let id = $(this).data("id");
      addToCart(id);
    });
  });
  $(".productCategory").change(function () {
    renderItems();
  });

  $(".price-range-wrap").click(function () {
    var min = parseInt($("#minamount").val().substring(1));
    var max = parseInt($("#maxamount").val().substring(1));
  });

  $("#startPrice").change(function () {
    renderItems();
  });
  $("#endPrice").change(function () {
    renderItems();
  });
  $(".sizeCheckbox").change(function () {
    renderItems();
  });
  $("#sortItems").change(function () {
    renderItems();
  });

  $("#articleReset").click(function () {
    document.forms["articlesForm"].reset();
    renderItems();
  });
}

function changeQty(id, action) {
  var articles = getLS("cart");

  articles.forEach((el) => {
    if (el.id == id) {
      if (action == "remove") {
        if (el.qty > 1) {
          el.qty--;
        }
      }
      if (action == "add") {
        el.qty++;
      }
    }
  });

  setLS("cart", articles);
  renderCart();
  displayCartNumber();
}

function removeCartItem(id) {
  var articles = getLS("cart");
  var newArray = [];
  articles.forEach((el) => {
    if (el.id != id) {
      newArray.push(el);
    }
  });

  setLS("cart", newArray);
  renderCart();
  displayCartNumber();
}

function applyCoupon(coupon) {
  if (coupon != "popust") {
    $("#spanError").html("Invalid coupon!");
  } else {
    setLS("popust", true);
    renderCart();
  }
}

function cartEvents() {
  $(".minusItem").click(function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    changeQty(id, "remove");
  });
  $(".plusItem").click(function (e) {
    var id = $(this).data("id");
    e.preventDefault();
    changeQty(id, "add");
  });
  $(".removeItem").click(function () {
    var id = $(this).data("id");
    removeCartItem(id);
  });
  $("#checkoutCart").click(function (e) {
    e.preventDefault();
    removeLS("cart");
    removeLS("popust");
    renderCart();
    let el = document.querySelector("#myToast");
    let toast = new bootstrap.Toast(el, { autohide: false });

    toast.show();
    setTimeout(function () {
      toast.hide();
    }, 3000);

    displayCartNumber();
  });
  $("#btnCoupon").click(function () {
    var coupon = $("#coupon").val();
    applyCoupon(coupon);
  });
}

function sendEmail() {
  $("#sendEmail").click(function () {
    var brGresaka = 0;

    var errors = "";

    let regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let regexFullname =
      /^[A-ZĆČŠĐŽ][a-zćčšđž]{2,10}\s[A-ZĆČŠĐŽ][a-zćčšđž]{2,10}$/;
    let regexNumber = /^\+3816[0-9]{7,8}$/;

    var forma = document.forms["contactForm"];

    if (!regexMail.test(forma.emailAddress.value)) {
      brGresaka++;
      $("#emailAddressError").html(
        "Wrong email format. Example : test@test.com"
      );
    } else {
      $("#emailAddressError").html("");
    }
    if (!regexFullname.test(forma.fullName.value)) {
      brGresaka++;
      $("#fullNameError").html("Wrong full name format. Example : Joe Smith");
    } else {
      $("#fullNameError").html("");
    }
    if (!regexNumber.test(forma.phoneNumber.value)) {
      brGresaka++;
      $("#phoneNumberError").html("Wrong phone format. Example +381643639711");
    } else {
      $("#phoneNumberError").html("");
    }
    if (forma.question.value == 0) {
      brGresaka++;
      $("#questionError").html("You have to select question type!");
    } else {
      $("#questionError").html("");
    }

    if (forma.contactType.value == "") {
      brGresaka++;
      $("#contactTypeError").html("Choose where to contact you!");
    } else {
      $("#contactTypeError").html("");
    }
    if (forma.contactType.value == "") {
      brGresaka++;
      $("#messageError").html("You can't send empty message!");
    } else {
      $("#messageError").html("");
    }
    if (!forma.terms.checked) {
      brGresaka++;
      $("#termsError").html("You haven't agreed with terms of conditions!");
    } else {
      $("#termsError").html("");
    }

    if (brGresaka == 0) {
      html = `<div class="alert alert-success text-center" role="alert">
                Message send successfully!
              </div>`;

      $("#successMessage").html(html);

      forma.reset();

      setTimeout(function () {
        $("#successMessage").html("");
      }, 3000);
    }
  });
}

function switchNav() {
  $(".humberger__open").click(function () {
    $("#mobileNav").addClass("showMobileNav");
  });
  $(document).on("click", function (event) {
    // $(".humberger__open").removeClass("showMobileNav");
    if (!$(event.target).closest(".humberger__open").length) {
      $("#mobileNav").removeClass("showMobileNav");
      // Showing the hint message
      // $(".hint").html("A click <b>outside</b> the dropdown is detected.");
    }
  });
}
// FUNCTION POKRETANJE

window.onload = function () {};

$(document).ready(function () {
  var url = window.location.pathname;

  renderNav();
  renderFooter();
  displayCartNumber();
  switchNav();
  $("#preloder").fadeOut("slow");

  if (url == "/index.html" || url == "/") {
    renderHero();
    renderCarousel();
    renderBanner();
    renderBlog(3, 3);
  } else if (url == "/blog.html") {
    renderBrandCategories();
    renderBlog(2, null);
    renderBlog(1, 3);
    $("#searchBlog").keyup(function () {
      renderBlog(2, null);
    });
    $(".checkCategories").change(function () {
      renderBlog(2, null);
    });
    $("#blogReset").click(function () {
      document.forms["blogForm"].reset();
      renderBlog(2, null);
    });
  } else if (url == "/shop.html") {
    renderFilters();
    renderItems();
    productFilterTriggers();
  } else if (url == "/cart.html") {
    renderCart();
    // cartEvents();
  } else if (url == "/contact.html") {
    renderContactInfo();
    sendEmail();
  }
  renderImages();
});
