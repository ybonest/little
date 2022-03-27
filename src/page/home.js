import React from "react";
import { Link } from "react-router-dom";
import { Store } from "../utils/context";

function HomePage() {
    const sources = React.useContext(Store);

    return (
        <div style={{ padding: "30px 10px" }} className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
            {(sources || []).map(item => (<div key={item.name} className="col">
                <Link to={item.name}>{item.name}</Link>
            </div>))}
        </div>
    )
}

export default HomePage;