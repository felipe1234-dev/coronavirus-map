import React from 'react';
import {
    Nav,
    Icon,
    Navbar,
    Dropdown
} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

export default class Topnav extends React.Component {

    componentDidMount() {
        this.setState(this.state);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
            this.setState(this.state);
        }
    }

    render() {
        const { lang } = this.props;

        const switchLang = this.props.switchLang;

        let language = (lang.to === 'en')? 'English' : (
            (lang.to === 'fr')? 'Français' : (
                (lang.to === 'de')? 'Deutsche' : (
                    (lang.to === 'es')? 'Español' : 'Português'
                )
            ) 
        );

        return (
            <Navbar appearance='default'>
                <Navbar.Header>
                    <a href='#' className='navbar-brand logo'>
                        Coronavirus (COVID-19) Dashboard
                    </a>
                </Navbar.Header>
                <Navbar.Body>
                    <Nav pullRight>
                        <Dropdown title={language} icon={<Icon icon='language' />}>
                            <Dropdown.Item
                                onClick={() => switchLang('fr')}
                            >Français</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => switchLang('de')}
                            >Deutsche</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => switchLang('es')}
                            >Español</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => switchLang('pt')}
                            >Português</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => switchLang('en')}
                            >English</Dropdown.Item>
                        </Dropdown>
                        <Nav.Item 
                            href='https://github.com/felipe1234-dev/coronavirus-map' target='_blank'
                            icon={<Icon icon='github' />}
                        >
                            Github
                        </Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}
