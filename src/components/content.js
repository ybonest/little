import React from "react";
import { useParams } from "react-router-dom";
import { getMdContent } from '../utils/channel';
import { Store } from "../utils/context";

import "highlight.js/styles/github.css";
import 'highlight.js/styles/base16/solarized-light.css'
import "../styles/content.css";

function Content() {
    const [content, setContent] = React.useState('');
    const sources = React.useContext(Store);
    const params = useParams();

    React.useEffect(() => {
        const current = sources.find(item => item.name === params.name);
        (async () => {
            if (current) {
                const content = await getMdContent(current.path);
                setContent(content)
            }
        })()
    }, [params.name, sources])

    return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default Content;