import React from "react";
import Catalogue from "../components/catalogue";
import Content from "../components/content";

import "../styles/view.css";

function ViewPage() {
    return (
        <div className="container-xxl my-md-4 bd-layout">
            <aside className="bd-sidebar">
                <Catalogue />
            </aside>
            <main className="bd-main order-1">
                <Content />
            </main>
        </div>
    );
}

export default ViewPage;