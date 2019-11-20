import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signIn } from '../../actions/authActions';
import google_icon from '../../assets/google-icon.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  height: 100vh;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.fontColor} & > img {
    height: 128px;
    width: 128px;
  }
`;

const ImgContainer = styled.div`
  height: 110px;
  width: 110px;
  border-radius: 100%;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    height: 96px;
  }
`;

interface test {
  toggleTheme: any;
  currentTheme: any;
}

const SignIn: React.FC<test> = (props: any) => {
  return (
    <Container>
      <ImgContainer onClick={props.signIn}>
        <img src={google_icon} alt="google icon" />
      </ImgContainer>
    </Container>
  );
};

export default connect(null, { signIn })(SignIn);
