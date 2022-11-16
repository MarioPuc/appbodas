function initMap() {
    console.log('hola');
    let options = {
      zoom: 13,
      center: {lat: 20.967298, lng:-89.623639}
    };
    
    let map = new google.maps.Map(document.getElementById('map-canvas'), options);
    
    let marker = new google.maps.Marker({
        position: {lat: 20.967298, lng:-89.623639},
        map: map,
        draggable: true
    });
    
    google.maps.event.addListener( marker, "dragend", function ( event ) {
        let lat = marker.getPosition().lat();
        let lng = marker.getPosition().lng();
        console.log('draggged :D ', lat, lng);
    });
}

export const mainInit = () => {
    const existingScript = document.getElementById('googleMaps');

    if( existingScript ) {
        document.document.getElementById('googleMaps')
    }

    if(!existingScript) {
        const configs = document.createElement('script');
        configs.innerHTML = initMap.toString();
        document.body.appendChild(configs);
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAdYn5_zpxAdYiHfJc7f0w4hGnUK32BkYc&libraries=places&callback=initMap'
        script.id = 'googleMaps';
        document.body.appendChild(script);

        script.onload = () => {
            //if (callback) callback();
        }
    }

    //if (existingScript && callback) callback();
}