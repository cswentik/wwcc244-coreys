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
