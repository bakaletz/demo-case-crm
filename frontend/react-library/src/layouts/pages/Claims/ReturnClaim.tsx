import React from "react";
import { Link } from "react-router-dom";
import ClaimModel from "../../../Models/ClaimModel";

export const ReturnClaim: React.FC<{ claim: ClaimModel }> = ({claim}) => {
  return (
    <div>
      <div className="case-card">
        <h3>{claim.name}</h3>
        <p>
          <b>Client:</b> {claim.client? `${claim.client.firstName} ${claim.client.lastName}`  : "N/A"}
        </p>
        <p>
          <b>Lawyer: </b> {claim.user? `${claim.user.firstName} ${claim.user.lastName}` : "N/A"}
        </p>
        <p>
          <b>Description:</b>{" "}
          {claim.description || "Description hasn't been added yet"}
        </p>
        <p>
          <b>Status:</b> {claim.status}
        </p>
        <Link to={`/cases/${claim.id}`} className="btn">
          Check case
        </Link>
      </div>
    </div>
  );
};
