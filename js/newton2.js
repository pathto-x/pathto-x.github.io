window.state = 69;
// function is used for dragging and moving
  function dragElement( element, direction)
  {
      var   md; // remember mouse down info
      const first  = document.getElementById("first");
      const second = document.getElementById("second");

      element.onmousedown = onMouseDown;

      function onMouseDown( e )
      {
    //console.log("mouse down: " + e.clientX);
    md = {e,
          offsetLeft:  element.offsetLeft,
          offsetTop:   element.offsetTop,
          firstWidth:  first.offsetWidth,
          secondWidth: second.offsetWidth};
    document.onmousemove = onMouseMove;
    document.onmouseup = () => {
        //console.log("mouse up");
        self.viewer.viewport.goHome()
        // const centerPoint = new OpenSeadragon.Point(2488,771);
        //
        // viewer.viewport.panTo(centerPoint)
        document.onmousemove = document.onmouseup = null;
    }
      }

      function onMouseMove( e )
      {
    //console.log("mouse move: " + e.clientX);

    if (direction === "H" ) // Horizontal
    {
        dx = e.clientX - 0.31 * document.body.clientWidth;
        element.style.left = md.offsetLeft + dx + "px";
        first.style.width = "calc(31% + " + dx + "px)";
        second.style.width = "calc(69% - " + dx + "px)";
        //self.viewer.viewport.goHome();
        // second.style.width = "100%"
        window.state=dx;
    }
      }
  }


  dragElement( document.getElementById("separator"), "H" );

  function goHomeandResize() {
    console.log(self.viewer.viewport.getZoom())
    if (self.viewer.viewport.getZoom()<=0.00125) {

    }
    else{
      self.viewer.viewport.goHome();
    }
  }
    window.onresize = goHomeandResize;


var tileSource = {
    Image: {
        xmlns: "http://schemas.microsoft.com/deepzoom/2008",
        Url: "img/newton/tiles/",
        Format: "jpg",
        Overlap: "0",
        TileSize: "256",
        Size: {
            Height: "4286",
            Width:  "13827"
        }
    }
};

// var tileSource = {
//   type: 'image',
//   url:  '../img/newton/FinalVer.jpg',
//   buildPyramid: true,
//   crossOriginPolicy: 'Anonymous',
//   ajaxWithCredentials: false
// };

var viewer = OpenSeadragon({
    id: "contentDiv",
    prefixUrl: "//openseadragon.github.io/openseadragon/images/",
    zoomPerClick: 1.5,
    zoomPerScroll: 1.09,
    tileSources: [{
        tileSource: tileSource,
        width: 4978
        //width:4286
          }]

});
window.viewerBlah = viewer

// viewer.zoomPerClick = 1
var overlay = viewer.svgOverlay();

      //var path = "/Path%20to%20Newton/The%20Path%20to%20Newton-plain2.svg";
      var path = "./img/newton/FinalVer.svg";
      //var path = "/Path%20to%20Newton2/The%20Path%20to%20Newton.svg";
            function _loadSVG(path, callback) {
                  var xhr = new XMLHttpRequest();
                  xhr.onload = function(e) {
                              try {
                                if (xhr.readyState == 4 && xhr.status == 200) {
                                  callback(xhr.responseXML.documentElement);
                                }
                              } catch(e) {
                                console.log(e);
                              }
                            };
                  xhr.open("GET", path, true);
                  xhr.overrideMimeType("text/xml");
                  xhr.responseType = "document";
                  xhr.send();
                }


                    // document.window.resize(function() {
                    //     overlay.resize();
                    // });

