const e = require("express");

(() => {
    const location = window.location;
    const body = document.body;

    console.log(body);

    document.getElementById('test321').addEventListener('click', () => {
        window.location.pushstate(null, null, '/something');
        e.preventDefault();
    });

    if (location.pathname === '/') {
        body.id = 'home';
        console.log('home');
    } else if (location.pathname === '/test123') {
        document.querySelector('.test123').remove();
    } else {
        body.id = location.pathname.replace('/', '');
        console.log(location.href);
    }
})();
