import React from 'react';
import {
    Input,
    Nav
} from 'rsuite';
import 'rsuite/lib/styles/index.less';

export default class Ranking extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedCountry: ''
        };
    }

    handleOnChange = value => {
        this.setState({
            selectedCountry: value
        });
    }

    componentDidMount() {
        this.setState(this.state);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
            this.setState(this.state);
        }
    }

    render() {

        const { selectedCountry } = this.state;

        const {
            today,
            absolute,
            selectedFilter,
            formatNumber,
            data,
            tr
        } = this.props;

        let dataName = `${(!today)? (
            (absolute)? selectedFilter[0].label : (
                selectedFilter[0].label + "PerOneMillion"
            )
        ) : (
            selectedFilter[0].label.replace(/^(\w){1}/g, c => "today" + c[0].toUpperCase())
        )}`;

        let dataText = `${(!today)? (
            (absolute)? selectedFilter[0].label : (
                selectedFilter[0].label + "/1Mi"
            )
        ) : (
            selectedFilter[0].label +  " today"
        )}`;

        const handleOnChange = this.handleOnChange;

        let counter = 0;

        return (
            <div className="ranking-container">
                <div className="ranking-box">
                    <Nav vertical>
                        <Input 
                            placeholder={tr("Search for a country")}
                            onChange={(value: any) => handleOnChange(value)}
                        />
                        {data.map(item => (
                            item.countries.sort((a, b) => (
                                b[dataName] - a[dataName]
                            )).filter(co => {
                                let country = `${tr(co.country)}`;
                                return (country.search(selectedCountry) > -1);
                            }).map(co => {
                                
                                if (counter < 4) {
                                    counter++;
                                }
                                    
                                return (
                                    <Nav.Item>
                                        <h2>
                                            <img
                                                name='flag'
                                                src={co.countryInfo.flag} 
                                                alt={`${co.country} Flag`}
                                            /> 
                                            {tr(co.country)}
                                        </h2>
                                        <ul>
                                            <li>
                                                <p>
                                                    <b style={{ color: (counter < 4)? selectedFilter[0].color : "#A4A9B3" }}>
                                                        {formatNumber(co[dataName])}
                                                    </b> {tr(dataText)}
                                                </p>
                                            </li>
                                        </ul>
                                    </Nav.Item>
                                )

                            })
                        ))}
                    </Nav>
                </div>
            </div>
        )
    }

}
