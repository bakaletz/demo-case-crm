import React from "react";
import { useState, useEffect } from "react";
import UserModel from "../../../Models/UserModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ReturnUser } from "./ReturnUser";

export const Users = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const url: string = "http://localhost:8080/api/v1/users";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something gone wrong");
      }

      const responseData = await response.json();

      console.log(responseData);

      const loadedUsers: UserModel[] = [];

      for (const key in responseData) {
        loadedUsers.push({
          id: responseData[key].id,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          email: responseData[key].email,
          phone: responseData[key].phone,
        });
      }

      setUsers(loadedUsers);
      setIsLoading(false);
    };
    fetchUsers().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div>
      <div className="content">
        <h1 className="team-title">Our team</h1>
        <div className="team-container">
          {users.map((user) => (
            <ReturnUser user={user} key={user.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
