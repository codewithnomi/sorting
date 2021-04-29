import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
import CustomizedTables from "./Components/Table";
import articles from "./data.json";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: articles || [],
    };
  }
  componentDidMount() {
    let articles = this._getSortArray(this.state.articles, "upvotes");
    this.setState({ articles });
  }

  _getSortArray = (array, title, date = false) => {
    return array.sort((a, b) => {
      if (date) {
        return new Date(b[title]) - new Date(a[title]);
      } else {
        return a[title] - b[title];
      }
    });
  };

  sortByDate;

  tableColumns = ["Titles", "Upvotes", "Date"];

  render() {
    return (
      <Container maxWidth="md">
        {/* <Grid container> */}
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({
              articles: this._getSortArray(
                this.state.articles,
                "upvotes"
              ).reverse(),
            });
          }}
        >
          Most Upvoted
        </Button>
        &nbsp; {/* :D */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            this.setState({
              articles: this._getSortArray(this.state.articles, "date", true),
            });
          }}
        >
          Most Recent
        </Button>
        <br />
        <br />
        <CustomizedTables
          columns={this.tableColumns}
          rows={this.state.articles}
        />
        {/* </Grid> */}
      </Container>
    );
  }
}
