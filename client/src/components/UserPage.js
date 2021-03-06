import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewUserForm from "./NewUserForm";
import styled from "styled-components";
import { Button } from "react-materialize";

const PageStyle = styled.div`
  font-family: "Merriweather", serif;
  color: blue;
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  flex-direction: column;
  border-radius: 100px;
  margin: 0px 80px 0px 80px;
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  align-content: space-evenly;
  flex-flow: row wrap;
  flex-direction: row;
`;

const IndButton = styled.div`
  margin: 12px 0px;
`;

export default class UserPage extends Component {
  state = {
    users: []
  };

  getAllUsers = () => {
    axios.get("/api/users").then(res => {
      this.setState({ users: res.data });
    });
  };
  componentDidMount() {
    this.getAllUsers();
  }

  handleDelete = userId => {
    axios.delete(`/api/users/${userId}`).then(() => {
      const deletedUser = [...this.state.users];
      const filtered = deletedUser.filter(user => {
        return user._id !== userId;
      });
      this.setState({ users: filtered });
    });
  };

  render() {
    return (
     
      <PageStyle>
      <h1> Welcome to User's Forum </h1>
      <h3>Fellow Users:</h3>
        <ButtonStyle>
          {this.state.users.map(user => (
            <IndButton key={user._id}>
              <Link to={`/users/${user._id}`}>
                <Button
                  className="#42a5f5 blue lighten-1 z-depth-5"
                  waves="light"
                >
                  
                  {user.name}
                </Button>
              </Link>
              <br />
              <Button
                className="#ef5350 red lighten-1 z-depth-5"
                onClick={() => this.handleDelete(user._id)}
              >
                Delete this user
              </Button>
              <br />
            </IndButton>
          ))}
        </ButtonStyle>
        <br /> <hr />
        
      </PageStyle>
    );
  }
}
