import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const TableComponent = ({ data, transaction, columns }) => {
  const [rows, setRows] = useState<any>([]);

  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    let newRows = data;
    console.log(data);
    setRows((prev) => [...prev, ...newRows]);
  }, [data]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{transaction}</span>
    </div>
  );

  const handleEditRow = (e, id) => {
    if (transaction === "Categories") {
      return navigate(`/edit-category/${transaction}/${id}`);
    }
    navigate(`/edit-transaction/${transaction}/${id}`);
  };

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "Registry was deleted successfully",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "No changes where made",
      life: 3000,
    });
  };

  const handleDeleteRow = (e, id) => {
    // confirmDialog({
    //   message: "Are you sure you want to proceed?",
    //   header: "Confirmation",
    //   icon: "pi pi-exclamation-triangle",
    //   accept: () => {},
    //   reject,
    // });
    console.log(id);
  };

  const actionsTemplate = (row) => {
    return (
      <div className="flex flex-row gap-2">
        <Button icon="pi pi-pencil" onClick={(e) => handleEditRow(e, row.id)} />
        <Button
          icon="pi pi-minus"
          onClick={(e) => handleDeleteRow(e, row.id)}
        />
      </div>
    );
  };

  const rowTemplate = columns.map((column: any) => {
    return (
      <Column key={column.field} field={column.field} header={column.header} />
    );
  });

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        value={rows}
        header={header}
        stripedRows
        tableStyle={{ minWidth: "40rem" }}
      >
        {rowTemplate}
        <Column body={actionsTemplate} />
      </DataTable>
    </div>
  );
};

export default TableComponent;
