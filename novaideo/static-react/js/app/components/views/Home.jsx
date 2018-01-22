import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';

import IdeasList from '../idea/IdeasList';
import CreateIdeaForm from '../forms/CreateIdea';

function TabContainer({ children }) {
  return (
    <Typography
      component="div"
      style={{
        marginTop: 25,
        maxWidth: 588,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      {children}
    </Typography>
  );
}

class Home extends React.Component {
  state = {
    value: 1
  };

  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  render() {
    const value = this.state.value;
    return (
      <div>
        {/* <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
            <Tab label="Questions" />
            <Tab label="Ideas" />
            <Tab label="Proposals" />
          </Tabs>
        </AppBar> */}
        {value === 0 && <TabContainer>Questions</TabContainer>}
        {value === 1 &&
          <TabContainer>
            <CreateIdeaForm />
            <IdeasList />
          </TabContainer>}
        {value === 2 && <TabContainer>Proposals</TabContainer>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n
  };
};

export default connect(mapStateToProps)(Home);