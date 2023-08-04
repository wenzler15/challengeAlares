import React, { useState, useEffect } from 'react';

import { Container, ButtonAdm, ButtonAdmText, Header, SubLineLeftContainer, Buttons, Content, AlaresText, TitleText, ButtonsContainer, ButtonContainer, FormText, TableContainer, Line, SubLine, NormalText, NewRegister, StatusContainer } from './styles';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import api from '../../services/api';

function Home() {
    const [plans, setPlans] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tableSelect, setTableSelect] = useState("plan");

    const navigate = useNavigate();

    const getPlans = async () => {
        try {
            const response = await api.get("/plans");

            setPlans(response.data)
        } catch (err) {
            console.log("erro", err)
            toast.error("Não foi possível listar os planos");
        }
    }

    const getOrders = async () => {
        try {
            const response = await api.get("/orders");

            setOrders(response.data)
        } catch (err) {
            console.log("erro", err)
            toast.error("Não foi possível listar os pedidos");
        }
    }

    const deletePlan = async (id) => {
        try {
            await api.delete(`/plan/${id}`)
            toast.success("Plano deletado com sucesso!");
            window.location.reload()
        } catch (err) {
            console.log("erro", err);
            toast.error("Não foi possível deleter o plano");
        }
    }

    const deleteOrder = async (id) => {
        try {
            await api.delete(`/order/${id}`)
            toast.success("Pedido deletado com sucesso!");
            window.location.reload()
        } catch (err) {
            console.log("erro", err);
            toast.error("Não foi possível deleter o pedido");
        }
    }

    useEffect(() => {
        getPlans()
        getOrders()
    }, []);

    return (
        <Container>
            <Header>
                <AlaresText>Alares</AlaresText>
                <ButtonAdm onClick={() => navigate("/")}>
                    <ButtonAdmText>Acesso usuário</ButtonAdmText>
                </ButtonAdm>
            </Header>
            <Content>
                <TitleText>Acesso administrativo</TitleText>
                <ButtonsContainer>
                    <ButtonContainer onClick={() => setTableSelect("plan")} style={{ background: tableSelect === 'plan' ? '#77F3AE' : '#fff', border: tableSelect === 'plan' ? 'none' : '1px solid #848484' }}>
                        <FormText style={{ color: tableSelect === 'plan' ? '#5A53F7' : '#848484' }}>Planos</FormText>
                    </ButtonContainer>
                    <ButtonContainer onClick={() => setTableSelect("order")} style={{ background: tableSelect === 'order' ? '#77F3AE' : '#fff', border: tableSelect === 'order' ? 'none' : '1px solid #848484' }}>
                        <FormText style={{ color: tableSelect === 'order' ? '#5A53F7' : '#848484' }}>Pedidos</FormText>
                    </ButtonContainer>
                </ButtonsContainer>
                <TableContainer>
                    {tableSelect === 'plan' ? (
                        <NewRegister onClick={() => navigate("/plan")}>Adicionar novo</NewRegister>
                    ) : (
                        <> </>
                    )}
                    {tableSelect === 'plan' && plans.length > 0 ? plans.map((item, index) => (
                        <Line style={{ background: index % 2 === 0 ? "#DFDEF6" : "#CDCCE5" }}>
                            <SubLine>
                                <FormText>{item.name}</FormText>
                            </SubLine>
                            <SubLine>
                                <SubLineLeftContainer>
                                    <NormalText>{item.speedNumber} {item.prefix}</NormalText>
                                    {item.wifi && (
                                        <NormalText>Wi-fi</NormalText>
                                    )}
                                    {item.games && (
                                        <NormalText>Game</NormalText>
                                    )}
                                    {item.movies && (
                                        <NormalText>Canal de filmes</NormalText>
                                    )}
                                    {item.recommend && (
                                        <NormalText>Recomendação</NormalText>
                                    )}
                                </SubLineLeftContainer>
                                <Buttons style={{ background: "#5A53F7" }} onClick={() => navigate(`/plan?id=${item._id}`)}>
                                    <NormalText style={{ color: "#fff" }}>Alterar</NormalText>
                                </Buttons>
                                <Buttons style={{ background: "#DF7676" }} onClick={() => deletePlan(item._id)}>
                                    <NormalText style={{ color: "#fff" }}>Remover</NormalText>
                                </Buttons>
                            </SubLine>
                        </Line>
                    )) : orders.map((item, index) => (
                        <Line style={{ background: index % 2 === 0 ? "#DFDEF6" : "#CDCCE5" }}>
                            <SubLine>
                                <FormText>Pedido {index + 1} - {item.planId?.name ? item.planId.name : 'excluído'}</FormText>
                            </SubLine>
                            <SubLine>
                                <SubLineLeftContainer style={{ width: '75%' }}>
                                    <NormalText>{item.customerName}</NormalText>
                                    <NormalText>{item.customerEmail}</NormalText>
                                    <NormalText>{item.customerPhone}</NormalText>
                                    <StatusContainer style={{ background: item.status === 'DONE' ? '#77F3AE' : '#5A53F7', color: item.status === 'DONE' ? '#5A53F7' : '#77F3AE' }}>{item.status}</StatusContainer>
                                </SubLineLeftContainer>
                                <Buttons style={{ background: "#5A53F7" }} onClick={() => navigate(`/order?id=${item._id}`)}>
                                    <NormalText style={{ color: "#fff" }}>Alterar</NormalText>
                                </Buttons>
                                <Buttons style={{ background: "#DF7676" }} onClick={() => deleteOrder(item._id)}>
                                    <NormalText style={{ color: "#fff" }}>Remover</NormalText>
                                </Buttons>
                            </SubLine>
                        </Line>
                    ))}
                </TableContainer>
            </Content>
        </Container>);
}

export default Home;