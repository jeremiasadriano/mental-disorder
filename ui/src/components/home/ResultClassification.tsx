import { IPatient } from "../../Types/IPatient";

export default function ResultClassification({ id, sadness, euphoric, exhausted, sleep_disorder, mood_swing, suicidal_thoughts, anorexia, authority_respect, ignore_move_on, nervous_breakdown, admit_mistakes, overthinking, sexual_activity, concentration, diagnosis, try_explanation, aggressive_response, optimism }: IPatient) {
    return (
        <div>
            <div>
                <strong>Previsão numero:</strong> {id}<br />
                <strong>Tristeza:</strong> {sadness}<br />
                <strong>Eufórico:</strong> {euphoric}<br />
                <strong>Exausto:</strong> {exhausted}<br />
                <strong>Distúrbio do Sono:</strong> {sleep_disorder}<br />
                <strong>Oscilação de Humor:</strong> {mood_swing ? 'Yes' : 'No'}<br />
                <strong>Pensamentos Suicidas:</strong> {suicidal_thoughts ? 'Yes' : 'No'}<br />
                <strong>Anorexia:</strong> {anorexia ? 'Yes' : 'No'}<br />
                <strong>Respeito pela Autoridade:</strong> {authority_respect ? 'Yes' : 'No'}<br />
                <strong>Tentativa de Explicação:</strong> {try_explanation ? 'Yes' : 'No'}<br />
                <strong>Resposta Agressiva:</strong> {aggressive_response ? 'Yes' : 'No'}<br />
                <strong>Ignorar e Seguir em Frente:</strong> {ignore_move_on ? 'Yes' : 'No'}<br />
                <strong>Colapso Nervoso:</strong> {nervous_breakdown ? 'Yes' : 'No'}<br />
                <strong>Admitir Erros:</strong> {admit_mistakes ? 'Yes' : 'No'}<br />
                <strong>Pensar Demais:</strong> {overthinking ? 'Yes' : 'No'}<br />
                <strong>Atividade Sexual:</strong> {sexual_activity}<br />
                <strong>Concentração:</strong> {concentration}<br />
                <strong>Otimismo:</strong> {optimism}<br />
                <strong>Diagnóstico:</strong> {diagnosis}<br />
            </div>
        </div>
    )
}
