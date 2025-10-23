// Menu Mobile
const buttonMenuMobile = document.querySelector(".header .inner-menu-mobile");
if (buttonMenuMobile) {
  const menu = document.querySelector(".header .inner-menu");

  // Click vào button mở menu
  buttonMenuMobile.addEventListener("click", () => {
    menu.classList.add("active");
  });

  // Click vào overlay đóng menu
  const overlay = menu.querySelector(".inner-overlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  }

  // Click vào icon down mở sub menu
  const listButtonSubMenu = menu.querySelectorAll("ul > li > i");
  listButtonSubMenu.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.classList.toggle("active");
    });
  });
}
// End Menu Mobile

// Box Address Section 1
const boxAddressSection1 = document.querySelector(
  ".section-1 .inner-form .inner-box.inner-address"
);
if (boxAddressSection1) {
  // Ẩn/hiện box suggest
  const input = boxAddressSection1.querySelector(".inner-input");

  input.addEventListener("focus", () => {
    boxAddressSection1.classList.add("active");
  });

  input.addEventListener("blur", () => {
    boxAddressSection1.classList.remove("active");
  });

  // Sự kiện click vào từng item
  const listItem = boxAddressSection1.querySelectorAll(
    ".inner-suggest-list .inner-item"
  );
  listItem.forEach((item) => {
    item.addEventListener("mousedown", () => {
      const title = item.querySelector(".inner-item-title").innerHTML.trim();
      if (title) {
        input.value = title;
      }
    });
  });
}
// End Box Address Section 1

// Box User Section 1
const boxUserSection1 = document.querySelector(
  ".section-1 .inner-form .inner-box.inner-user"
);
if (boxUserSection1) {
  // Hiện box quantity
  const input = boxUserSection1.querySelector(".inner-input");

  input.addEventListener("focus", () => {
    boxUserSection1.classList.add("active");
  });

  // Ẩn box quantity
  document.addEventListener("click", (event) => {
    // Kiểm tra nếu click không nằm trong khối `.inner-box.inner-user`
    if (!boxUserSection1.contains(event.target)) {
      boxUserSection1.classList.remove("active");
    }
  });

  // Thêm số lượng vào ô input
  const updateQuantityInput = () => {
    const listBoxNumber = boxUserSection1.querySelectorAll(
      ".inner-count .inner-number"
    );
    const listNumber = [];
    listBoxNumber.forEach((boxNumber) => {
      const number = parseInt(boxNumber.innerHTML.trim());
      listNumber.push(number);
    });
    const value = `NL: ${listNumber[0]}, TE: ${listNumber[1]}, EB: ${listNumber[2]}`;
    input.value = value;
  };

  // Bắt sự kiện click nút up
  const listButtonUp = boxUserSection1.querySelectorAll(
    ".inner-count .inner-up"
  );
  listButtonUp.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.parentNode;
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.innerHTML.trim());
      const numberUpdate = number + 1;
      boxNumber.innerHTML = numberUpdate;
      updateQuantityInput();
    });
  });

  // Bắt sự kiện click nút down
  const listButtonDown = boxUserSection1.querySelectorAll(
    ".inner-count .inner-down"
  );
  listButtonDown.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.parentNode;
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.innerHTML.trim());
      if (number > 0) {
        const numberUpdate = number - 1;
        boxNumber.innerHTML = numberUpdate;
        updateQuantityInput();
      }
    });
  });
}
// End Box User Section 1

