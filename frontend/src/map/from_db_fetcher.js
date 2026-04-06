import React, { useState, useEffect, useCallback } from 'react';
import './mapcomp.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM'; // Правильный импорт для OSM
import { LineString } from 'ol/geom'; // Правильный импорт для LineString
import { Style,  Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import Icon from 'ol/style/Icon';



import { useTranslation } from 'react-i18next';


const countries = {
  "Poland": [
    { name: "Szczecin", coords: [14.5528, 53.4285] },
    { name: "Gorzów Wielkopolski", coords: [15.2400, 52.7300] },
    { name: "Wrocław", coords: [17.0385, 51.1079] },
    { name: "Kraków", coords: [19.9445, 50.0497] },
    { name: "Gdańsk", coords: [18.6466, 54.3520] },
    { name: "Warsaw", coords: [21.0122, 52.2297] },
    { name: "Katowice", coords: [19.0275, 50.2649] }
  ],
  "Germany": [
    { name: "Berlin", coords: [13.4050, 52.5200] },
    { name: "Munich", coords: [11.5820, 48.1351] },
    { name: "Nuremberg", coords: [11.0767, 49.4521] },
    { name: "Bonn", coords: [7.0982, 50.7374] },
    { name: "Düsseldorf", coords: [6.7735, 51.2277] },
    { name: "Stuttgart", coords: [9.1829, 48.7758] }
  ],
  "Spain": [
    { name: "Madrid", coords: [-3.7038, 40.4168] },
    { name: "Barcelona", coords: [2.1734, 41.3851] },
    { name: "Valencia", coords: [-0.3763, 39.4699] }
  ],
  "Netherlands": [
    { name: "Amsterdam", coords: [4.9041, 52.3676] },
    { name: "Rotterdam", coords: [4.4777, 51.9244] },
    { name: "Utrecht", coords: [5.1214, 52.0907] }
  ],
  "Czech Republic": [
    { name: "Prague", coords: [14.4378, 50.0755] },
    { name: "Brno", coords: [16.6068, 49.1951] }
  ],
  "Austria": [
    { name: "Vienna", coords: [16.3738, 48.2082] },
    { name: "Salzburg", coords: [13.0458, 47.8095] }
  ]
};

    
    const MapComponent = () => {
        const [map, setMap] = useState(null);
        const [data, setData] = useState([]);
        const [lastCoordinate, setLastCoordinate] = useState(null);
        const [zoomLevel, setZoomLevel] = useState(10); // Начальный масштаб

        const { t } = useTranslation();
          const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");




        const fetchDataWithDates = useCallback(async () => {
    try {
        const response = await fetch('https://wc5y5iw62a.execute-api.eu-north-1.amazonaws.com/default/taxi_from_DB_read_only');
        // console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const items = await response.json();

        if (Array.isArray(items) && items.length > 0) {
            const coordinatesData = items.map(item => {
                const latitude = parseFloat(item.latitude);
                const longitude = parseFloat(item.longitude);
                return {
                    ...item,
                    coordinates: [longitude, latitude] // OpenLayers expects [lon, lat]
                };
            });

            setData(coordinatesData);
            localStorage.setItem('routeData', JSON.stringify(coordinatesData));

            const lastItem = coordinatesData[coordinatesData.length - 1];
            setLastCoordinate(lastItem.coordinates);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}, []);

  
        // юз-эффект с отрисовкой кружочков  /////////////////////////////////////////

        useEffect(() => {
            const mapInstance = new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                view: new View({
                    center: fromLonLat([20.861, 52.0902]),
                    zoom: zoomLevel
                })
            });

            // Обновляем масштаб
            mapInstance.getView().on('change:resolution', () => {
                setZoomLevel(mapInstance.getView().getZoom());
            });

            // === Создание элемента popup ===
            const popupElement = document.createElement('div');
            popupElement.className = 'ol-popup';
            popupElement.style.background = 'white';
            popupElement.style.padding = '5px 10px';
            popupElement.style.border = '1px solid black';
            popupElement.style.borderRadius = '4px';
            popupElement.style.position = 'absolute';
            popupElement.style.display = 'none'; // скрыт по умолчанию

            document.body.appendChild(popupElement); // Добавим в DOM

            const overlay = new Overlay({
                element: popupElement,
                positioning: 'bottom-center',
                stopEvent: false,
                offset: [0, -10]
            });

            mapInstance.addOverlay(overlay);

         
            let hideTimeout = null;

            mapInstance.on('pointermove', (evt) => {
                const feature = mapInstance.forEachFeatureAtPixel(evt.pixel, f => f);

                if (feature && feature.get('type') === 'point') {
                    const coords = feature.getGeometry().getCoordinates();
                    const props = feature.get('props');

                    popupElement.innerHTML = `
                        <b>${t('device')}</b> ${props.device_num}<br/>
                        <b>${t('time')}</b> ${props.datetime}<br/>
                        <b>${t('clip')}</b> <a href="${props.video_clip}" target="_blank" rel="noopener noreferrer">${props.video_clip}</a>
                    `;
                    popupElement.style.display = 'block';
                    overlay.setPosition(coords);

                    // Очищаем таймер, если уже наведено
                    if (hideTimeout) {
                        clearTimeout(hideTimeout);
                        hideTimeout = null;
                    }
                } else {
                    // Если ушли — подождать 500мс перед скрытием
                    hideTimeout = setTimeout(() => {
                        popupElement.style.display = 'none';
                    }, 6800);   //time to click
                }
            });


    setMap(mapInstance);


    return () => {
    mapInstance.setTarget(null);
    if (document.body.contains(popupElement)) {
        document.body.removeChild(popupElement);
    }
    if (hideTimeout) {
    clearTimeout(hideTimeout);
}

};

}, [zoomLevel , t]);

    
        useEffect(() => {
            fetchDataWithDates();
        }, [fetchDataWithDates]);

    
        useEffect(() => {
            if (map && data.length > 0) {
                const routeCoordinates = data.map(item => item.coordinates);
    

                const routeFeatures = data.map(item => {
                    const coord = fromLonLat(item.coordinates);

             

                    const feature = new Feature({
                        geometry: new Point(coord)
                    });
                    feature.set('type', 'point'); // метка что это точка
                    feature.set('props', {
                        device_num: item.device_num,
                        datetime: item.datetime,
                        video_clip: item.video_clip
                    });
                    return feature;

                });

    
                const routeVectorSource = new VectorSource({
                    features: routeFeatures
                });
    
     
                const routeStyle = new Style({
    image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: '/car.png',
        scale: 0.5, // можешь увеличить или уменьшить
        rotation: 0 // можно также анимировать поворот, если нужно
    })
});

    
                const routeVectorLayer = new VectorLayer({
                    source: routeVectorSource,
                    style: routeStyle
                });
    
                map.addLayer(routeVectorLayer);
    
                const routeLines = routeCoordinates.slice(1).map((endPoint, i) => {
                    const startPoint = routeCoordinates[i];
                    return new Feature({
                        geometry: new LineString([startPoint, endPoint])
                    });
                });
    
                const routeLineSource = new VectorSource({
                    features: routeLines
                });
    
                const routeLineStyle = new Style({
                    stroke: new Stroke({
                        color: 'blue',
                        width: 2
                        })
                });
    
                const routeLineLayer = new VectorLayer({
                    source: routeLineSource,
                    style: routeLineStyle
                });
    
                map.addLayer(routeLineLayer);
    
                if (lastCoordinate) {
                    const lastLonLat = fromLonLat(lastCoordinate);
                    map.getView().setCenter(lastLonLat);
                    map.getView().setZoom(zoomLevel);
                }
            }
        }, [map, data, lastCoordinate, zoomLevel]);


