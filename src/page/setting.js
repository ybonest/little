import React from "react";
import Input from "antd/es/input";

import { getAppConfig, setAppConfig } from '../utils/channel';

import "../styles/setting.css";

function SettingPage() {
    const [loading, setLoading] = React.useState(true);
    const [config, setConfig] = React.useState('')

    React.useEffect(() => {
        (async () => {
            const result = await getAppConfig();
            setConfig(result);
            setLoading(false);
        })();
    }, [config])

    function handleInputChange(e) {
        const { path, name } = e.target.files[0];
        const sourcePath = path.replace(name, '');
        setAppConfig(sourcePath);
        setConfig(sourcePath);
    }

    if (loading) {
        return <div>loading....</div>
    }

    return (
        <div className="card setting-card" style={{ width: "30rem", height: "12rem" }}>
            <div className="card-body">
                <Input
                    type="file"
                    onChange={handleInputChange}
                    webkitdirectory="true"
                    directory=""
                    multiple
                    className="form-control"
                    placeholder="请选择资源目录"
                />
            </div>
        </div>
    );
}

export default SettingPage;