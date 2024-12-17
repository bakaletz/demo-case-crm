import React from "react";
import { Link } from "react-router-dom";
import ClaimModel from "../../Models/ClaimModel";

export const ReturnClaim: React.FC<{ claim: ClaimModel }> = (props) => {
  return (
    <div>
      <div className="case-card">
      <h3>{props.claim.name}</h3>
        <p>
          <b>Клієнт:</b> {props.claim.client || "Didn't added"}
        </p>
        <p>
          <b>Адвокат: </b> {props.claim.user || "No one has been appointed yet"}
        </p>
        <p>
          <b>Опис:</b> {props.claim.description || "Description hasn't been added yet"}
        </p>
        <p>
          <b>Статус:</b> {props.claim.status}
        </p>
        <a href="#" className="btn">
          Переглянути звіт
        </a>
      </div>
    </div>
  );
};
