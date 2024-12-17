import React from "react";
import ClaimModel from "../../Models/ClaimModel";
import { useState, useEffect } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { ReturnClaim } from "./ReturnClaim";

export const Claims = () => {
  const [claims, setClaims] = useState<ClaimModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      const url: string = "http://localhost:8080/api/v1/claims";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something gone wrong");
      }

      const responseData = await response.json();

      console.log(responseData);

      const loadedClaims: ClaimModel[] = [];

      for (const key in responseData) {
        loadedClaims.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          deadline: responseData[key].deadline,
          status: responseData[key].status,
          user: responseData[key].user,
          client: responseData[key].client,
        });
      }

      setClaims(loadedClaims);
      setIsLoading(false);
    };
    fetchClaims().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="content">
        <h2>Юридичні справи та звіти</h2>
      <section className="cases-section">
        {claims.map((claim) => (
          <ReturnClaim claim={claim} key={claim.id} />
        ))}
      </section>
    </div>
  );
};
