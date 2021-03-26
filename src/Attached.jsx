import React from 'react';
import {
    Nav, 
    Icon,
    Toggle
} from 'rsuite';
import Ranking from './Ranking.jsx';
import 'rsuite/dist/styles/rsuite-default.css';

export default class Attached extends React.Component {

    constructor(){
        super();
        this.state = {
            filters: [
                {
                    icon: 'heartbeat',
                    label: 'deaths'
                }, 
                {
                    icon: 'heart',
                    label: 'recovered'
                }, 
                {
                    icon: 'eyedropper',
                    label: 'tests'
                }, 
                {
                    icon: 'line-chart',
                    label: 'cases'
                }
            ]
        }
    }

    componentWillMount() { this.setState(this.state); }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.lang) !== JSON.stringify(prevProps.lang)) {
            this.setState(this.state);
        }
    }

    render() {
        const { filters } = this.state;
        const { 
            selectedFilter, 
            switchFilter,
            switchDatatype,
            switchTimestamp,
            today,
            tr
        } = this.props;

        return (
            <>
                <section className="attached1">
                    <Nav>
                        {filters.map(item => (
                            <Nav.Item 
                                icon={<Icon icon={item.icon} />}
                                onClick={() => switchFilter(item.label)}
                                style={{
                                    backgroundColor: 
                                    (item.label === selectedFilter[0].label)? 
                                    ('#292d33') : ('transparent')
                                }}
                                disabled={(today && item.label === 'tests')? "true" : ""}
                            >
                                {tr(item.label)}
                            </Nav.Item>
                        ))}
                    </Nav>
                </section>
                <section className="attached2">
                    <Nav>
                        <Nav.Item className="no-hover">
                            <Toggle 
                                onChange={() => switchDatatype()} 
                                checkedChildren={tr("relative")} 
                                unCheckedChildren={tr("absolute")} 
                                disabled={today? "true" : ""}
                            />
                        </Nav.Item>
                        <Nav.Item className="no-hover">
                            <Toggle 
                                onChange={() => switchTimestamp()} 
                                checkedChildren={tr("today")}
                                unCheckedChildren={tr("all")} 
                            />
                        </Nav.Item>
                    </Nav>
                </section>
                <section className="attached3">
                    <Ranking { ...this.props } />
                </section>
            </>
        )
    }
    
}