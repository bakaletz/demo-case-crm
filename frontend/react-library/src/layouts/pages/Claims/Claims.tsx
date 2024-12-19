import React from "react";
import ClaimModel from "../../../Models/ClaimModel";
import { useState, useEffect } from "react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ReturnClaim } from "./ReturnClaim";

export const Claims = () => {
  const [claims, setClaims] = useState<ClaimModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [newClaim, setNewClaim] = useState({
    name: "",
    description: "",
    deadline: "",
    status: "",
    user: "",
    client: ""
  });

  useEffect(() => {
    const fetchClaims = async () => {
      const url: string = "http://localhost:8080/api/v1/claims";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedClaims: ClaimModel[] = [];

      for (const key in responseData) {
        loadedClaims.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          deadline: responseData[key].deadline,
          status: responseData[key].status,
          user: responseData[key].userDTO,
          client: responseData[key].clientDTO,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClaim((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addClaimHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const url: string = "http://localhost:8080/api/v1/claims";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClaim),
    });

    if (!response.ok) {
      throw new Error("Failed to add claim");
    }

    const createdClaim: ClaimModel = await response.json();
    setClaims((prevClaims) => [...prevClaims, createdClaim]);

    // Reset the form
    setNewClaim({
      name: "",
      description: "",
      deadline: "",
      status: "",
      user: "",
      client: ""
    });
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="content">
      <h2>Cases</h2>
      <section className="cases-section">
        {claims.map((claim) => (
          <ReturnClaim claim={claim} key={claim.id} />
        ))}
      </section>
      <form onSubmit={addClaimHandler} className="add-form">
        <input
          type="text"
          name="name"
          placeholder="Case Name"
          value={newClaim.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newClaim.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="deadline"
          placeholder="Deadline"
          value={newClaim.deadline}
          onChange={handleInputChange}
        />
       
        <button type="submit">Add Case</button>
      </form>
    </div>
  );
};
