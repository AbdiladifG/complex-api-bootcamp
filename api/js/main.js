document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('findElevation').addEventListener('click', function () {
        fetch('http://www.geoplugin.net/json.gp?base_currency=EUR')
            .then(res => res.json())
            .then(locationData => {
                console.log(locationData)
                let lat = locationData.geoplugin_latitude;
                let lon = locationData.geoplugin_longitude;

                console.log(`Latitude: ${lat}, Longitude: ${lon}`);
                fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`)
                    .then(res => res.json())
                    .then(elevationData => {
                        console.log(elevationData)
                        let elevation = elevationData.results[0].elevation;
                        document.querySelector('ul').innerHTML = `<li>
                            Your Location: Latitude ${lat}, Longitude ${lon}
                            <br>
                            Elevation: ${elevation} meters
                        </li>`;
                    })
                    .catch(err => console.error('elevation API:', err));
            })
            .catch(err => console.error('geoplugin API:', err));
    });
});