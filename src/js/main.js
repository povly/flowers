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
})