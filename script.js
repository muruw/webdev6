(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();

            c.innerHTML = date.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
        }
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function calcul(s, p) {
        const priceAtm = parseFloat(e.innerHTML.slice(0, 3));
        const newPrice = priceAtm + p;

        e.innerHTML = newPrice + " &euro;"
    }
    function checkRequiredFields() {
        const fn = document.getElementById('fname');
        const ln = document.getElementById('lname');

        if (fn.value.length === 0){
            alert('Eesnimi pole sisestatud!');
            return;
        }
        if (ln.value.length === 0) {
            alert('Perekonnanime pole sisestatud!')
            return;
        }

        const radios = document.querySelectorAll('input[type="radio"]:checked');
        const value = radios.length>0? radios[0].value: null;

        if (!value) {
            alert('Vali karbi värv');
        }
    }


    function estimateDelivery(event) {
        event.preventDefault();


        var linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else if (linn.value === "tln") {
            showPrice(e, "0.00");
        } else if (linn.value === "trt") {
            showPrice(e, "2.5");
        } else if (linn.value === "nrv") {
            showPrice(e, "2.5");
        } else if (linn.value === "prn") {
            showPrice(e, "3.00");
        }
        else {
            
            e.innerHTML = "x,xx &euro;";
            
        }

        var v1 = document.getElementById("v1");
        var v2 = document.getElementById("v2");

          var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            // subTitle: 'Hea koht',
            // text: 'UT'
        });
  if (v1.checked === true)  {
            calcul(v1, 5);
        }
        if (v2.checked === true){
            calcul(v2, 1)
        }


        checkRequiredFields();
        console.log("Tarne hind on arvutatud");
    }

    function showPrice(e, label) {
        e.innerHTML = label + " &euro;";
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {
    
    "use strict";

    var centerPoint1 = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    var centerPoint2 = new Microsoft.Maps.Location(
        57.38104,
        28.71992
    );

    var centerPoint3 = new Microsoft.Maps.Location(
        57.78104,
        28.91992
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(57.88104, 27.71992),
        zoom: 6,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    var pushpin1 = new Microsoft.Maps.Pushpin(centerPoint1, {
            title: 'Tartu Ülikool',
            // subTitle: 'Hea koht',
            // text: 'UT'
        });

    var pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, {
        title: 'Ostrov',
        // subTitle: 'Hea koht',
        // text: 'UT'
    });

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

