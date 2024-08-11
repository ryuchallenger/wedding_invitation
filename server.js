require('dotenv').config(); // .env 파일에서 환경 변수를 로드합니다
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/tmap', (req, res) => {
    const apiKey = process.env.TMAP_API_KEY;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>지도 페이지</title>
            <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${apiKey}"></script>
            <style>
                #map { width: 100%; height: 450px; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var map = new Tmapv2.Map("map", {
                    center: new Tmapv2.LatLng(37.6543021, 126.9352783),
                    zoom: 15
                });

                var marker = new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(37.6543021, 126.9352783),
                    map: map,
                    title: "파노라마 베이커리 카페"
                });
            </script>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