// //  Центрирование карты при выборе города
//         useEffect(() => {
//             if (map && selectedCity && selectedCountry) {
//             const cityData = countries[selectedCountry].find(c => c.name === selectedCity);
//             if (cityData) {
//                 map.getView().setCenter(fromLonLat(cityData.coords));
//                 map.getView().setZoom(12);
//             }
//             }
//         }, [selectedCity, selectedCountry, map]);
            

//  Центрирование карты при выборе города + маркер
useEffect(() => {
    if (map && selectedCity && selectedCountry) {
        const cityData = countries[selectedCountry].find(c => c.name === selectedCity);
        if (cityData) {
            const coords = fromLonLat(cityData.coords);
            map.getView().setCenter(coords);
            map.getView().setZoom(12);

            // Удаляем старые маркеры
            map.getLayers().forEach(layer => {
                if (layer.get('markerLayer')) map.removeLayer(layer);
            });

            // Создаём маркер
            const markerFeature = new Feature({
                geometry: new Point(coords)
            });

            markerFeature.setStyle(new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    src: '/marker.png', // путь к иконке
                    scale: 0.8
                })
            }));

            const markerLayer = new VectorLayer({
                source: new VectorSource({ features: [markerFeature] })
            });
            markerLayer.set('markerLayer', true);

            map.addLayer(markerLayer);
        }
    }
}, [selectedCity, selectedCountry, map]);

            
        return (
  <div className="container">
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '10px' }}>
        {t('choose_car_and_watch_clip')}
      </h2>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <select value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity(""); }}>
          <option value="">{t('select_country')}</option>
          {Object.keys(countries).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {selectedCountry && (
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">{t('select_city')}</option>
            {countries[selectedCountry].map(city => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
          </select>
        )}
      </div>

      <div
        id="map"
        style={{
          marginBottom: '5px',
          width: '100%',
          height: '80vh' // или сколько тебе нужно
        }}
      ></div>
    </div>
  </div>
);
};
    
export default MapComponent;
       
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useCallback } from 'react';
// import './mapcomp.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import { fromLonLat } from 'ol/proj';
// import { useTranslation } from 'react-i18next';

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [data, setData] = useState([]);
//   const [lastCoordinate, setLastCoordinate] = useState(null);
//   const [zoomLevel, setZoomLevel] = useState(10);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const { t } = useTranslation();

