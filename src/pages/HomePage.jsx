import React from 'react'
import {Link} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import styled from "styled-components"
import {motion} from "framer-motion"
import BG from "../images/BG.jpg"

const Section = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${BG}) no-repeat;
  background-position: center;
  background-size: cover;
`;

const Title = styled.div`
  font-size: 62px;
  color: whitesmoke;
  text-align: center;
  transform: translate(0, 75px);
  font-weight: bold;
  text-shadow: black -1px 2px, black -2px 2px, black -3px 3px;
`;

const Button = styled(motion.div)`
  width: 150px;
  height: 30px;
  color: white;
  background: transparent;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: absolute;
  cursor: pointer;
  top: 81%;
  left: 25%;
`;

function HomePage() {
  return (
    <Section>
      <Title>GREEN CREAM LEVEL</Title>
      <Link to="/dispensario"><Button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>DISPENSARIO</Button></Link>
    </Section>
  )
}

export default HomePage