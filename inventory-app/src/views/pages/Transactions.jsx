import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { SERVICE_URL, API } from "../../config/default.json";
import { saveData } from "../common/customHooks";
import { txDateFormatter } from "../common/tableRenderHooks";
import UpdateTransaction from "../components/UpdateTransaction";

export default function Transactions() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [isUpdated, setUpdated] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  useEffect(() => {
    fetch(SERVICE_URL + API.TRANSACTION)
      .then(async (response) => {
        const jsonData = await response.json();
        setIsLoaded(true);
        setTransaction(jsonData);
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
  }, [isUpdated, setUpdated]);

  const handleSubmit = async (e, formData) => {
    const result = await saveData(formData, SERVICE_URL + API.TRANSACTION);
    if (result && typeof result === "object") {
      setUpdated(true);
      transaction.push(result);
      alert("saved!");
    } else alert(`error in save result:\n${result}`);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const columnDefs = [
    {
      headerName: "Button",
      children: [
        { field: "button.name", headerName: "Name", sortable: true },
        { field: "button.material", headerName: "Material", sortable: true },
        { field: "button.polish", headerName: "Polish", sortable: true },
      ],
    },
    {
      headerName: "Transactions",
      children: [
        { field: "type", sortable: true },
        { field: "quantity", sortable: true },
        { field: "unit", sortable: true },
        {
          field: "date",
          sortable: true,
          valueFormatter: txDateFormatter,
          width: 200,
        },
      ],
    },
  ];

  columnDefs.valueFormatter = txDateFormatter;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <h1 style={{ display: "inline-block" }}>Transaction</h1>
        <UpdateTransaction
          handleSubmit={handleSubmit}
          buttons={buttons}
          object={[]}
        />
        <div
          className="ag-theme-alpine"
          style={{ height: "80vh", width: "100%" }}
        >
          <AgGridReact
            defaultColDef={{
              initialWidth: 160,
              filter: true,
            }}
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            rowData={transaction}
            rowDragManaged="true"
          ></AgGridReact>
        </div>
      </React.Fragment>
    );
  }
}
