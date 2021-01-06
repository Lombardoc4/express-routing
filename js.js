(function f(doc) {
    const testItem = doc.getElementById('test');
    const loading = doc.getElementById('loader');

    window.onpopstate = (e) => {
        // e.preventDefault();
        // console.log(e);
        window.history.pushState({ pageID: [doc.body.id] }, null, null);

        console.log(window.history.state);
        const prevBodies = [].slice.call(doc.getElementsByClassName('prevBody'));
        const bodiesLength = +prevBodies.length - 1;

        prevBodies[bodiesLength].style.display = 'block';
        // console.log('poppin off');
    };

    const undo = () => {

    };

    const createPreviousBodyElement = () => {
        const prevBody = doc.createElement('div');
        const bodiesLength = doc.getElementsByClassName('prevBody').length;

        prevBody.id = bodiesLength === 'undefined' ? 0 : bodiesLength;
        prevBody.classList.add('prevBody');
        prevBody.innerHTML = doc.body.innerHTML;

        return prevBody;
    };

    // const content = doc.getElementById('content');
    testItem.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(testItem.getAttribute('href'));
        loading.style.opacity = 1;
        window.history.pushState({ pageID: [doc.body.id] }, null, testItem.getAttribute('href'));
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
                    doc.body.id = resp.body.id;
                    window.history.pushState({ pageID: [doc.body.id] }, null, testItem.getAttribute('href'));

                    doc.body.innerHTML = resp.body.innerHTML;
                    doc.body.append(prevBody);

                    doc.getElementById('loader').style.opacity = '';
                } else {
                    console.log('error on loading resource');
                // We reached our target server, but it returned an error
                }
            };
            request.onerror = function () {
                // There was a connection error of some sort
            };
            console.log(doc.body.id);
            // window.history.pushState({ pageID: [doc.body.id] }, null, testItem.getAttribute('href'));
            console.log(window.history.state);

            request.send();
        }, 1000);
    });
}(document));
