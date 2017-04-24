import React from 'react';

import { connect } from 'react-redux';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // let messageRecords = this.props.messages;

    let messageMarkup = 'There are no messages... yet.';

    let messages = [];
    // messageRecords.map(m => {
    //   let fromUser = this.props.store.get('user', m.content.uid);
    //   let fromName = fromUser ? fromUser.alias : '';
    //   return (
    //     <tr>
    //       <td>{new Date(m.id).toString()}</td>
    //       <td>{m.content.uid}</td>
    //       <td>{fromName}</td>
    //       <td>{m.content.message}</td>
    //     </tr>
    //   );
    // });

    console.log(messages);
    messageMarkup = (
      <table className='messages'>
        <thead></thead>
        <tbody>
          {messages}
        </tbody>
      </table>
    );

    // let time = new Date(this.props.lastMessageReceived).toString();

    return (
      <div>
        <h3>{this.state.id}</h3>
        <h4>Messages: {messages.length}</h4>
        <h4>Last Message Received</h4>
        <hr />
        {messageMarkup}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  messages: state.data.messages.records
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
