import React from "react";
import DocumentModel from "../../../Models/DocumentModel";
import { Link } from "react-router-dom";

export const ReturnDocument: React.FC<{ document: DocumentModel }> = ({document}) => {
  return (
    <div>
      <div className="case-card">
        <h3>{document.name}</h3>
        <Link to={`/cases/${document.claim?.id}/documents/${document.id}`} className="btn">
          More Details
        </Link>
      </div>
    </div>
  );
};
