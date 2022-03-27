import React from "react";
import { Link } from "react-router-dom";
import { Store } from "../utils/context";

function Catalogue() {
    const sources = React.useContext(Store);

    return (
        <nav className="cata-hidden bd-links" id="bd-docs-nav" aria-label="Docs navigation">
            <ul className="list-unstyled mb-0 py-3 pt-md-1">
                {sources.map(item => (
                    <li className="mb-1" key={item.name}>
                        <Link className="d-inline-flex align-items-center rounded" to={`/${item.name}`}>{ item.name }</Link>
                    </li>
                ))}
            </ul> 
        </nav>
    )
}

export default Catalogue;