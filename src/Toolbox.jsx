import React from 'react';

class Toolbox extends React.Component {

    componentDidMount() {
        this.setState(this.state);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
            this.setState(this.state);
        }
    }

    render() {
        const {
            country,
            updated, 
            countryInfo,
            selectedFilter,
            formatNumber,
            calcPastTime,
            absolute,
            today,
            tr 
        } = this.props;

        let filterName = `${(!today)? (
            (absolute)? (
                selectedFilter[0].label
            ) : (
                selectedFilter[0].label + "/1Mi"
            )
        ) : (
            selectedFilter[0].label + " today"
        )}`;

        let dataValue = formatNumber( 
            this.props[
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
        );

        let updatedAt = `${
            (calcPastTime(updated) < 0)? tr("right now") : (
                calcPastTime(updated)
            )} ${
            (calcPastTime(updated) > 0)? ( 
                tr("minutes ago")
            ) : ''
        }`;

        return (
            <div className='tooltip-box'>
                <h2>
                    <img
                        name='flag'
                        src={countryInfo.flag} 
                        alt={`${country} Flag`}
                    /> 
                    {tr(country)}
                </h2>
                <ul>
                    <li>
                        <p>
                            <b style={{ color: selectedFilter[0].color }}>
                                {dataValue}
                            </b> {tr(filterName)}
                        </p>
                    </li>
                    <li>
                        <p><b>{tr("last update")}</b> {updatedAt}</p>
                    </li>
                </ul>
            </div>
        );
    }

}

export default Toolbox;