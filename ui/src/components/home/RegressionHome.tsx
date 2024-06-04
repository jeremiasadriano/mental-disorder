import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import Cookies from 'js-cookie'
import { ICarData } from "../../Types/Icar";

export default function RegressionHome() {
    const [carData, setCarData] = useState<ICarData | null>(null)
    const [carName, setCarName] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [sellingPrice, setSellingPrice] = useState<string>('');
    const [presentPrice, setPresentPrice] = useState<string>('');
    const [kmsDriven, setKmsDriven] = useState<string>('');
    const [fuelType, setFuelType] = useState<string>('');
    const [sellerType, setSellerType] = useState<string>('');
    const [transmission, setTransmission] = useState<string>('');
    const [diagnosis, setDiagnosis] = useState<string>('');
    const [predictedPrice, setPredictedPrice] = useState<string>('');
    const [owner, setOwner] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        setCarData({
            car_name: carName,
            year: year,
            seller_type: sellerType,
            selling_price: sellingPrice,
            present_price: presentPrice,
            kms_driven: kmsDriven,
            fuel_type: fuelType,
            transmission: transmission,
            owner: owner
        })
        e.preventDefault();
        const userId = Cookies.get("id");
        try {
            const response = await useAxios.post(`/car/${userId}/predict`, carData);
            setPredictedPrice(response.data.predicted_price);
            console.log(predictedPrice)
        } catch (error) {
            console.error("There was an error making the request!", error);
        }
    };
    return (
        <div className="flex gap-8">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-12 mt-8">
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marca do carro</label>
                                <input type="text" value={carName} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setCarName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ano de lançamento</label>
                                <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={year} onChange={(e) => setYear(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço de venda</label>
                                <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço atual</label>
                                <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={presentPrice} onChange={(e) => setPresentPrice(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de combustível</label>
                                <input type="text" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={fuelType} onChange={(e) => setFuelType(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de vendedor</label>
                                <input type="text" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={sellerType} onChange={(e) => setSellerType(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quilometragem do carro</label>
                                <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={kmsDriven} onChange={(e) => setKmsDriven(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de transmissão do carro (manual ou automática)</label>
                                <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={transmission} onChange={(e) => setTransmission(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Número de proprietários anteriores do carro</label>
                                <input type="text" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Vendedor</label>
                                <input type="text" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={owner} onChange={(e) => setOwner(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div >
            <div>
                <h1 className="text-black">O preço estimado é de: {predictedPrice}</h1>
            </div>
        </div >
    )
}
