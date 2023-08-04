import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: #FAFAFA;
`;

export const Header = styled.div`
    width: 99%;
    padding: 7px;
    background: #5A53F7;
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid #77F3AE;
`;

export const ButtonAdm = styled.div`
    background: #77F3AE;
    padding: 5px;
    width: 120px;
    border-radius: 10px;
    cursor: pointer;
`;

export const ButtonAdmText = styled.text`
    color: #5A53F7;
`;

export const AlaresText = styled.text`
    color: #fff;
    font-size: 18px;
    margin-left: 10px;
    font-weight: bold;
    margin-top: 5px;
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    flex-wrap: wrap;
`;

export const TitleText = styled.text`
    color: #5A53F7;
    font-size: 24px;
`;

export const PlansContainer = styled.div`
    width: 80%;
    margin-top: 40px;
    display: flex;
    padding: 10px;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

export const PlanContainer = styled.div`
    width: 200px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid #5A53F7;
    background: #fff;
    margin-bottom: 20px;
    padding: 5px;
    height: 350px;
`;

export const PlanName = styled.text`
    color: #5A53F7;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const PlanSpeedText = styled.text`
    color: #5A53F7;
    font-size: 24px;
    font-weight: bold;
`;

export const PlusPlans = styled.text`
    color: #77F3AE;
    font-size: 24px;
    font-weight: bold;
    margin: 10px;
`;

export const ButtonOrder = styled.div`
    background: #77F3AE;
    padding: 5px;
    width: 160px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 15px;
`;

export const PlanContent = styled.div`
    height: 80%;
    display: flex;
    flex-direction: column;
`;

export const ModalContainer = styled.div`
    background: #fff;
    width: 450px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    position: absolute;
    padding: 15px;
    z-index: 2;
`;

export const ModalHeader = styled.div`
    width: 100%;
    text-align: end
`;

export const CloseButton = styled.text`
    cursor: pointer;
    color: #5A53F7;
`;

export const ModalContent = styled.div`
    width: 90%;
    margin-left: 15px;
    display: flex;
    text-align: left;
    flex-direction: column;
    justify-content: start;
    margin-top: 10px;
`;

export const FormText = styled.text`
    color: #5A53F7;
    font-size: 18px;
`;

export const Input = styled.input`
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: none;
    background: #F8F8F8;
    padding: 5px;
`;
