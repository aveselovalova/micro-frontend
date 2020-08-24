# Micro-Frontend (ModuleFederationPlugin)

### Avaliable scripts:
* bootstrap -- install packages dependencies;
* start -- run packages in development mode;
* build -- build packages;

### Possible errors:
**Uncaught Error: Shared module is not available for eager consumption**

Solution:
* Change the entry point of the application:
    ```
    import bootstrap from "./bootstrap";
    bootstrap(() => {});
    ```
  
* Move an old entry point code into bootstrap.tsx
    ```
    import * as React from 'react';
    import * as ReactDOM from 'react-dom';
    
    import App from "./components/App/App";
    
    ReactDOM.render(<App />, document.getElementById("root"));
    
    ```

* add __bundle-loader__;
    ```
    {
      test: /bootstrap\.js$/,
      loader: "bundle-loader",
      options: {
        lazy: true,
      },
    }
    ```

