import React, { useState, useEffect } from 'react';

import { Container, ButtonAdm, ButtonAdmText, Header, Content, AlaresText, TitleText, FormText, Line, Input, ModalContent } from './styles';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import api from '../../services/api';

function Plan() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [speedNumber, setSpeedNumber] = useState("");
    const [prefix, setPrefix] = useState("");
    const [wifi, setWifi] = useState(false);
    const [games, setGames] = useState(false);
    const [movies, setMovies] = useState(false);
    const [recommend, setRecommend] = useState(false);

    const navigate = useNavigate();

    const getPlan = async () => {
        try {
            const id = window.location.href.split("?id=")[1];

            const response = await api.get(`/plan/${id}`);

            const { name, price, speedNumber, prefix, wifi, games, movies, recommend } = response.data

            setName(name);
            setPrice(price);
            setSpeedNumber(speedNumber);
            setPrefix(prefix);
            setWifi(wifi);
            setGames(games);
            setMovies(movies);
            setRecommend(recommend);

        } catch (err) {
            console.log("erro", err)
            toast.error("Não foi possível listar os planos");
        }
    }

    const formatPrice = (value) => {
        const valueNumber = value.replace(/\D/g, '');

        if (!valueNumber) {
            return '';
        }

        const formatted = (parseFloat(valueNumber) / 100).toFixed(2);

        return formatted;
    }

    const handleInputChange = (value) => {
        setPrice(formatPrice(value));
    }

    const register = async () => {
        try {
            const toSend = {
                name,
                speedNumber,
                wifi,
                games,
                movies,
                prefix,
                price,
                recommend
            }

            await api.post("/plan", toSend);

            toast.success("Plano cadastrado com sucesso!");
            navigate("/admin")
        } catch (err) {
            console.log("erro", err);
            toast.error("Não foi possível cadastrar o novo plano")
        }
    }

    const update = async () => {
        try {
            const toSend = {
                name,
                speedNumber,
                wifi,
                games,
                movies,
                prefix,
                price,
                recommend
            }

            const id = window.location.href.split("?id=")[1];

            await api.put(`/plan/${id}`, toSend);

            toast.success("Plano atualizado com sucesso!");
            navigate("/admin")
        } catch (err) {
            console.log("erro", err);
            toast.error("Não foi possível cadastrar o novo plano")
        }
    }

    useEffect(() => {
        if (window.location.href.indexOf("?id=") > 0) {
            getPlan();
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
                            <FormText>Nome do plano</FormText>
                            <Input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                        </ModalContent>
                        <ModalContent>
                            <FormText>Preço</FormText>
                            <Input type='text' onChange={(e) => handleInputChange(e.target.value)} value={price} required />
                        </ModalContent>
                    </Line>
                    <Line>
                        <ModalContent>
                            <FormText>Velocidade da internet</FormText>
                            <Input type='text' value={speedNumber} onChange={(e) => setSpeedNumber(e.target.value)} required />
                        </ModalContent>
                        <ModalContent>
                            <FormText>Prefixo (MB/GB)</FormText>
                            <Input type='text' value={prefix} onChange={(e) => setPrefix(e.target.value)} required />
                        </ModalContent>
                    </Line>
                    <Line>
                        <ModalContent style={{ width: '120px' }}>
                            <FormText>Wi-fi</FormText>
                            <Input style={{ width: '40px' }} type='checkbox' checked={wifi} onChange={() => setWifi(!wifi)} />
                        </ModalContent>
                        <ModalContent style={{ width: '120px' }}>
                            <FormText>Games</FormText>
                            <Input style={{ width: '40px' }} type='checkbox' checked={games} onChange={() => setGames(!games)} />
                        </ModalContent>
                        <ModalContent style={{ width: '140px' }}>
                            <FormText>Canal de filmes</FormText>
                            <Input style={{ width: '40px' }} type='checkbox' checked={movies} onChange={() => setMovies(!movies)} />
                        </ModalContent>
                        <ModalContent style={{ width: '120px' }}>
                            <FormText>Recomendação</FormText>
                            <Input style={{ width: '40px' }} type='checkbox' checked={recommend} onChange={() => setRecommend(!recommend)} />
                        </ModalContent>
                    </Line>
                    {window.location.href.indexOf("?id=") > 0 ? (
                        <ButtonAdm onClick={() => update()}>
                            <ButtonAdmText>Atualizar</ButtonAdmText>
                        </ButtonAdm>
                    ) : (
                        <ButtonAdm onClick={() => register()}>
                            <ButtonAdmText>Cadastrar</ButtonAdmText>
                        </ButtonAdm>
                    )}
                </Content>
            </Content>
        </Container>);
}

export default Plan;