import React, { useEffect, useState } from 'react';
import { IPatient } from '../../Types/IPatient';
import Cookies from 'js-cookie'

const PatientList: React.FC = () => {
    const [patients, setPatients] = useState<IPatient[]>([]);
    const userId = 1
    // Cookies.get("1");

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
    }, [userId]);

    return (
        <div>
            <h1>Resultados passados</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        <strong>Patient ID:</strong> {patient.id}<br />
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
    );
};

export default PatientList;
