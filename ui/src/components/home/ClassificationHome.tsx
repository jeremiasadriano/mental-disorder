import React, { useEffect, useState } from 'react';
import FrequencySelect from './FrequencySelect';
import { FrequencyOption } from '../../Types/Frequency';
import BooleanRadio from './BooleanRadios';
import RatingSelect from './RatingSelect';
import { useAxios } from '../../hooks/useAxios';
import Cookies from 'js-cookie'
import PatientList from './PatientList';
import { useNavigate } from 'react-router-dom';
import { IPatient } from '../../Types/IPatient';

const Form: React.FC = () => {
    const [sadness, setSadness] = useState<FrequencyOption>('Usually');
    const [euphoric, setEuphoric] = useState<FrequencyOption>('Usually');
    const [exhausted, setExhausted] = useState<FrequencyOption>('Usually');
    const [sleepDisorder, setSleepDisorder] = useState<FrequencyOption>('Usually');

    const [moodSwing, setMoodSwing] = useState<boolean>(false);
    const [suicidalThoughts, setSuicidalThoughts] = useState<boolean>(false);
    const [anorexia, setAnorexia] = useState<boolean>(false);
    const [authorityRespect, setAuthorityRespect] = useState<boolean>(false);
    const [tryExplanation, setTryExplanation] = useState<boolean>(false);
    const [aggressiveResponse, setAggressiveResponse] = useState<boolean>(false);
    const [ignoreMoveOn, setIgnoreMoveOn] = useState<boolean>(false);
    const [nervousBreakdown, setNervousBreakdown] = useState<boolean>(false);
    const [admitMistakes, setAdmitMistakes] = useState<boolean>(false);
    const [overthinking, setOverthinking] = useState<boolean>(false);

    const [sexualActivity, setSexualActivity] = useState<string>("3 From 10");
    const [concentration, setConcentration] = useState<string>("3 From 10");
    const [optimism, setOptimism] = useState<string>("3 From 10");

    const navigate = useNavigate()


    const [patients, setPatients] = useState<IPatient[]>([]);
    const userId = Cookies.get("id");

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/user/${userId}/patients`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPatients(data.patients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, [patients]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = {
            sadness,
            euphoric,
            exhausted,
            sleepDisorder,
            moodSwing,
            suicidalThoughts,
            anorexia,
            authorityRespect,
            tryExplanation,
            aggressiveResponse,
            ignoreMoveOn,
            nervousBreakdown,
            admitMistakes,
            overthinking,
            sexualActivity,
            concentration,
            optimism,
        };
        try {
            const id = Cookies.get("id")
            const response = await useAxios.post(`/predict/${id}`, formData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('Form Data:', formData);
        navigate("/classification")
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div style={{ display: 'flex', marginTop: 60, gap: 15 }}>
                    <div>
                        <FrequencySelect label="Tristeza" value={sadness} onChange={setSadness} />
                        <FrequencySelect label="Eufórico" value={euphoric} onChange={setEuphoric} />
                        <FrequencySelect label="Exausto" value={exhausted} onChange={setExhausted} />
                        <FrequencySelect label="Distúrbio do Sono" value={sleepDisorder} onChange={setSleepDisorder} />
                    </div>
                    <div className='flex flex-col flex-wrap gap-2 p-4' style={{ display: 'flex', flexWrap: 'wrap', gap: 35 }}>
                        <BooleanRadio label="Oscilação de Humor" value={moodSwing} onChange={setMoodSwing} />
                        <BooleanRadio label="Pensamentos Suicidas" value={suicidalThoughts} onChange={setSuicidalThoughts} />
                        <BooleanRadio label="Anorexia" value={anorexia} onChange={setAnorexia} />
                        <BooleanRadio label="Respeito à Autoridade" value={authorityRespect} onChange={setAuthorityRespect} />
                        <BooleanRadio label="Tentar Explicação" value={tryExplanation} onChange={setTryExplanation} />
                    </div>
                    <div className='flex flex-col flex-wrap gap-2 p-4' style={{ display: 'flex', flexWrap: 'wrap', gap: 35 }}>
                        <BooleanRadio label="Resposta Agressiva" value={aggressiveResponse} onChange={setAggressiveResponse} />
                        <BooleanRadio label="Ignorar e Seguir em Frente" value={ignoreMoveOn} onChange={setIgnoreMoveOn} />
                        <BooleanRadio label="Colapso Nervoso" value={nervousBreakdown} onChange={setNervousBreakdown} />
                        <BooleanRadio label="Admitir Erros" value={admitMistakes} onChange={setAdmitMistakes} />
                        <BooleanRadio label="Overthinking" value={overthinking} onChange={setOverthinking} />
                    </div>
                    <div>
                        <RatingSelect label="Atividade Sexual" value={sexualActivity} onChange={setSexualActivity} />
                        <RatingSelect label="Concentração" value={concentration} onChange={setConcentration} />
                        <RatingSelect label="Otimismo" value={optimism} onChange={setOptimism} />
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div style={{ overflowY: 'auto', maxHeight: 650, scrollbarWidth: 'none' }}>
                        <div>
                            <h1>Resultados passados</h1>
                            <ul>
                                {patients.map(patient => (
                                    <li key={patient.id}>
                                        <strong>Previsão numero:</strong> {patient.id}<br />
                                        <strong>Tristeza:</strong> {patient.sadness}<br />
                                        <strong>Eufórico:</strong> {patient.euphoric}<br />
                                        <strong>Exausto:</strong> {patient.exhausted}<br />
                                        <strong>Distúrbio do Sono:</strong> {patient.sleep_disorder}<br />
                                        <strong>Oscilação de Humor:</strong> {patient.mood_swing ? 'Yes' : 'No'}<br />
                                        <strong>Pensamentos Suicidas:</strong> {patient.suicidal_thoughts ? 'Yes' : 'No'}<br />
                                        <strong>Anorexia:</strong> {patient.anorexia ? 'Yes' : 'No'}<br />
                                        <strong>Respeito pela Autoridade:</strong> {patient.authority_respect ? 'Yes' : 'No'}<br />
                                        <strong>Tentativa de Explicação:</strong> {patient.try_explanation ? 'Yes' : 'No'}<br />
                                        <strong>Resposta Agressiva:</strong> {patient.aggressive_response ? 'Yes' : 'No'}<br />
                                        <strong>Ignorar e Seguir em Frente:</strong> {patient.ignore_move_on ? 'Yes' : 'No'}<br />
                                        <strong>Colapso Nervoso:</strong> {patient.nervous_breakdown ? 'Yes' : 'No'}<br />
                                        <strong>Admitir Erros:</strong> {patient.admit_mistakes ? 'Yes' : 'No'}<br />
                                        <strong>Pensar Demais:</strong> {patient.overthinking ? 'Yes' : 'No'}<br />
                                        <strong>Atividade Sexual:</strong> {patient.sexual_activity}<br />
                                        <strong>Concentração:</strong> {patient.concentration}<br />
                                        <strong>Otimismo:</strong> {patient.optimism}<br />
                                        <strong>Diagnóstico:</strong> {patient.diagnosis}<br />
                                        <br />
                                        <br />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <button type="submit" style={{ backgroundColor: 'rgb(47, 46, 65)', color: 'white', padding: 5, borderRadius: 5 }}>Enviar</button>
            </form>
        </div>
    );
};

export default Form;
