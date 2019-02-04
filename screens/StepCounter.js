import React from 'react';
import {
  Header, Card, Text, ButtonGroup,
} from 'react-native-elements';
import { Dimensions } from 'react-native';
import { LinearGradient, Pedometer } from 'expo';
import styled from 'styled-components';

import isNull from 'lodash/isNull';

import Colors from '../constants/Colors';

const { height, width } = Dimensions.get('window');

class StepCounter extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    selectedIndex: 0,
    pedometerStatus: null,
    currentStepCount: 0,
  }

  componentWillUnmount() {
    this.stopPedometer();
  }

  stopPedometer = () => {
    if (this.pedometerSub) {
      this.pedometerSub.remove();
    }
    this.pedometerSub = null;
  }

  updateIndex = (selectedIndex) => {
    this.setState({
      selectedIndex,
    });

    switch (selectedIndex) {
      case 0: {
        this.stopPedometer();
        break;
      }
      default: {
        this.startPedometer();
        break;
      }
    }
  }

  startPedometer = () => {
    this.pedometerSub = Pedometer.watchStepCount(({ steps }) => {
      this.setState({
        currentStepCount: steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      () => {
        this.setState({
          pedometerStatus: true,
        });
      },
      () => {
        this.setState({
          pedometerStatus: false,
        });
      },
    );
  }

  render() {
    const { selectedIndex, currentStepCount, pedometerStatus } = this.state;
    const buttons = ['Stop', 'Start'];

    return (
      <Main>
        <Header
          leftComponent={{ text: 'Step Counter', style: { color: '#fff' } }}
          rightComponent={{ icon: 'directions-run', color: '#fff' }}
        />

        <Card>
          <Text>
            I do a lot of outdoor activities and a step counter is one of the things I love most
            about mobile development.
          </Text>
        </Card>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 50, marginLeft: 14, marginRight: 14 }}
        />

        <LinearGradient
          style={{
            marginLeft: 14,
            marginRight: 14,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
          colors={[Colors.homeGradientStart, Colors.homeGradientEnd]}
        >
          { !isNull(pedometerStatus) && <StepText>{currentStepCount}</StepText> }
        </LinearGradient>
      </Main>
    );
  }
}

const Main = styled.View`
  height: ${height};
  width: ${width};
`;

const StepText = styled.Text`
  width: ${width};
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 100;
`;

export default StepCounter;
