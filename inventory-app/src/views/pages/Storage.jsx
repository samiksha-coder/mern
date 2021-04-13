import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { SERVICE_URL, API } from "../../config/default.json";
import { saveData } from "../common/customHooks";
import { dateFormatter } from "../common/tableRenderHooks";
import UpdateStorage from "./UpdateStorage";

export default function Storage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storage, setStorage] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [object, setObject] = useState([]);
  const [isUpdated, setUpdated] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  useEffect(() => {
    fetch(SERVICE_URL + API.STORAGE)
      .then(async (response) => {
        const jsonData = await response.json();
        setIsLoaded(true);
        setStorage(jsonData);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });

    fetch(SERVICE_URL + API.BUTTON)
      .then(async (response) => {
        const jsonData = await response.json();
        setButtons(jsonData);
      })
      .catch((error) => {
        setError(error);
      });
  }, [isUpdated]);

  const handleSubmit = async (e, formData) => {
    const result = await saveData(formData, SERVICE_URL + API.STORAGE);
    if (result && typeof result === "object") {
      setUpdated(true);
      alert("saved!");
    } else alert(`error in save result:\n${result}`);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    setObject(selectedRows[0]);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <h1 style={{ display: "inline-block" }}>Storage</h1>
        <UpdateStorage
          handleSubmit={handleSubmit}
          buttons={buttons}
          object={object}
        />
        <div
          className="ag-theme-alpine"
          style={{ height: "500px", width: "100%" }}
        >
          <AgGridReact
            defaultColDef={{
              flex: 1,
              minWidth: 150,
              filter: true,
            }}
            // rowSelection={"single"}
            // onSelectionChanged={onSelectionChanged}
            onGridReady={onGridReady}
            rowData={storage}
          >
            <AgGridColumn sortable={true} field="button.name"></AgGridColumn>
            <AgGridColumn
              sortable={true}
              field="button.material"
            ></AgGridColumn>
            <AgGridColumn sortable={true} field="button.polish"></AgGridColumn>
            <AgGridColumn sortable={true} field="quantity"></AgGridColumn>
            <AgGridColumn sortable={true} field="unit"></AgGridColumn>
            <AgGridColumn
              sortable={true}
              field="updated"
              valueFormatter={dateFormatter}
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </React.Fragment>
    );
  }
}
