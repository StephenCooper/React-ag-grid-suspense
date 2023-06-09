import {
  GridReadyEvent
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { useCallback, useMemo, useRef, useState } from "react";
import './App.css';

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry
} from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

export interface IOlympicData {
  athlete: string,
  age: number,
  country: string,
  year: number,
  date: string,
  sport: string,
  gold: number,
  silver: number,
  bronze: number,
  total: number
}

const columnDefs: ColDef<IOlympicData>[] = [
  { field: "athlete" },
  { field: "age" },
];


const GridComp = () => {
  const gridRef = useRef(null);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      initialWidth: 100,
      sortable: true,
      resizable: true
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent<IOlympicData>) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={gridStyle} className="ag-theme-alpine">
    <AgGridReact<IOlympicData>
      ref={gridRef}
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      onGridReady={onGridReady}
    ></AgGridReact>
  </div>
  );
};

export default GridComp;
