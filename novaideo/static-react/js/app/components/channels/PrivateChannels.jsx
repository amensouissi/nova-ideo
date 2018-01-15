/* eslint-disable no-undef */
import React from 'react';
import { graphql } from 'react-apollo';
import { withStyles } from 'material-ui/styles';

import ChannelItem from './ChannelItem';
import EntitiesList from '../common/EntitiesList';
import { discussionsQuery } from '../../graphql/queries';

const styles = {
  list: {
    height: '50%'
  }
};
export class DumbPrivateChannels extends React.Component {
  render() {
    const { data, classes } = this.props;
    return (
      <EntitiesList
        data={data}
        getEntities={(entities) => {
          return entities.account ? entities.account.discussions : [];
        }}
        noContentIcon="comment-outline"
        noContentMessage={'noPrivateDiscussions'}
        ListItem={ChannelItem}
        itemdata={{ isDiscussion: true }}
        className={classes.list}
        itemHeightEstimation={30}
        progressStyle={{ size: 20, color: 'white' }}
        scrollbarStyle={{ thumbVertical: { backgroundColor: 'rgba(255, 255, 255, 0.22)' } }}
      />
    );
  }
}

export default withStyles(styles)(
  graphql(discussionsQuery, {
    options: () => {
      return {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: { first: 15, after: '' }
      };
    }
  })(DumbPrivateChannels)
);