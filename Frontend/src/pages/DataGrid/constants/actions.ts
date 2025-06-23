import { deleteCarById } from "../Services/DataService";

export interface ActionItem {
  label: string;
  value: string;
  handler: (rowData: any, navigate?: (path: string) => void, onDeleteSuccess?: () => void) => void;
}

export const ACTIONS: ActionItem[] = [
  {
    label: "Delete",
    value: "delete",
    handler: async (rowData, _navigate, onDeleteSuccess) => {
      if (window.confirm(`Are you sure you want to delete ${rowData.Brand} ${rowData.Model}?`)) {
        try {
          await deleteCarById(rowData._id);
          alert(`Deleted ${rowData._id}`);
          if (onDeleteSuccess) onDeleteSuccess();
        } catch (error) {
          console.error("Error deleting car:", error);
          alert("Failed to delete the car. Please try again later.");
          return;
        }
      }
    }
  },
  {
    label: "View",
    value: "view",
    handler: (rowData, navigate) => {
      localStorage.setItem("carData", JSON.stringify(rowData));
      if (navigate) {
        navigate(`/car/${rowData._id}`);
      }
    }
  },
];

export const queryTypesNumber = [
  { label: "Equals", value: "isEqual" },
  { label: "Empty", value: "isEmpty" },
  { label: "Greater Than", value: "isGreaterThan" },
  { label: "Less Than", value: "isLessThan" }, 
  { label: "Greater Than Or Equal", value: "isGreaterThanOrEqual" },
  { label: "Less Than Or Equal", value: "isLessThanOrEqual" }
];

export const queryTypesString = [
  { label: "Equals", value: "isEqual" },
  { label: "Starts With", value: "startsWith" },
  { label: "Ends With", value: "endsWith" },
  { label: "Contains", value: "contains" },
  { label: "Empty", value: "isEmpty" }
];