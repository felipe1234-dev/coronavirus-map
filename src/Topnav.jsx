import React from 'react';
import {
    Nav,
    Icon,
    Navbar,
    Dropdown
} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

export default class Topnav extends React.Component {
    render() {
        const switchLang = this.props.switchLang;

        return (
            <Navbar appearance='default'>
                <Navbar.Header>
                    <a href='#' className='navbar-brand logo'>
                        Coronavirus (COVID-19)
                    </a>
                </Navbar.Header>
                <Navbar.Body>
                    <Nav pullRight>
                        <Dropdown title="Language" icon={<Icon icon='language' />}>
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
                        <Nav.Item icon={<Icon icon='github' />}>
                            Github
                        </Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}