// Clock Expire
const clockExpire = document.querySelector("[clock-expire]");
if (clockExpire) {
  const expireDateTimeString = clockExpire.getAttribute("clock-expire");

  // Chuyển đổi chuỗi thời gian thành đối tượng Date
  const expireDateTime = new Date(expireDateTimeString);

  // Hàm cập nhật đồng hồ
  const updateClock = () => {
    const now = new Date();
    const remainingTime = expireDateTime - now; // quy về đơn vị mili giây

    if (remainingTime > 0) {
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      // Tính số ngày, 24 * 60 * 60 * 1000 Tích của các số này = số mili giây trong 1 ngày

      const hours = Math.floor((remainingTime / (60 * 60 * 1000)) % 24);
      // Tính số giờ, 60 * 60 * 1000 Chia remainingTime cho giá trị này để nhận được tổng số giờ.
      // % 24 Lấy phần dư khi chia tổng số giờ cho 24 để chỉ lấy số giờ còn lại trong ngày.

      const minutes = Math.floor((remainingTime / (60 * 1000)) % 60);
      // Tính số phút, 60 * 1000 Chia remainingTime cho giá trị này để nhận được tổng số phút.
      // % 60 Lấy phần dư khi chia tổng số phút cho 60 để chỉ lấy số phút còn lại trong giờ.

      const seconds = Math.floor((remainingTime / 1000) % 60);
      // Tính số giây, 1000 Chia remainingTime cho giá trị này để nhận được tổng số giây.
      // % 60 Lấy phần dư khi chia tổng số giây cho 60 để chỉ lấy số giây còn lại trong phút.

      // Cập nhật giá trị vào thẻ span
      const listBoxNumber = clockExpire.querySelectorAll(".inner-number");
      listBoxNumber[0].innerHTML = `${days}`.padStart(2, "0");
      listBoxNumber[1].innerHTML = `${hours}`.padStart(2, "0");
      listBoxNumber[2].innerHTML = `${minutes}`.padStart(2, "0");
      listBoxNumber[3].innerHTML = `${seconds}`.padStart(2, "0");
    } else {
      // Khi hết thời gian, dừng đồng hồ
      clearInterval(intervalClock);
    }
  };

  // Gọi hàm cập nhật đồng hồ mỗi giây
  const intervalClock = setInterval(updateClock, 1000);
}
// End Clock Expire

// Box Filter
const buttonFilterMobile = document.querySelector(
  ".section-9 .inner-filter-mobile"
);
if (buttonFilterMobile) {
  const boxLeft = document.querySelector(".section-9 .inner-left");
  buttonFilterMobile.addEventListener("click", () => {
    boxLeft.classList.add("active");
  });

  const overlay = document.querySelector(
    ".section-9 .inner-left .inner-overlay"
  );
  overlay.addEventListener("click", () => {
    boxLeft.classList.remove("active");
  });
}
// End Box Filter

// Box Tour Info
const boxTourInfo = document.querySelector(".box-tour-info");
if (boxTourInfo) {
  const buttonReadMore = boxTourInfo.querySelector(".inner-read-more button");
  buttonReadMore.addEventListener("click", () => {
    boxTourInfo.classList.add("active");
  });

  new Viewer(boxTourInfo);
}
// End Box Tour Info

// Khởi tạo AOS
AOS.init();
// Hết Khởi tạo AOS

// Swiper Section 2
const swiperSection2 = document.querySelector(".swiper-section-2");
if (swiperSection2) {
  new Swiper(".swiper-section-2", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
    },
    loop: true,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
}
// End Swiper Section 2

