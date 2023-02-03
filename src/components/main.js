import React from "react";
import PersonList from "./personList";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Main = () => {
  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <Link to="/addPerson">
          <Button variant="outline-primary">Add Person</Button>
        </Link>
        <PersonList />
      </div>
    </div>
  );
};

export default Main;
