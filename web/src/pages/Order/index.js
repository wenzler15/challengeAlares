import React, { useState, useEffect } from 'react';

import { Container, ButtonAdm, ButtonAdmText, Header, Content, AlaresText, TitleText, FormText, Line, Input, ModalContent } from './styles';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import api from '../../services/api';

function Order() {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [status, setStatus] = useState("");
    const [planId, setPlanId] = useState(false);
    const [plans, setPlans] = useState([]);

    const navigate = useNavigate();

    const getOrder = async () => {
        try {
            const id = window.location.href.split("?id=")[1];

            const response = await api.get(`/order/${id}`);

            const { customerName, customerEmail, customerPhone, status, planId } = response.data;

            setCustomerEmail(customerEmail);
            setCustomerName(customerName);
            setCustomerPhone(customerPhone)
            setStatus(status);
            setPlanId(planId);
        } catch (err) {
            console.log("erro", err)
            toast.error("Não foi possível listar os planos");
        }
    }

    const getPlans = async () => {
        try {
            const response = await api.get("/plans");

            setPlans(response.data)
        } catch (err) {
            console.log("erro", err)
            toast.error("Não foi possível listar os planos");
        }
    }

    const update = async () => {
        try {
            const toSend = {
                customerName,
                customerEmail,
                customerPhone,
                status,
                planId
            }

            const id = window.location.href.split("?id=")[1];

            await api.put(`/order/${id}`, toSend);

            toast.success("Pedido atualizado com sucesso!");
            navigate("/admin")
        } catch (err) {
            console.log("erro", err);
            toast.error("Não foi possível atualizar o pedido")
        }
    }

    useEffect(() => {
        if (window.location.href.indexOf("?id=") > 0) {
            getOrder();
            getPlans();
        }
    }, []);

    return (
        <Container>
            <Header>
                <AlaresText>Alares</AlaresText>
                <ButtonAdm onClick={() => navigate("/admin")}>
                    <ButtonAdmText>Voltar</ButtonAdmText>
                </ButtonAdm>
            </Header>
            <Content>
                <TitleText>Acesso administrativo</TitleText>
                <Content>
                    <Line>
                        <ModalContent>
                            <FormText>Nome do cliente</FormText>
                            <Input type='text' value={customerName} onChange={(e) => customerName(e.target.value)} required />
                        </ModalContent>
                        <ModalContent>
                            <FormText>E-mail do cliente</FormText>
                            <Input type='text' onChange={(e) => setCustomerEmail(e.target.value)} value={customerEmail} required />
                        </ModalContent>
                    </Line>
                    <Line>
                        <ModalContent>
                            <FormText>Telefone do cliente</FormText>
                            <Input type='text' value={customerPhone} onChange={(e) => customerPhone(e.target.value)} required />
                        </ModalContent>
                    </Line>
                    <Line>
                        <ModalContent>
                            <FormText>Status do pedido</FormText>
                            <select style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '10px', border: '1px solid #000', width: '250px', background: '#F8F8F8', padding: '5px' }} value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="IN PROGRESS">In progress</option>
                                <option value="DONE">Done</option>
                            </select>
                        </ModalContent>
                        <ModalContent>
                            <FormText>Plano</FormText>
                            <select style={{ borderRadius: '10px', marginTop: '5px', marginBottom: '10px', border: '1px solid #000', width: '250px', background: '#F8F8F8', padding: '5px' }} value={planId} onChange={(e) => setPlanId(e.target.value)}>
                                {plans && plans.map((item) => (
                                    <option value={item._id}> {item.name} </option>
                                ))}
                            </select>
                        </ModalContent>
                    </Line>
                    <ButtonAdm onClick={() => update()}>
                        <ButtonAdmText>Atualizar</ButtonAdmText>
                    </ButtonAdm>
                </Content>
            </Content>
        </Container>);
}

export default Order;