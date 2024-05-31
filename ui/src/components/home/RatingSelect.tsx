import { Label, Select } from 'flowbite-react';
import React from 'react';

interface RatingSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const ratings = [
    "3 From 10",
    "4 From 10",
    "6 From 10",
    "5 From 10",
    "7 From 10",
    "8 From 10",
    "9 From 10",
    "2 From 10",
    "1 From 10"
];

const translatedRatings: any = {
    "3 From 10": "3 de 10",
    "4 From 10": "4 de 10",
    "6 From 10": "6 de 10",
    "5 From 10": "5 de 10",
    "7 From 10": "7 de 10",
    "8 From 10": "8 de 10",
    "9 From 10": "9 de 10",
    "2 From 10": "2 de 10",
    "1 From 10": "1 de 10"
};

const RatingSelect: React.FC<RatingSelectProps> = ({ label, value, onChange }) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label htmlFor="countries" value={label} />
            </div>
            <Select id={label} value={value} onChange={(e) => onChange(e.target.value)} required>
                {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                        {translatedRatings[rating]}
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default RatingSelect;