//   const countries = {
//     "Польша": [
//       { name: "Щецин", coords: [14.5528, 53.4285] },
//       { name: "Гожув", coords: [15.2400, 52.7300] },
//       { name: "Вроцлав", coords: [17.0385, 51.1079] },
//       { name: "Краков", coords: [19.9445, 50.0497] },
//       { name: "Гданск", coords: [18.6466, 54.3520] },
//       { name: "Варшава", coords: [21.0122, 52.2297] },
//       { name: "Катовице", coords: [19.0275, 50.2649] }
//     ],
//     "Германия": [
//       { name: "Берлин", coords: [13.4050, 52.5200] },
//       { name: "Мюнхен", coords: [11.5820, 48.1351] },
//       { name: "Нюрнберг", coords: [11.0767, 49.4521] },
//       { name: "Бонн", coords: [7.0982, 50.7374] },
//       { name: "Дюссельдорф", coords: [6.7735, 51.2277] },
//       { name: "Штутгарт", coords: [9.1829, 48.7758] }
//     ]
//   };

//   // Центрирование на выбранный город
//   useEffect(() => {
//     if (map && selectedCountry && selectedCity) {
//       const cityData = countries[selectedCountry].find(c => c.name === selectedCity);
//       if (cityData) {
//         map.getView().animate({
//           center: fromLonLat(cityData.coords),
//           zoom: 12,
//           duration: 1000
//         });
//       }
//     }
//   }, [selectedCity, selectedCountry, map]);

//   const fetchDataWithDates = useCallback(async () => {
//     console.log("🚀 Запуск fetchDataWithDates");
//     try {
//       const response = await fetch(
//         'https://93jfd6f4f1.execute-api.eu-north-1.amazonaws.com/default/taxi_from_DB_read_only'
//       );
//       console.log("HTTP статус:", response.status);

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const items = await response.json();
//       console.log("📦 Полученные данные:", items);

//       if (Array.isArray(items) && items.length > 0) {
//         const coordinatesData = items.map(item => ({
//           ...item,
//           coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)]
//         }));
//         setData(coordinatesData);
//         localStorage.setItem('routeData', JSON.stringify(coordinatesData));

//         const lastItem = coordinatesData[coordinatesData.length - 1];
//         setLastCoordinate(lastItem.coordinates);
//       }
//     } catch (error) {
//       console.error('❌ Ошибка при получении данных:', error);
//     }
//   }, []);

//   useEffect(() => {
//     const mapInstance = new Map({
//       target: 'map',
//       layers: [new TileLayer({ source: new OSM() })],
//       view: new View({
//         center: fromLonLat([21.0122, 52.2297]), // Варшава
//         zoom: zoomLevel
//       })
//     });

//     mapInstance.getView().on('change:resolution', () => {
//       setZoomLevel(mapInstance.getView().getZoom());
//     });

//     setMap(mapInstance);
//     return () => mapInstance.setTarget(null);
//   }, [zoomLevel]);

//   useEffect(() => {
//     fetchDataWithDates();
//   }, [fetchDataWithDates]);

//   return (
//     <div className="container"  style={{ display: 'flex', flexDirection: 'column' }}>
//       <h2 style={{ marginBottom: '10px' }}>{t('choose_car_and_watch_clip')}</h2>

//       <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', borderBottom: '25px ', paddingBottom: '15px' }}>
//         <select value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity(""); }}>
//           <option value="">Выберите страну</option>
//           {Object.keys(countries).map(country => (
//             <option key={country} value={country}>{country}</option>
//           ))}
//         </select>

//         {selectedCountry && (
//           <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
//             <option value="">Выберите город</option>
//             {countries[selectedCountry].map(city => (
//               <option key={city.name} value={city.name}>{city.name}</option>
//             ))}
//           </select>
//         )}
//       </div>

//       <div id="map" style={{ width: '100%', height: '80vh' }}></div>
//     </div>
//   );
// };

// export default MapComponent;
