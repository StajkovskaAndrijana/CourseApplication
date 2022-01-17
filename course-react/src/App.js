import React, { useState } from "react";
import ApplicationPostForm from "./components/ApplicationPostForm";

export default function App() {
  const [showCreateApplicationForm] = useState(true);

  return (
    <div className="container-fluid">
      {showCreateApplicationForm && <ApplicationPostForm />}
    </div>
  );
}
