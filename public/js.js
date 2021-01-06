(function f(doc) {
    const item = doc.getElementById('bananafish');
    const loading = doc.getElementById('loader');
    const originalBody = doc.body;

    window.onpopstate = () => {
        console.log(originalBody);
        doc.body.innerHTML =  originalBody.innerHTML;
        console.log('poppin off');
    };

    const createPreviousBodyElement = () => {
        const prevBody = doc.createElement('div');
        const allBodies = doc.getElementsByClassName('prevBody').length;

        prevBody.id = allBodies === 'undefined' ? 0 : allBodies;
        prevBody.classList.add('prevBody');
        prevBody.innerHTML = doc.body.innerHTML;

        console.log(prevBody);

        return prevBody;
    };

    // const content = doc.getElementById('content');
    item.addEventListener('click', (e) => {
        e.preventDefault();
        loading.style.opacity = 1;
        window.history.pushState(null, null, 'test.html');
        // code to load file.html
        setTimeout(() => {
            const request = new XMLHttpRequest();
            request.open('GET', '/test.html', true);
            request.responseType = 'document';
            request.onload = function f() {
                if (this.status >= 200 && this.status < 400) {
                // Success!
                    const resp = this.response;

                    //! ! ~~~ This is how we are replacing the old dom with the new dom
                    // ** This is preventing from on going back showing original dom
                    // doc.documentElement.replaceChild(resp.body, doc.body);
                    const prevBody = createPreviousBodyElement();
                    console.log(prevBody);
                    // doc.body.innerHTML = resp.body.innerHTML;
                    // doc.body.append(prevBody);
                    loading.style.opacity = '';
                } else {
                    console.log('error on loading resource');
                // We reached our target server, but it returned an error
                }
            };
            request.onerror = function () {
                // There was a connection error of some sort
            };
            request.send();
        }, 1000);
    });
}(document));
