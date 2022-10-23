import React from 'react';
import logo from './logo.svg';
import './App.css';

import Template from './component/template'
import Tab from './component/Tab';

function App() {
  return (
    <div>aloha

      <Template height="30">

          <Tab id="1" name="tab1" url="aaa"></Tab>
          <Tab id="2" name="tab2" url="Bbb"></Tab>
      </Template>
    </div>
  );
}

export default App;
