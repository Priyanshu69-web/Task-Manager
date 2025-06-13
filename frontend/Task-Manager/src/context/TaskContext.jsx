import React, { createContext, useState } from "react";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [refreshDashboard, setRefreshDashboard] = useState(false);

  const triggerRefreshDashboard = () => {
    setRefreshDashboard(prev => !prev);
  };

  return (
    <TaskContext.Provider value={{ refreshDashboard, triggerRefreshDashboard }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
