export const validateFilterInput = (
  column: string,
  queryType: string,
  value: string | number | undefined,
  type: "string" | "number"
) => {
  if (!column || typeof column !== "string" || !queryType || typeof queryType !== "string") {
    return { error: "column and queryType are required and must be strings" };
  }

  const allowedQueryTypesString = [
    "isEqual", "startsWith", "endsWith", "contains", "isEmpty"
  ];
  const allowedQueryTypesNumber = [
    "isEqual", "isEmpty", "isGreaterThan", "isLessThan", "isGreaterThanOrEqual", "isLessThanOrEqual"
  ];

  if (type === "string" && !allowedQueryTypesString.includes(queryType)) {
    return { error: `Invalid queryType "${queryType}" for string column` };
  }
  if (type === "number" && !allowedQueryTypesNumber.includes(queryType)) {
    return { error: `Invalid queryType "${queryType}" for number column` };
  }


  if (queryType !== "isEmpty" && (value === undefined || value === null || value === "")) {
    return { error: `"value" is required for queryType: ${queryType}` };
  }

  if (type === "string") {
    switch (queryType) {
      case "startsWith":
      case "endsWith":
      case "contains":
      case "isEqual":
        if (typeof value !== "string") {
          return { error: `"value" must be a string for queryType: ${queryType}` };
        }
        break;
      case "isEmpty":
        break;
      default:
        return { error: `Invalid queryType: ${queryType}` };
    }
  } else if (type === "number") {
    switch (queryType) {
      case "isEqual":
      case "isGreaterThan":
      case "isLessThan":
      case "isGreaterThanOrEqual":
      case "isLessThanOrEqual":
        if (isNaN(Number(value))) {
          return { error: `"value" must be a valid number for queryType: ${queryType}` };
        }
        break;
      case "isEmpty":
        break;
      default:
        return { error: `Invalid queryType: ${queryType}` };
    }
  } else {
    return { error: `Invalid type: ${type}` };
  }

  return null;
};