const processSVG = function(xmlDocumentElem) {
  var g = xmlDocumentElem.getElementById("bubbles");
  var eachA = xmlDocumentElem.querySelectorAll("#bubbles a")
  //console.log(eachA)
  overlay.node().appendChild(g);

  const niceArrayOfCircles = Array.prototype.slice.call(g.querySelectorAll(".bubble"));
  //console.log(niceArrayOfCircles);
  niceArrayOfCircles.reverse();
  //console.log(niceArrayOfCircles);

  const tableOfValues = niceArrayOfCircles.map(function (n, i)  {
    return {
      id: n.getAttribute("id"),
      cx: n.getAttribute("cx"),
      cy: n.getAttribute("cy")
     }
  });

  //console.table(tableOfValues);

  let n = 0;

  window.timestopN = n;

  window.timestop = window.setInterval(() => {
    let theX = parseInt(tableOfValues[window.timestopN]["cx"], 10);
    let theY = parseInt(tableOfValues[window.timestopN]["cy"], 10);
    let thePoint = new OpenSeadragon.Point(theX, theY)
    const centerPoint = new OpenSeadragon.Point(4977,771);

    viewer.viewport.panTo(thePoint)
    viewer.viewport.zoomTo(0.00125)

    window.timestopN = window.timestopN + 1;
    console.log(window.timestopN);
    if (window.timestopN==36){
      window.timestopN=0
    }
    console.log("beep" + thisPoint + window.timestopN,tableOfValues[window.timestopN]["id"],tableOfValues[window.timestopN]["cx"]+" "+tableOfValues[window.timestopN]["cy"])

  }, 3000)

  /* stops the tour */
  clearInterval(window.timestop)


  // overlay.onClick(g, function() {
  //             console.log('click', arguments);
  //             event.preventDefault();
  //             event.stopPropagation();
  //         });
  window.eachA = eachA;
  eachA.forEach(function(a) {

        overlay.onClick(a, function() {
          if (window.state === 100 || window.state === 0) {
            helloworld(69)
          }
          const href = this.element.getAttribute("xlink:href")

                    console.log('click', arguments);
                    //follow the link here to the anchor that is found ing
                    setTimeout(function() {document.location.assign(href)}, 400)

                    // debugger
                    event.preventDefault();
                    event.stopPropagation();

                });
              })

    $( ".link_to_svg" ).click(function() {
      //alert( "Handler for .click() called." );
      const linkSvgid = this.dataset["svgid"];
      const tableRow = tableOfValues.find(function(e){
        return e.id === linkSvgid;
      });

      if (tableRow === undefined){
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      setTimeout(function() {

        if (window.state === 100 || window.state === 0) {
          helloworld(69)
        }

        setTimeout(function() {
        let theX = parseInt(tableRow["cx"], 10);
        let theY = parseInt(tableRow["cy"], 10);
        let thePoint = new OpenSeadragon.Point(theX, theY)
        const centerPoint = new OpenSeadragon.Point(4977,771);

        viewer.viewport.panTo(thePoint);
        viewer.viewport.zoomTo(0.00125);}, 400)
        // console.log(this.dataset["svgid"])}
      }, 400);





      event.preventDefault();
      event.stopPropagation();
    });


    // console.log(this.dataset["width"]);
    $( ".link_resize" ).click(function(e) {
       var width = parseInt(e.target.dataset["width"],10);
        window.state = width;
        console.log(width);
        helloworld(width)
     } );
}

function helloworld(value) {
  console.log("Hello world");
  var md; // remember mouse down info
  var element = document.getElementById("separator");
  const first  = document.getElementById("first");
  const second = document.getElementById("second");

//console.log("mouse down: " + e.clientX);
md = {
    offsetLeft:  element.offsetLeft,
    offsetTop:   element.offsetTop,
    firstWidth:  first.offsetWidth,
    secondWidth: second.offsetWidth
  };

    // // prevent negative-sized elements
    // delta.x = Math.min(Math.max(delta.x, -md.firstWidth),
    //        md.secondWidth);

    const delta = parseInt(value,10);

    // element.style.left = md.offsetLeft + delta + "px";
    // first.style.width = (md.firstWidth) - delta + "px";
    // second.style.width = (md.secondWidth)+ delta + "px";

    element.style.left =  delta + "%";
    first.style.width = 100 - delta + "%";
    second.style.width = delta + "%";

    function timeOutGoHome() {
      window.setTimeout(goHomeandResize, 200);
    }
    timeOutGoHome();

    console.log(self.viewer.viewport.getZoom());

}

    _loadSVG(path, processSVG);
