import React, { Component } from "react";
import axios from "axios";
import {Button} from 'react-materialize'



export default class UpdateGame extends Component {
  state = {
    games: []
  };

  componentDidMount() {
    const videogamesId = this.props.match.params.videoGamesId;
    const userId = this.props.match.params.userId;
    axios.get(`/api/users/${userId}/videogames/${videogamesId}`).then(res => {
      console.log(res.data);
      this.setState({ games: res.data });
    });
  }

  handleChange = e => {
 console.log("name", e.target.name);
    console.log("value", e.target.value);
    const updatedGame = {...this.state.games};
    updatedGame[e.target.name] = e.target.value;
    this.setState({ games: updatedGame });
  };

  handleUpdate = videoGamesId => {
    const updatedGame = this.state.games;
    const userId = this.props.match.params.userId;
    axios
      .patch(`/api/users/${userId}/videogames/${videoGamesId}`, updatedGame)
      .then(() => {
        console.log("Updated Game");
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={() => this.handleUpdate(this.state.games._id)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={this.handleChange}
              value={this.state.games.name}
              type="text"
              name="name"
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              onChange={this.handleChange}
              value={this.state.games.image}
              type="text"
              name="image"
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              onChange={this.handleChange}
              value={this.state.games.category}
              type="text"
              name="category"
            />
          </div>
          <div>
            <label htmlFor="year">The Year it Released</label>
            <input
              onChange={this.handleChange}
              value={this.state.games.year}
              type="text"
              name="year"
            />
          </div>
          
          <Button className='#880e4f pink darken-4' type="submit">Update Library</Button>
        </form>
      </div>
    );
  }
}

