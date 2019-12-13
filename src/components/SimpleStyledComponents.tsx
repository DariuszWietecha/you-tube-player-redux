
import styled from "styled-components";

interface IOverlayParams {
  isFetching: boolean;
}

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  visibility: ${(props: IOverlayParams) => props.isFetching ? "visible" : "hidden"};
  z-index: 1;

  .spinner-border {
    position: absolute;
    top: 50%;
  }
`;

export const DivWithPointer = styled.div`
  cursor: pointer
`;
