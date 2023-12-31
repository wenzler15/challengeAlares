import React, { useState, useEffect } from 'react';

import { Container, ButtonAdm, ButtonAdmText, FormText, Input, ButtonOrder, ModalContent, PlanContent, ModalHeader, Header, ModalContainer, AlaresText, PlusPlans, PlanSpeedText, TitleText, Content, PlansContainer, PlanContainer, PlanName, CloseButton } from './styles';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import api from '../../services/api';

function Home() {
    const [plans, setPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [planId, setPlanId] = useState("");

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

    const handleOrder = async () => {
        if (customerName === '' || customerEmail === '' || customerPhone === "") {
            toast.error("Favor preencher todos os campos");
        } else {
            if (customerEmail.indexOf("@") > 0 && customerEmail.indexOf(".") > 0) {
                try {
                    const toSend = {
                        customerName,
                        customerEmail,
                        customerPhone,
                        planId
                    }

                    await api.post("/order", toSend);

                    toast.success("Plano contratado com sucesso!");
                    setShowModal(false);
                } catch (err) {
                    toast.error("Não foi possível contratar o plano");
                }
            } else {
                toast.error("Favor preencher um e-mail válido");
            }
        }
    }

    const handlePhone = (event) => {
        let input = event.target
        input.value = phoneMask(input.value)
        setCustomerPhone(input.value)
    }

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }

    useEffect(() => {
        getPlans()
    }, []);

    return (
        <Container>
            <Header>
                <AlaresText>Alares</AlaresText>
                <ButtonAdm onClick={() => navigate("/admin")}>
                    <ButtonAdmText>Acesso administrativo</ButtonAdmText>
                </ButtonAdm>
            </Header>
            <Content>
                <TitleText>Escolha o melhor plano para você!</TitleText>
                {showModal && (
                    <ModalContainer>
                        <ModalHeader>
                            <CloseButton onClick={() => setShowModal(false)}>
                                X
                            </CloseButton>
                        </ModalHeader>
                        <TitleText>Preencha seus dados para adquirir o plano</TitleText>
                        <ModalContent>
                            <FormText>Nome</FormText>
                            <Input type='text' onChange={(e) => setCustomerName(e.target.value)} required />
                            <FormText>E-mail</FormText>
                            <Input type='text' onChange={(e) => setCustomerEmail(e.target.value)} required />
                            <FormText>Telefone</FormText>
                            <Input type='text' onChange={(e) => handlePhone(e)} required />
                        </ModalContent>
                        <ButtonOrder onClick={() => handleOrder()}>
                            <ButtonAdmText>Contratar</ButtonAdmText>
                        </ButtonOrder>
                    </ModalContainer>
                )}
                <PlansContainer style={{ opacity: showModal ? 0.5 : 1 }}>
                    {plans && plans.map((plan) => (
                        <PlanContainer style={{ background: plan.recommend ? "#5A53F7" : "#fff" }}>
                            <PlanContent>
                                <PlanName style={{ color: plan.recommend ? "#fff" : "#5A53F7" }}>{plan.name}</PlanName>
                                <PlanSpeedText style={{ color: plan.recommend ? "#fff" : "#5A53F7" }} >{plan.speedNumber} {plan.prefix}</PlanSpeedText>
                                {plan.wifi && (
                                    <>
                                        <PlusPlans>
                                            +
                                        </PlusPlans>
                                        <PlanSpeedText style={{ color: plan.recommend ? "#fff" : "#5A53F7" }}>Wi-fi</PlanSpeedText>
                                    </>
                                )}
                                {plan.games && (
                                    <>
                                        <PlusPlans>
                                            +
                                        </PlusPlans>
                                        <PlanSpeedText style={{ color: plan.recommend ? "#fff" : "#5A53F7" }}>Jogos</PlanSpeedText>
                                    </>
                                )}
                                {plan.movies && (
                                    <>
                                        <PlusPlans>
                                            +
                                        </PlusPlans>
                                        <PlanSpeedText style={{ color: plan.recommend ? "#fff" : "#5A53F7" }}>Canais de filmes</PlanSpeedText>
                                    </>
                                )}
                            </PlanContent>
                            <PlanSpeedText style={{ fontWeight: 'bold', color: plan.recommend ? "#fff" : "#5A53F7" }}>Por: R$ {plan.price}</PlanSpeedText>
                            <ButtonOrder onClick={() => {
                                setPlanId(plan._id)
                                setShowModal(true)
                            }}>
                                <ButtonAdmText>Contrate já</ButtonAdmText>
                            </ButtonOrder>
                        </PlanContainer>
                    ))}
                </PlansContainer>
            </Content>
        </Container>);
}

export default Home;