// Swiper Section 3
const swiperSection3 = document.querySelector(".swiper-section-3");
if (swiperSection3) {
  new Swiper(".swiper-section-3", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
}
// End Swiper Section 3

// Swiper Box Images
const boxImages = document.querySelector(".box-images");
if (boxImages) {
  const swiperBoxImagesThumb = new Swiper(".swiper-box-images-thumb", {
    spaceBetween: 5,
    slidesPerView: 4,
    breakpoints: {
      576: {
        spaceBetween: 10,
      },
    },
  });

  const swiperBoxImagesMain = new Swiper(".swiper-box-images-main", {
    spaceBetween: 0,
    thumbs: {
      swiper: swiperBoxImagesThumb,
    },
  });
}
// End Swiper Box Images

// Zoom Box Images Main
const boxImagesMain = document.querySelector(".box-images .inner-images-main");
if (boxImagesMain) {
  new Viewer(boxImagesMain);
}
// End Zoom Box Images Main

// Box Tour Schedule
const boxTourSchedule = document.querySelector(".box-tour-schedule");
if (boxTourSchedule) {
  new Viewer(boxTourSchedule);
}
// End Box Tour Schedule

// Email Form
const emailForm = document.querySelector("#email-form");
if (emailForm) {
  const validation = new JustValidate("#email-form");

  validation
    // .addField("#email-input", [
    //   {
    //     rule: "required",
    //     errorMessage: "Vui lòng nhập email của bạn!",
    //   },
    //   {
    //     rule: "email",
    //     errorMessage: "Email không đúng định dạng!",
    //   },
    // ])
    .onSuccess((event) => {
      const email = event.target.email.value;

      const dataFinal = {
        email: email,
      };

      fetch(`/contact/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFinal),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == "error") {
            notify.error(data.message);
          } else {
            notify.success(data.message);
            emailForm.email.value = "";
          }
        });
    });
}
// End Email Form

// Coupon Form
const couponForm = document.querySelector("#coupon-form");
if (couponForm) {
  const validation = new JustValidate("#coupon-form");

  validation.onSuccess((event) => {
    const coupon = event.target.coupon.value;
    console.log(coupon);
  });
}
// End Email Form

// Order Form
const orderForm = document.querySelector("#order-form");
if (orderForm) {
  const validation = new JustValidate("#order-form");

  validation
    .addField("#full-name-input", [
      {
        rule: "required",
        errorMessage: "Vui lòng nhập họ tên!",
      },
      {
        rule: "minLength",
        value: 5,
        errorMessage: "Họ tên phải có ít nhất 5 ký tự!",
      },
      {
        rule: "maxLength",
        value: 50,
        errorMessage: "Họ tên không được vượt quá 50 ký tự!",
      },
    ])
    .addField("#phone-input", [
      {
        rule: "required",
        errorMessage: "Vui lòng nhập số điện thoại!",
      },
      {
        rule: "customRegexp",
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        errorMessage: "Số điện thoại không đúng định dạng!",
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const method = event.target.method.value;

      console.log(fullName);
      console.log(phone);
      console.log(note);
      console.log(method);
    });

  // List Input Method
  const listInputMethod = orderForm.querySelectorAll("input[name='method']");
  const elementInfoBank = orderForm.querySelector(".inner-info-bank");

  listInputMethod.forEach((inputMethod) => {
    inputMethod.addEventListener("change", () => {
      if (inputMethod.value == "bank") {
        elementInfoBank.classList.add("active");
      } else {
        elementInfoBank.classList.remove("active");
      }
    });
  });
  // End List Input Method
}
// End Order Form

// Filter start date
const filterStartDate = document.querySelector("[filter-start-date]");
if (filterStartDate) {
  const url = new URL(window.location.href);

  filterStartDate.addEventListener("change", () => {
    const value = filterStartDate.value;
    if (value) {
      url.searchParams.set("startDate", value);
    } else {
      url.searchParams.delete("startDate");
    }
    window.location.href = url.href;
  });

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("startDate");
  if (valueCurrent) {
    filterStartDate.value = valueCurrent;
  }
}
// End filter start date

// Filter end date
const filterEndDate = document.querySelector("[filter-end-date]");
if (filterEndDate) {
  const url = new URL(window.location.href);

  filterEndDate.addEventListener("change", () => {
    const value = filterEndDate.value;
    if (value) {
      url.searchParams.set("endDate", value);
    } else {
      url.searchParams.delete("endDate");
    }
    window.location.href = url.href;
  });

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("endDate");
  if (valueCurrent) {
    filterEndDate.value = valueCurrent;
  }
}
// End filter end date

// Fiter reset
const filterReset = document.querySelector("[filter-reset]");
if (filterReset) {
  const url = new URL(window.location.href);

  filterReset.addEventListener("click", () => {
    url.search = "";
    window.location.href = url.href;
  });
}
// End filter reset

// Check all
const checkAll = document.querySelector("[check-all]");
if (checkAll) {
  checkAll.addEventListener("click", () => {
    const listCheckItem = document.querySelectorAll("[check-item]");
    listCheckItem.forEach((item) => {
      item.checked = checkAll.checked;
    });
  });
}
// End check all

// Change multi
const changeMulti = document.querySelector("[change-multi]");
if (changeMulti) {
  const dataApi = changeMulti.getAttribute("data-api");
  const select = changeMulti.querySelector("select");
  const button = changeMulti.querySelector("button");

  button.addEventListener("click", () => {
    const option = select.value;
    const listInputChecked = document.querySelectorAll("[check-item]:checked");
    if (option && listInputChecked.length > 0) {
      const ids = [];
      listInputChecked.forEach((input) => {
        const id = input.getAttribute("check-item");
        ids.push(id);
      });

      const dataFinal = {
        option: option,
        ids: ids,
      };

      if (option == "destroy") {
        Swal.fire({
          title: "Bạn có chắc muốn xóa không?",
          text: "Hành động này của bạn sẽ không thể khôi phục lại.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy bỏ",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(dataApi, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataFinal),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.code == "error") {
                  notify.error(data.message);
                } else {
                  drawNotify(data.code, data.message);
                  window.location.reload();
                }
              });
          }
        });
      } else {
        fetch(dataApi, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFinal),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.code == "error") {
              notify.error(data.message);
            } else {
              drawNotify(data.code, data.message);
              window.location.reload();
            }
          });
      }
    }
  });
}
// End change multi

// Search
const search = document.querySelector("[search]");
if (search) {
  const url = new URL(window.location.href);
  search.addEventListener("keyup", (event) => {
    if (event.code == "Enter") {
      const value = search.value;
      if (value) {
        url.searchParams.set("keyword", value);
      } else {
        url.searchParams.delete("keyword");
      }
      window.location.href = url.href;
    }
  });
}
// End search

// Button destroy
const listButtonDestroy = document.querySelectorAll("[button-destroy]");
if (listButtonDestroy.length > 0) {
  listButtonDestroy.forEach((button) => {
    button.addEventListener("click", () => {
      Swal.fire({
        title: "Bạn có chắc muốn xóa không?",
        text: "Hành động này của bạn sẽ không thể khôi phục lại.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ",
      }).then((result) => {
        if (result.isConfirmed) {
          const dataApi = button.getAttribute("data-api");
          fetch(dataApi, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.code == "error") {
                notify.error(data.message);
              } else {
                drawNotify(data.code, data.message);
                window.location.reload();
              }
            });
        }
      });
    });
  });
}
// End button destroy

// Box Filter
const boxFilter = document.querySelector(".box-filter");
if (boxFilter) {
  const url = new URL(`${window.location.origin}/search`);
  const button = boxFilter.querySelector(".inner-button");
  const filterList = [
    "locationFrom",
    "locationTo",
    "departureDate",
    "stockAdult",
    "stockChildren",
    "stockBaby",
    "price",
  ];

  button.addEventListener("click", () => {
    for (const item of filterList) {
      const value = boxFilter.querySelector(`[name="${item}"]`).value;
      if (value) {
        url.searchParams.set(item, value);
      } else {
        url.searchParams.delete(item);
      }
    }
    window.location.href = url.href;
  });

  // Hiển thị giá trị mặc định
  const urlCurrent = new URL(window.location.href);
  for (const item of filterList) {
    const valueCurrent = urlCurrent.searchParams.get(item);
    if (valueCurrent) {
      boxFilter.querySelector(`[name="${item}"]`).value = valueCurrent;
    }
  }
}
// End Box Filter

// Form search
const formSearch = document.querySelector("[form-search]");
if (formSearch) {
  const url = new URL(`${window.location.origin}/search`);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định là load lại trang

    // Điểm đến
    const locationTo = formSearch.locationTo.value;
    if (locationTo) {
      url.searchParams.set("locationTo", locationTo);
    } else {
      url.searchParams.delete("locationTo");
    }
    // Hết Điểm đến

    // Số lượng
    const listQuantity = ["stockAdult", "stockChildren", "stockBaby"];
    for (const item of listQuantity) {
      const element = formSearch.querySelector(`[${item}]`);
      const value = element.innerHTML.trim();
      if (value) {
        url.searchParams.set(item, value);
      } else {
        url.searchParams.delete(item);
      }
    }
    // Hết Số lượng

    // Ngày khởi hành
    const departureDate = formSearch.departureDate.value;
    if (departureDate) {
      url.searchParams.set("departureDate", departureDate);
    } else {
      url.searchParams.delete("departureDate");
    }
    // Hết Ngày khởi hành

    window.location.href = url.href;
  });
}
// End Form Search

// Box pagination
const boxPagination = document.querySelector(".box-pagination");
if (boxPagination) {
  const url = new URL(window.location.href);
  const currentPage = url.searchParams.get("page");

  const listButton = boxPagination.querySelectorAll("button");
  for (const button of listButton) {
    const value = button.innerText.trim();

    if (value === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      if (value) {
        url.searchParams.set("page", value);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href;
    });
  }
}
// End box pagination

//  Box sort Tour
const boxSortTour = document.querySelector(".inner-sort");
if (boxSortTour) {
  const url = new URL(window.location.href);

  const sortPriceASC = boxSortTour.querySelector(".sort-price-asc");
  const sortPriceDESC = boxSortTour.querySelector(".sort-price-desc");

  sortPriceASC.addEventListener("click", () => {
    const priceASC = true;

    if (priceASC) {
      url.searchParams.set("priceASC", priceASC);
      url.searchParams.delete("priceDESC");
    } else {
      url.searchParams.delete("priceASC");
    }

    window.location.href = url.href;
  });

  sortPriceDESC.addEventListener("click", () => {
    const priceDESC = true;

    if (priceDESC) {
      url.searchParams.set("priceDESC", priceDESC);
      url.searchParams.delete("priceASC");
    } else {
      url.searchParams.delete("priceDESC");
    }

    window.location.href = url.href;
  });
}
// End Box sort tour
