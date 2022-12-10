import { SearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect } from "react";
import { LayersControl, MapContainer, TileLayer, useMap, addControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-geosearch/dist/geosearch.umd.js";
const { BaseLayer } = LayersControl;

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});


function FlyToButton() {
    const map = useMap();

    const onClick = () => {
        map.locate().on("locationfound", function (e) {
            // map.flyTo(e.latlng, map.getZoom());
            console.log(e.latlng);
        });
    };

    return (
        <button className="button" onClick={onClick}>
            Locate on click
        </button>
    );
}

function LeafletgeoSearch() {
    const map = useMap();

    const provider = new OpenStreetMapProvider();

    const onShowLocation = (result) => {
        if (result) {
            console.log(result.location.x)
        }
    };

    useEffect(() => {
        if (!map) return;

        const searchControl = new SearchControl({
            notFoundMessage: "Sorry, that address could not be found.",
            provider,
            marker: {
                icon
            }
        });



        map.addControl(searchControl);
        map.on('geosearch/showlocation', onShowLocation);

        return () => {
            map.removeControl(searchControl)
        };
    }, [map]);

    return null;
}

export default function Map() {


    return (<>

        <div>
            <MapContainer>
                <FlyToButton />

            </MapContainer>
        </div>
        <div className="flex ml-auto">
            <div className="w-4/5">
                <MapContainer
                >


                    <LeafletgeoSearch />
                    <LayersControl>
                        <BaseLayer checked name="OpenStreetMap">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
                            />
                        </BaseLayer>
                    </LayersControl>
                </MapContainer>
            </div>
        </div>
    </>
    );
}
