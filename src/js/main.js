document.addEventListener('DOMContentLoaded', () => {
    const mainBg = document.querySelector('.main__bg');

    function resize() {
        let windowIW = window.innerWidth;
        const dataBg = document.querySelectorAll("[data-bg-pc]");
        dataBg.forEach((bg) => {
            if (windowIW > 1000) {
                bg.style.backgroundImage = `url('${bg.getAttribute('data-bg-pc')}')`;
            } else {
                bg.style.backgroundImage = `url('${bg.getAttribute('data-bg-mb')}')`;
            }
        })

        const overlay = document.querySelector('.overlay');
        if (overlay){
            if (windowIW > 1000){
                overlay.style.backgroundImage = `url('${overlay.getAttribute('data-bg-df')}')`;
            } else {
                overlay.style.backgroundImage = `url('${overlay.getAttribute('data-bg-mb')}')`;
            }
        }

        if (windowIW < 1000) {
            window.addEventListener('scroll', () => {
                const mainAboutTags = document.querySelectorAll('.main-about__tag');
                if (mainAboutTags[0]) {
                    let wHeight = window.innerHeight;
                    let wScrollY = window.scrollY;
                    let half = wHeight / 2;
                    // if (mainAboutTags[0].getBoundingClientRect().top  < half && mainAboutTags[mainAboutTags.length - 1].getBoundingClientRect().bottom > 0) {
                    //     mainAboutTags.forEach((tag) => {
                    //         let tagHeight = tag.scrollHeight;
                    //         let tagTop = tag.getBoundingClientRect().top;
                    //         let tagBottom = tag.getBoundingClientRect().bottom;
                    //         if (half >= tagTop) {
                    //             tag.classList.add('active');
                    //         }
                    //         if (half - tagHeight >= tagTop) {
                    //             tag.classList.remove('active');
                    //         }
                    //         console.log(" ");
                    //         console.log(tagTop);
                    //         console.log(tagBottom);
                    //         console.log(half);
                    //         // console.log(tagTop);
                    //         // console.log(wHeight / 2 - tagHeight);
                    //     })
                    // }
                    const firstTag = mainAboutTags[0];
                    const lastTag = mainAboutTags[mainAboutTags.length - 1];

                    const firstTagTop = firstTag.offsetTop - half;
                    const lastTagTop = lastTag.offsetTop + mainAboutTags[mainAboutTags.length - 1].offsetHeight - half;

                    if (firstTagTop >= wScrollY) {
                        firstTag.classList.remove('active')
                    }
                    if (lastTagTop <= wScrollY) {
                        lastTag.classList.remove('active')
                    }
                    if (firstTagTop <= wScrollY && lastTagTop >= wScrollY) {
                        mainAboutTags.forEach((tag, index) => {
                            let tagHeight = tag.scrollHeight;
                            let tagTop = tag.offsetTop;
                            if (tagTop <= wScrollY + half && tagTop + tagHeight >= wScrollY) {
                                const active = document.querySelector('.main-about__tag.scroll');
                                if (active !== tag) {
                                    active.classList.remove('scroll');
                                    active.classList.remove('active');
                                }
                                tag.classList.add('scroll');
                                tag.classList.add('active');
                            }
                        })
                    }
                }
            })
            // const mainAboutTags = document.querySelectorAll('.main-about__tag');
            // if (mainAboutTags[0]) {
            //     let observer = new IntersectionObserver((entries, observer) => {
            //         entries.forEach((entry, index) => {
            //             console.log(entry.boundingClientRect.top)
            //             if (entry.isIntersecting ) {
            //                 if (entry.boundingClientRect.top > 0 ) {
            //                     entry.target.classList.add('active');
            //                 }
            //             } else {
            //                 if (entry.boundingClientRect.top < 200 ) {
            //                     entry.target.classList.remove('active');
            //                 }
            //             }
            //
            //         })
            //     }, {
            //         root: null,
            //         rootMargin: '0px 0px -200px 0px',
            //         threshold: 1
            //     });
            //     mainAboutTags.forEach((tag) => {
            //         observer.observe(tag);
            //     })
            // }
        }
    }

    resize();
    window.addEventListener('resize', () => {
        resize();
    })

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        window.scrollY > 100
            ?
            header.classList.add('scroll')
            :
            header.classList.remove('scroll');
    })

    // modals
    const modalShows = document.querySelectorAll('.modal__show');
    modalShows.forEach((show) => {
        show.addEventListener('click', () => {
            hideActiveModals();
            let dataModal = show.getAttribute('data-modal');
            let modal = document.querySelector('.modal__' + dataModal);
            modal.classList.add('active');
            hiddenBodyOverflow();
        })
    })

    function hideActiveModals() {
        const modals = document.querySelectorAll('.modal.active');
        if (modals[0]) {
            modals.forEach((modal) => {
                modal.classList.remove('active');
            })
        }
    }

    function hiddenBodyOverflow() {
        document.body.style.overflow = 'hidden';
    }

    function clearBodyOverflow() {
        document.body.style.overflow = '';
    }

    const modals = document.querySelectorAll('.modal');
    window.addEventListener('load', () => {
        modals.forEach((modal) => {
            modal.classList.add('fixed');
        })
    })
    modals.forEach((modal) => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                clearBodyOverflow();
            }
        })
        const boost = modal.querySelector('.modal__gallery-boost');
        if (boost) {
            boost.addEventListener('click', () => {
                modal.classList.remove('active');
                clearBodyOverflow();
            })
        }
        if (modal.classList.contains('modal__gallery')) {
            const main = modal.querySelector('.modal__gallery-main');
            const images = modal.querySelectorAll('.modal__gallery-img');
            clickAndChangeGallery(images, '.modal__gallery-img.active', modal, main);
        }
    })

    // gallery at modals
    function clickAndChangeGallery(images, activeClass, parentMainImg, mainImg) {
        images.forEach((img) => {
            img.addEventListener('click', () => {
                const url = img.getAttribute('data-url');
                const active = parentMainImg.querySelector(activeClass);
                active.classList.remove('active');
                img.classList.add('active');
                mainImg.style.backgroundImage = 'url("' + url + '")';
            })
        })
    }

    const product = document.querySelector('.product');
    if (product) {
        const img = product.querySelector('.product__img');
        const galleries = product.querySelectorAll('.product__gallery-img');
        clickAndChangeGallery(galleries, '.product__gallery-img.active', product, img);
    }

    //filters
    const filterSelects = document.querySelectorAll(".filter__select");
    if (filterSelects.length) {
        filterSelects.forEach((select) => {
            const list = select.querySelector('.filter__select-list');
            const arrow = select.querySelector('.filter__select-arrow');
            const item = select.querySelector('.filter__select-item');
            const checkboxes = list.querySelectorAll('input[type="checkbox"]');


            let values = '';
            select.addEventListener('click', (e) => {
                const activeSelect = document.querySelector('.filter__select.active');

                if (e.target === select || e.target === arrow || e.target === arrow.querySelector('path') || e.target === item) {
                    select.classList.toggle('active');
                    if (activeSelect) {
                        activeSelect.classList.remove('active');
                    }
                }
            })

            function getInputValues(inputs) {
                let values = '';
                inputs.forEach((input) => {
                    if (input.checked) {
                        const inputValue = input.value;
                        values === '' ? values = inputValue : values += ', ' + inputValue
                    }
                })
                return values;
            }

            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    const inputValue = checkbox.value;
                    values === '' ? values = inputValue : values += ', ' + inputValue
                }
                checkbox.addEventListener('click', () => {
                    const parent = checkbox.parentElement;
                    if (parent.classList.contains('checked')) {
                        parent.classList.remove('checked');
                    } else {
                        parent.classList.add('checked');
                        checkbox.checked = true;
                    }
                    item.textContent = getInputValues(checkboxes);
                })
            })

            item.textContent = values;
        })
    }

    const filterForm = document.querySelector('.archive__form');
    if (filterForm) {
        const reset = filterForm.querySelector('.filter__submit');
        reset.addEventListener('click', () => {
            filterForm.reset();
        })
    }

})