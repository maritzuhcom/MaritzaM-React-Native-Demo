import React from 'react';
import {
  Header, Card, Divider, SocialIcon,
} from 'react-native-elements';
import { Dimensions, ScrollView, Platform } from 'react-native';
import styled from 'styled-components';
import { WebBrowser } from 'expo';

const { height, width } = Dimensions.get('window');

export default class AboutMeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync('https://github.com/maritzuhcom');
  }

  handlePressButtonAsyncLinkedIn = async () => {
    await WebBrowser.openBrowserAsync('https://www.linkedin.com/in/maritza-m-328363133/');
  }

  render() {
    return (
      <Main>
        <Header
          leftComponent={{ text: 'About Me', style: { color: '#fff' } }}
        />

        <ScrollView>
          <NameWrapper>
            <NameText>
            MARITZA MANCILLAS
            </NameText>
          </NameWrapper>
          <Divider />

          <ImageWrapper>
            <MyImage
              source={require('../assets/images/about.jpg')}
            />
          </ImageWrapper>

          <Card>
            <PText>
              Hi! I'm from The San Fernando Valley in CA.
              I like to explore new methods in development and work on creating
              new and awesome apps. I started my career during my senior year of college
              where I decided to make a simple app for my senior design project.
              I used HTML, CSS and Vanilla JS. I then decided to pursue a career in
              development. I enjoyed designing and creating user interfaces, so it
              was the perfect fit. What I enjoy most is coming up with new ideas and
              getting to apply them. I keep up with the latest technologies and am always
              excited to read articles on new features for JS and CSS. What I love
              doing most when working is implementing new features. I look for tasks
              in my job that involve custom solutions.
              I pride myself in being very detail oriented and like to do high quality
              work by looking for ways to be efficient and enhance designs.
              When I'm not coding, I enjoy hiking, cardio, tennis, ping pong, movies
              and music. I also like to go out with friends and explore new bars and
              restaurants. My current goals are to continue to improve in my career and
              travel more often.
            </PText>
          </Card>

          <Footer>
            <SocialIcon onPress={this.handlePressButtonAsync} type="github" light />
            <SocialIcon onPress={this.handlePressButtonAsyncLinkedIn} type="linkedin" light />
          </Footer>
        </ScrollView>
      </Main>
    );
  }
}

const MyImage = styled.Image`
  width: 300;
  height: 300;
  margin-top: 16;
`;

const ImageWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.View`
  height: ${height};
  width: ${width};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: ${Platform.OS === 'ios' ? 50 : 0};
`;

const NameText = styled.Text`
  color: #577265;
  font-size: 30;
  padding-top: 16;
  padding-bottom: 16;
  font-weight: 100;
`;

const NameWrapper = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PText = styled.Text`
  font-weight: 100;
`;

const Footer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
