import React from 'react';
import styled from 'styled-components';

const Checkbox = (props) => {
  return (
    <StyledWrapper>
      <div className="content">
        <label className="checkBox">
          <input type="checkbox" id={props.id} onChange={props.onChangebutton}/>
          <div className="transition" />
        </label>
        <div className="text-desc">
          <label htmlFor="ch1" className="text">
            Option {props.id}
            <p className="desc">{props.option}</p>
          </label>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .content {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  .text-desc {
    display: flex;
    flex-direction: column;
  }

  .desc {
    font-size: 10px;
    color: gray;
  }

  .text {
    color: white;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
  }

  .content:hover {
    background-color: rgb(236, 232, 231, 0.1);
    border-radius: 16px;
    padding: 16px;
  }

  .checkBox {
    display: block;
    width: 30px;
    height: 30px;
    border: 3px solid rgba(255, 255, 255, 0);
    border-radius: 30px;
    position: relative;
    box-shadow: 0px 0px 0px 2px #fff;
    transition: 200ms all;
    cursor: pointer;
    overflow: hidden;
  }

  .checkBox .transition {
    width: 60px;
    height: 60px;
    background-color: #fff;
    top: -52px;
    left: -52px;
    position: absolute;
    transform: rotateZ(45deg);
    z-index: 100;
  }

  .checkBox input[type="checkbox"]:checked + div {
    left: -10px;
    top: -10px;
  }

  .checkBox input[type="checkbox"] {
    position: absolute;
    left: 50px;
    visibility: hidden;
  }

  .transition {
    transition: 300ms ease;
  }`;

export default Checkbox;
