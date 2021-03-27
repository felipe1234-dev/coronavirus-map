import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import axios from 'axios';
import Topnav from './Topnav.jsx';
import Map from './Map.jsx';
import Attached from './Attached.jsx';
import es from './es/Translations.jsx';
import de from './de/Translations.jsx';
import fr from './fr/Translations.jsx';
import pt from './pt/Translations.jsx';
import 'rsuite/dist/styles/rsuite-default.css';
import './rsuite-dark-theme.css';
import './style.css';

export default class Layout extends React.Component {

    constructor(){
        super();
        this.state = {
            coronaData: [],
            dataFilters: {
                selected: 'cases',
                list: [
                    {
                        id: 0,
                        label: 'cases',
                        color: 'blue'
                    },
                    {
                        id: 1,
                        label: 'recovered',
                        color: 'yellow'
                    },
                    {
                        id: 2,
                        label: 'deaths',
                        color: 'red'
                    },
                    {
                        id: 3,
                        label: 'tests',
                        color: 'green'
                    }
                ]
            },
            dashboardLang: {
                to: 'pt',
                from: 'en'
            },
            absoluteData: true,
            todayData: false
        };
    }
    
    async componentDidMount() {
        let countries, all;

        // Fetching Data from NovelCOVID API V2, which will be bring us Coronavirus most recent stats for free
        await Promise.all([
            axios.get('https://corona.lmao.ninja/v3/covid-19/countries', {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT, DELETE',
                    'Access-Control-Allow-Headers':'Origin, Content-Type, Accept, Authorization, X-Request-With'
                }
            }),
            axios.get('https://corona.lmao.ninja/v3/covid-19/all', {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT, DELETE',
                    'Access-Control-Allow-Headers':'Origin, Content-Type, Accept, Authorization, X-Request-With'
                }
            })
        ]).then(([national, global]) => {
            countries = national.data;
            all = [ 
                global.data
            ];
        }).catch(error => {
            console.log(`Failed to fetch: ${error.message}`, error);
            return;
        });

        let hasData;

        // Checking if countries.Data has Data, otherwise, interrupt function
        hasData = Array.isArray(countries) && countries.length > 0;
        if (!hasData) {
            console.log('No data found in: countries = []');
            return;
        }

        // Checking if all.Data has Data, otherwise, interrupt function
        hasData = Array.isArray(all) && all.length > 0;
        if (!hasData) {
            console.log('No data found in: all = []');
            return;
        }
    
        const formatted = [
            {
                all: all.map(inf => ({ ...inf })),
                countries: countries.map(co => ({ ...co }))
            }
        ];
        
        console.log(formatted[0]);

        this.setState({ coronaData: formatted });
    }

    calcPastTime = unixDate => {
        let actualMinute = new Date().getMinutes();
        let pastMinute = new Date(unixDate).getMinutes();
        return (actualMinute - pastMinute);
    } 

    formatNumber = num => {
        num = num.toString();
        num = num.split(".");

        let int = num[0];
        let dec = num[1];

        int = int.match(/\d/g).reverse();

        let newInt = '';
        let j = 0;
        
        for (let i = 0; i < int.length; i++) {
            if (j === 3) {
                newInt = ' ' + newInt;
                j = 0;
            }
            newInt = int[i] + newInt;
            j++;
        }
    
        return (dec !== undefined)? newInt + "." + dec : newInt;
    }

    translate = text => {
        const { dashboardLang } = this.state;
        
        switch (dashboardLang.to) {
            case 'pt':
                return pt[text];
            case 'de':
                return de[text];
            case 'es':
                return es[text];
            case 'fr':
                return fr[text];
            default:
                return text;
        }
    }

    switchFilter = filter => {
        let newObj = this.state.dataFilters;
        newObj.selected = filter;
        this.setState({
            dataFilters: newObj
        });
    }

    switchLang = lang => {
        let newObj = this.state.dashboardLang;
        newObj.to = lang;
        this.setState({
            dashboardLang: newObj
        }); 
    }

    switchDatatype = () => {
        this.setState({
            absoluteData: !this.state.absoluteData
        });
    }

    switchTimestamp = () => {
        let newObj = this.state.dataFilters;
        newObj.selected = (newObj.selected === 'tests')? 'cases' : newObj.selected;
        this.setState({
            todayData: !this.state.todayData,
            dataFilters: newObj
        });
    }

    render() {

        const { 
            coronaData, 
            dataFilters, 
            dashboardLang,
            absoluteData,
            todayData
        } = this.state;

        const basicProps = {
            absolute: absoluteData,
            today: todayData,
            lang: { ...dashboardLang },
            filters: dataFilters,
            selectedFilter: dataFilters.list.filter(
                    filter => (filter.label === dataFilters.selected)
            ).map(filter => ({ ...filter })),
            data: coronaData,
            calcPastTime: this.calcPastTime,
            formatNumber: this.formatNumber,
            switchFilter: this.switchFilter,
            switchLang: this.switchLang,
            switchDatatype: this.switchDatatype,
            switchTimestamp: this.switchTimestamp,
            tr: this.translate
        }

        return (
            <Grid fluid>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <Topnav {...basicProps} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <Map {...basicProps} />
                    </Col>
                </Row>
                <Attached {...basicProps} />
            </Grid>
        )

    }

}