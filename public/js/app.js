(function() {
    var textSearch,
        broadSearch,
        booleanSearch,
        orderBy,
        limit,
        url,
        timer,
        links,
        linkSrc,
        images,
        imageSrc,
        mobileLink,
        mobileLinkSrc;

    // Build the url query string from inputs and send ajax request
    function searchFeed() {

        textSearch = $( '#textSearch' ).val();
        console.log( 'textSearch: ' , textSearch );
        broadSearch = $( '#broadSearch' ).val();
        booleanSearch = $( '#booleanSearch' ).val();
        orderBy = $( '#orderBy' ).val();
        limit = $( '#limit' ).val();

        url = '?'

        if ( textSearch ) {
            url += "textsearch=" + textSearch + "&";
        }
        if ( broadSearch ) {
            url += "broadsearch=" + broadSearch + "&";
        }
        if ( booleanSearch ) {
            url += "booleansearch=" + booleanSearch + "&";
        }
        if ( orderBy ) {
            url += "orderby=" + orderBy + "&";
        }
        if ( limit ) {
            url += "limit=" + limit + "&";
        }
        console.log( url );
        $.ajax({
            type: "GET",
            url: 'api/feed' + url,
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                buildDataTable(data);
            },
            error: function (e) {
                console.log(e);
            }
    });
    }

    $( 'input' ).keyup(function( event ) {
        clearTimeout(timer);
        timer = setTimeout(function() {
            searchFeed();
        }, 500);
    });

    function buildDataTable ( data ) {
        resetDataTable();
        $( '.result-count' ).append("Results: " + data.length);
        for (i in data[0]) {
            $( 'table thead tr' ).append("<th>" + i + "</th>");
        }
        data.forEach(function(elem, index, array) {
            $( 'tbody' ).append("<tr class='" + index + "'></tr>");
            for (item in elem) {
                $( 'tbody .' + index ).append("<td><div class='table-item " + item + "'>" + elem[item] + "</div></td>");
            }
        });
        replaceLinks();
    }

    function resetDataTable () {
        $( '.result-count' ).empty();
        $( 'table thead tr' ).empty();
        $( 'tbody' ).empty();
        $( '.feed-refresh-container' ).empty();
    }

    function refreshFeed () {
        resetDataTable();
        $.ajax({
            type: "GET",
            url: 'api/feed/refresh',
            contentType: "text/plain; charset=utf-8",
            success: function (data) {
                var words = data.split(' ');
                var productNumber = words[1].replace('(','').replace(')','');
                $( '.feed-refresh-container' ).append('<p>Success! ' + productNumber + " products loaded!");
            },
            error: function (e) {
                console.log('Error! AHHH!!!!' , e);
            }
    });
    }

    function replaceLinks() {
        links = $( '.table-item.link' );
        links.each( function(i) {
            linkSrc = $( this ).text();
            $( this ).empty().append('<a href=' + linkSrc + '>Link</a>' )
        });
    }

    function insertImages() {
        images = $( '.table-item.image_link' );
        images.each( function() {
            
        })
    }
})();