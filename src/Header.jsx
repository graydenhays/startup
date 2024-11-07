import React from 'react';

function Header() {
    return (
        <header>
            <div className="d-flex flex-row p-2">
                <img className="me-2" src="user icon.jpg" alt="User Icon" width="30px" height="30px" />
                <p>Hello *profile name here*!!</p>
            </div>
            <h1 className="text-end pe-4">Author Website</h1>
            <nav>
                <menu>
                    <a className="navStyles" href="index.html">Home</a>
                    <a className="navStyles" href="about.html">About</a>
                    <a className="navStyles" href="info.html">Info</a>
                </menu>
            </nav>
            <hr />
        </header>
    );
}

export default Header;