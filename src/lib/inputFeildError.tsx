/** biome-ignore-all lint/style/useImportType: > */

import { FieldDescription } from "@/components/ui/field";
import getInputFeildError, { IInputErrorState } from "./getInputFeildError";

interface FeildErrorProps {
    feild: string;
    state: IInputErrorState
}


const InputFeildError = ({ feild, state }: FeildErrorProps) => {
    if (getInputFeildError(feild, state)) {
        return (
            <FieldDescription className="text-red-600">
                error {getInputFeildError(feild, state)}
            </FieldDescription>
        )
    }
    return null

}

export default InputFeildError