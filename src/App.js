import React from 'react';
import { MemoryRouter, Switch, Route, Redirect } from "react-router-dom";

import { getSources, injectSettingIpc } from './utils/channel';
import { Store } from './utils/context';
import HomePage from './page/home';
import ViewPage from './page/view';
import SettingPage from './page/setting';
// import Navigate from './components/Navigate';
import FixedMenu from './components/fixedMenu';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [sources, setSources] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    injectSettingIpc(function() {
      setRedirect(true);
    })
  }, [])

  React.useEffect(() => {
    (async () => {
      const sources = await getSources();
      if (!sources) {
        setRedirect(true);
      } else {
        setSources(sources);
        setLoading(false);
      }
    })();
  }, [sources.length])

  if (loading) {
    return <div>loading....</div>
  }

  return (
    <div className='container-md'>
      <Store.Provider value={sources}>
        <MemoryRouter>
          { redirect && <Redirect to="/setting" replace={true} /> }
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/setting" component={SettingPage} />
            <Route path="/:name" component={ViewPage} />
          </Switch>
          <FixedMenu />
        </MemoryRouter>
      </Store.Provider>
    </div>
  );
}

export default App;
