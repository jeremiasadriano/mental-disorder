import React from 'react';

interface BooleanRadioProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const BooleanRadio: React.FC<BooleanRadioProps> = ({ label, value, onChange }) => {
    return (
        <div>
            <label>{label}:</label>
            <br />
            <label>
                <input
                    type="radio"
                    value="true"
                    checked={value === true}
                    onChange={() => onChange(true)}
                />
                Sim
            </label>
            <br />
            <label>
                <input
                    type="radio"
                    value="false"
                    checked={value === false}
                    onChange={() => onChange(false)}
                />
                Não
            </label>

        </div>
    );
};

export default BooleanRadio;
