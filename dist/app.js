(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ColorService = require("./services/color-service");
// Router => controller(pages)---sub layer views-- => services
//MVC, MVVM
$(document).ready(() => {
    $('#searchBtn').on('click', () => {
        let searchText = $('#searchText').val();

        ColorService.searchColors(searchText)
            .then((results) => {
                const paletteTemplate = $('#paletteTemplate');
                const paletteHTML = paletteTemplate.html().trim();
                const output = $('#output');

                    results.forEach((palette) => {

                        let $palette =$(paletteHTML);

                        let $paletteImage = $palette.find('.palette-image');
                        let $paletteName = $palette.find('.palette-name');
                        let $paletteAuthor = $palette.find('.palette-author');

                        $paletteImage.attr('src', palette.imageUrl);
                        $paletteName.text(palette.title);
                        $paletteAuthor.text(palette.userName);

                        output.append($palette);
                    });
            })
            .catch((error) => {
                alert("uh-oh");
                console.error('failed:' , error);
            })
        });
    });

},{"./services/color-service":2}],2:[function(require,module,exports){
// available node.js and the browser
module.exports = {
    getColors: getColors,
    searchColors: searchColors
};

const colourLoversAPI = 'http://www.colourlovers.com/api/colors';

function getColors() {

}
function searchColors(query, filters = {}){
        let queryParams = [];
        for (let key in filters){
            queryParams.push(`${key}=${filters[key]}`);
        }
        queryParams.push(`keywords=${query}`);
        queryParams.push(`jsonCallback=?`);

        let searchUrl =  `${colourLoversAPI}?${queryParams.join('&')}`;

        return new Promise((resolve, reject) => {
            $.getJSON(searchUrl , resolve)
                .fail((jqxhr, textStatus, error) => {
                    reject(error)
                });
        });
}
},{}]},{},[1]);
