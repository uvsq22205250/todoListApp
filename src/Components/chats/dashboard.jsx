import React, { Component } from "react";
import Inbox from "./inbox";
import styles from "../../styles/dashboard";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ChatView from "./chatView";
import ChatTextBox from "./chatTextBox";
import NewChat from "./newChat";
import app from '../../firebase.config';
import db from '../../configCRUD';
import { getAuth } from "firebase/auth";


const auth = getAuth(app);
const currentuser = auth.currentUser;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      selectedChatIndex: null,
      newChatFormVisible: true,
      email: null,
      chats: [],
    };
  }

  getChats = async () => {
    if (currentuser !== null) {
      const chats = db.chats(currentuser.email);
      this.setState({
        email: currentuser.email,
        chats: chats,
        });
    };  
  };


  componentDidMount() {
    this.getChats();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  newChatBtnClicked = () => {
    this.setState({ newChatFormVisible: true, selectedChatIndex: null });
  };

  selectChatClicked = async (chatIndex) => {
    const chat = this.state.chats[chatIndex];
    const friend = chat.users.filter((user) => user !== this.state.email)[0];
    const docKey = [this.state.email, friend].sort().join(":");
    if (chat.messages.length) {
      if (chat.messages[chat.messages.length - 1].sender !== this.state.email)
        db.updateChat(docKey);
    }
    this.setState({ newChatFormVisible: false, selectedChatIndex: chatIndex });
  };

  backBtnClick = () => {
    this.setState({ newChatFormVisible: true, selectedChatIndex: null });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.header}>
          <div className={classes.textHeader}>Chat App</div>
        </div>
        <Inbox
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChatClicked}
          dashboardState={this.state}
        />
        {this.state.newChatFormVisible ? null : (
          <ChatView
            dashboardState={this.state}
            backBtnClick={this.backBtnClick}
          />
        )}
        <Fab
          className={classes.newChatBtn}
          onClick={this.newChatBtnClicked}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        {this.state.newChatFormVisible ? (
          <NewChat
            dashboardState={this.state}
            selectChatClicked={this.selectChatClicked}
          />
        ) : null}
        {this.state.newChatFormVisible ? null : (
          <ChatTextBox dashboardState={this.state} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
