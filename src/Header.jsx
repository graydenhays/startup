import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';

function Header() {
    return (
        <header>
            <div className="d-flex flex-row p-2">
                <Image className="me-2" src="user icon.jpg" alt="User Icon" width="30px" height="30px" />
                <p>Hello *profile name here*!!</p>
            </div>
            <h1 className="text-end pe-4">Author Website</h1>
            <Navbar className='mt-3'>
                <Nav className='ms-auto'>
                    <Nav.Link className="navStyles" href="index.html">Home</Nav.Link>
                    <Nav.Link className="navStyles" href="about.html">About</Nav.Link>
                    <Nav.Link className="navStyles" href="info.html">Info</Nav.Link>
                </Nav>
            </Navbar>
            <hr />
        </header>
    );
}

export default Header;