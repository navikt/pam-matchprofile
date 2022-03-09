const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const mustacheExpress = require('mustache-express');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const server = express();
const port = process.env.PORT || 8080;

const CONTEXT_PATH = "/matchprofil"

server.set('port', port);
server.disable('x-powered-by');

server.set('views', path.resolve(__dirname, '..', 'views'));
server.set('view engine', 'html');
server.engine('html', mustacheExpress());

server.use(compression());

server.use(helmet({
    // En del sikkerhets headere er allerede lagt i bigip, dropper de derfor her for å unngå duplkiate headere
    xssFilter: false,
    hsts: false,
    noSniff: false,
    frameguard: false
}));

server.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

server.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'none'"],
        baseUri: ["'none'"],
        mediaSrc: ["'none'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        formAction: ["'self'"],
        styleSrc: ["'self'"],
        fontSrc: ["'self'", 'data:'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'", 'https://*.nav.no'],
        frameSrc: ["'self'"]
    }
}));

server.use(
    `${CONTEXT_PATH}/js`,
    express.static(path.resolve(distDir, 'js'))
);

server.use(
    `${CONTEXT_PATH}/css`,
    express.static(path.resolve(distDir, 'css'))
);

server.use(
    `${CONTEXT_PATH}/public`,
    express.static(path.resolve(__dirname, '..', 'public'))
);



server.get(`${CONTEXT_PATH}/`, (req, res) => {
    res.render('index', {
    });
});


server.get(`${CONTEXT_PATH}/*`, (req, res) => {
    res.status(404)
        .render('not-found.html');
});

server.listen(port, () => {
    console.log(`Express-server startet. Server filer fra ../dist/ til localhost:${port}${CONTEXT_PATH}/`);
});
