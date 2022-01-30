document.addEventListener('DOMContentLoaded', ()=>{
    const modalShows = document.querySelectorAll('.modal__show');

    function hideActiveModals(){
        const modals = document.querySelectorAll('.modal.active');
        if (modals[0]){
            modals.forEach((modal)=>{
                modal.classList.remove('active');
            })
        }
    }
    function hiddenBodyOverflow(){
        document.body.style.overflow = 'hidden';
    }
    function clearBodyOverflow(){
        document.body.style.overflow = '';
    }
    function clickAndChangeGallery(images, activeClass, parentMainImg, mainImg){
        images.forEach((img)=>{
            img.addEventListener('click', ()=>{
                const url = img.getAttribute('data-url');
                const active = parentMainImg.querySelector(activeClass);
                active.classList.remove('active');
                img.classList.add('active');
                mainImg.style.backgroundImage = 'url("'+ url +'")';
            })
        })
    }

    modalShows.forEach((show)=>{
        show.addEventListener('click', ()=>{
            hideActiveModals();
            let dataModal = show.getAttribute('data-modal');
            let modal = document.querySelector('.modal__' + dataModal);
            modal.classList.add('active');
            hiddenBodyOverflow();
        })
    })

    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal)=>{
        modal.addEventListener('click',(e)=>{
            if (e.target === modal){
                modal.classList.remove('active');
                clearBodyOverflow();
            }
        })
        const boost = modal.querySelector('.modal__gallery-boost');
        if (boost){
            boost.addEventListener('click', ()=>{
                modal.classList.remove('active');
                clearBodyOverflow();
            })
        }
        if (modal.classList.contains('modal__gallery')){
            const main = modal.querySelector('.modal__gallery-main');
            const images = modal.querySelectorAll('.modal__gallery-img');
            clickAndChangeGallery(images, '.modal__gallery-img.active', modal, main);
        }
    })

    const product = document.querySelector('.product');
    if (product){
        const img = product.querySelector('.product__img');
        const galleries = product.querySelectorAll('.product__gallery-img');
        clickAndChangeGallery(galleries, '.product__gallery-img.active', product, img);
    }

    const filterSelects = document.querySelectorAll(".filter__select");
    if (filterSelects.length){
        filterSelects.forEach((select)=>{
            const list = select.querySelector('.filter__select-list');
            const arrow = select.querySelector('.filter__select-arrow');
            const item = select.querySelector('.filter__select-item');
            const checkboxes = list.querySelectorAll('input[type="checkbox"]');


            let values = '';
            select.addEventListener('click', (e)=>{
                const activeSelect = document.querySelector('.filter__select.active');

                if (e.target === select || e.target === arrow || e.target === arrow.querySelector('path') || e.target === item){
                    select.classList.toggle('active');
                    if (activeSelect){
                        activeSelect.classList.remove('active');
                    }
                }
            })

            function getInputValues(inputs){
                let values = '';
                inputs.forEach((input)=>{
                    if (input.checked){
                        const inputValue = input.value;
                        values === '' ? values = inputValue : values += ', '+ inputValue
                    }
                })
                return values;
            }

            checkboxes.forEach((checkbox)=>{
                if (checkbox.checked){
                    const inputValue = checkbox.value;
                    values === '' ? values = inputValue : values += ', '+ inputValue
                }
                checkbox.addEventListener('click', ()=>{
                    const parent = checkbox.parentElement;
                    if (parent.classList.contains('checked')){
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
    if (filterForm){
        const reset = filterForm.querySelector('.filter__submit');
        reset.addEventListener('click', ()=>{
            filterForm.reset();
        })
    }
})