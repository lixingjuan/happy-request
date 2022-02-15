import "./App.css";
import { Tabs, message } from "antd";
import { useState, useCallback } from "react";

import Buttons from "./components/Buttons";
import DataList from "./components/Table";
import I18nTransform from "./components/I18nTransform";

import { getAllApi } from "./service";

const { TabPane } = Tabs;

const defaultActiveKey = localStorage.getItem("activeTab") || "1";

const style = {
  height: "100vh",
  margin: "0px auto",
  width: "calc(100vw - 40px)",
};

function App() {
  const [activeTab, setActiveTab] = useState(defaultActiveKey);

  const [dataSource, setDataSource] = useState<
    { url: string; filePath: string }[]
  >([]);

  /** update data */
  const handleUpdate = useCallback(() => {
    getAllApi()
      .then(({ data, code }) => {
        console.log({ data });
        message.success("successful");
        const dataArr = Object.entries(data).map(([url, filePath]) => ({
          url,
          filePath,
        }));
        setDataSource(dataArr);
      })
      .catch((err) => message.error("error", err.message));
  }, []);

  const onChange = (val: string) => {
    setActiveTab(val);
    localStorage.setItem("activeTab", val);
  };

  return (
    <div className="App">
      <Tabs
        style={style}
        onChange={onChange}
        activeKey={activeTab}
        defaultActiveKey={defaultActiveKey}
        tabBarExtraContent={<Buttons onUpdate={handleUpdate} />}
      >
        <TabPane tab="编辑器" key="1">
          <div id="container" className="container"></div>
        </TabPane>
        <TabPane tab="本地数据" key="2">
          <DataList onUpdate={handleUpdate} dataSource={dataSource} />
        </TabPane>
        <TabPane tab="国际化" key="3">
          <I18nTransform />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;