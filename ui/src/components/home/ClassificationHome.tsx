import React, { useEffect, useState } from 'react';
import FrequencySelect from './FrequencySelect';
import { FrequencyOption } from '../../Types/Frequency';
import BooleanRadio from './BooleanRadios';
import RatingSelect from './RatingSelect';
import { useAxios } from '../../hooks/useAxios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { IPatient } from '../../Types/IPatient';
import ResultClassification from './ResultClassification';

export default function ClasssificationHome() {
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

    const fetchPatients = async () => {
        try {
            const response = await useAxios.get(`/user/${userId}/patients`);
            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }
            const data = await response.data;
            setPatients(data.patients);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };


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
            optimism
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

    useEffect(() => {
        fetchPatients();
    }, [patients]);

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
                                        <ResultClassification id={patient.id} sadness={patient.sadness} euphoric={patient.euphoric}
                                            exhausted={patient.exhausted} sleep_disorder={patient.sleep_disorder}
                                            mood_swing={patient.mood_swing} suicidal_thoughts={patient.suicidal_thoughts}
                                            anorexia={patient.anorexia} authority_respect={patient.authority_respect}
                                            try_explanation={patient.try_explanation} aggressive_response={patient.aggressive_response}
                                            ignore_move_on={patient.ignore_move_on} nervous_breakdown={patient.nervous_breakdown} admit_mistakes={patient.admit_mistakes}
                                            overthinking={patient.overthinking} sexual_activity={patient.sexual_activity} concentration={patient.concentration}
                                            optimism={patient.optimism} diagnosis={patient.diagnosis}
                                        />
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