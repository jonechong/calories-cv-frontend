import React from "react";

const DbContext = React.createContext({
    isDbInitialized: false,
    setDbInitialized: () => {},
});

export default DbContext;
