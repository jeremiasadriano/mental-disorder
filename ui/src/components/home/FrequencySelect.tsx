import React from 'react';
import { FrequencyOption } from '../../Types/Frequency';
import { Label, Select } from 'flowbite-react';

const frequencyTranslations: { [key in FrequencyOption]: string } = {
    Usually: 'Geralmente',
    Sometimes: 'Às vezes',
    Seldom: 'Raramente',
    'Most-Often': 'Na maioria das vezes',
};

interface FrequencySelectProps {
    label: string;
    value: FrequencyOption;
    onChange: (value: FrequencyOption) => void;
}

const FrequencySelect: React.FC<FrequencySelectProps> = ({ label, value, onChange }) => {
    const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as FrequencyOption);
    };

    return (
        <div className="max-w-md">
            <div className="mb-2 block">
                <Label htmlFor="countries" value={label} />
            </div>
            <Select id={label} value={value} onChange={handleFrequencyChange} required>
                {Object.keys(frequencyTranslations).map((key) => (
                    <option key={key} value={key}>
                        {frequencyTranslations[key as FrequencyOption]}
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default FrequencySelect;
