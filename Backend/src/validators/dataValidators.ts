export const validateFilterInput = (column: string, queryType: string, value: string) => {
    if (!column || typeof column !== "string" || !queryType || typeof queryType !== "string") {
        return { error: "column and queryType are required and must be strings" };
    }
    const allowedQueryTypes = ["isEqual", "startsWith", "endsWith", "contains", "isEmpty"];
    if (!allowedQueryTypes.includes(queryType)) {
        return { error: "Invalid queryType" };
    }
    if (!value && queryType !== 'isEmpty') {
      return { error: `"value" is required for queryType: ${queryType}` };
    }

    switch (queryType) {
      case "startsWith":
      case "endsWith":
      case "contains":
        if (typeof value !== 'string') {
          return { error: `"value" must be a string for queryType: ${queryType}` };
        }
        break;
      case "isEqual":
        if (typeof value !== 'string' && isNaN(Number(value))) {
          return { error: `"value" must be a valid string or number for queryType: ${queryType}` };
        }
        break;
      case "isEmpty":
        break;
      default:
        return { error: `Invalid queryType: ${queryType}` };
    }

    return null;
};
