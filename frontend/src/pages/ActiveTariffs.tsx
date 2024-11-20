import { TariffCard } from "../components/UI/TariffCard"
import { tariffs } from "../mock/mock"

export const ActiveTariffs = () => {
    return (
        <div className="grow flex items-center justify-center">
            <div className="w-[548px]">
                <TariffCard type={tariffs[11].type} cardInfo={tariffs[11]} 
                onClick={() => console.log("fdsf")} />
            </div>   
        </div>
    )
}