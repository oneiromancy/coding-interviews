import React, { useState, Component } from 'react';
import RocketCore from './RocketCore';

export const FunctionalRocket = React.memo(() => {
  const [initialLaunchTime] = useState(Date.now());

  return <RocketCore initialLaunchTime={initialLaunchTime} />;
})

export class ClassRocket extends Component {
  constructor() {
    super();

    this.state = {
      initialLaunchTime: Date.now()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !JSON.stringify(this.props) === JSON.stringify(nextProps);
  }


  render() {
    const { initialLaunchTime } = this.state;

    return <RocketCore initialLaunchTime={initialLaunchTime} />;
  }
}
