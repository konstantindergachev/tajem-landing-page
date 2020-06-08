const sidebarBox = document.querySelector('.menu__list');
const sidebarSandwichNav = document.getElementById('sandwich__nav');

sidebarSandwichNav.addEventListener('click', () => {
    sidebarBox.classList.add('list__active');
    if (sidebarBox.className === 'menu__list list__active') {
        sidebarBox.style.opacity = 1;
        sidebarBox.style.visibility = 'visible';
    }

    sidebarSandwichNav.classList.toggle('sandwich__active');
    if (sidebarSandwichNav.className === 'sandwich__nav') {
        sidebarBox.classList.remove('list__active');
    }
});

export { sidebarBox, sidebarSandwichNav };

