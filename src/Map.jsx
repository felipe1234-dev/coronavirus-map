import React from 'react';
import Toolbox from './Toolbox.jsx';
import {
    MapContainer,
    TileLayer,
    LayerGroup,
    Circle,
    Tooltip 
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default class Map extends React.Component {  

    constructor(){
        super();
        this.state = {
            MapSettings: {
                center: [0, 0],
                defaultBaseMap: 'OpenStreetMap',
                zoom: 3,
                scrollWheelZoom: true,
                style: { 
                    height: '91.5vh', 
                    width: '100wh', 
                    zIndex: '0'
                }
            },
            TileLayerSettings: {
                url: 'https://api.mapbox.com/styles/v1/felipe1234-dev/cklo8bjov5iya17qbwl4miqt3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmVsaXBlMTIzNC1kZXYiLCJhIjoiY2treXlsODhzMnRvZjJ3bXJmcXUwb3UxNiJ9.T2zEQro5gX8CvzmhtInNpA',
                attribution: 'Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&qu;>Mapbox</a>'
            }
        };
    }

    calcRadius = num => {
        const { 
            data, 
            selectedFilter,
            absolute
        } = this.props;
        
        let total;
        
        data.map(item => {
            total = item.all.map(inf => (
                (!absolute)? (
                    inf[selectedFilter[0].label + 'PerOneMillion']
                ) : (
                    inf[selectedFilter[0].label]
                )
            ));
        });

        let radius = (absolute)? num*100/total*100000 : num*100/total*500;
        return (radius < 80000)? 80000 : (radius > 800000)? 800000 : radius;
    }

    render() {
        const { 
            MapSettings, 
            TileLayerSettings
        } = this.state;
        const { 
            data, 
            selectedFilter,
            absolute,
            today
        } = this.props;
        const calcRadius = this.calcRadius;

        return (
            <MapContainer {...MapSettings} >
                <TileLayer {...TileLayerSettings} />
                <LayerGroup>
                    {data.map(item => (
                        item.countries.map(co => {
                            
                            let radius = calcRadius(
                                co[
                                    (!today)? (
                                        (absolute)? (
                                            selectedFilter[0].label
                                        ) : (
                                            selectedFilter[0].label + "PerOneMillion"
                                        )
                                    ) : (
                                        selectedFilter[0].label.replace(/^(\w){1}/g, c => "today" + c[0].toUpperCase())
                                    )
                                ]
                            )
                            
                            const CircleSettings = {
                                center: [
                                    co.countryInfo.lat, 
                                    co.countryInfo.long
                                ], 
                                radius: radius,
                                pathOptions: {
                                    color: selectedFilter[0].color
                                },
                                stroke: false
                            }

                            const ToolboxSettings = {
                                ...co, 
                                ...this.props
                            }

                            return (
                                <Circle {...CircleSettings}>
                                    <Tooltip>
                                        <Toolbox {...ToolboxSettings} />
                                    </Tooltip>
                                </Circle>
                            )
                        })
                    ))}
                </LayerGroup>
            </MapContainer>
        )
    }

}