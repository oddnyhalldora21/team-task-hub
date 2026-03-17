import { useForm } from "@/hooks/useForm";
import { EmailGate } from "./EmailGate";
import { FormFields } from "./FormFields";
import { LoadForm } from "./LoadForm";

export function Form() {
    const { values, onInputChange, onSubmit, onLoad, loadEmailRef } = useForm()

    return (
        <div className="flex flex-col items-center">
            {!values.email ? (
                <EmailGate
                    email={values.email}
                    onEmailChange={(value) => onInputChange('email', value)}
                />
            ) : (
                <>
                    <FormFields
                        values={values}
                        onInputChange={onInputChange}
                        onSubmit={onSubmit}
                    />
                    <LoadForm
                        onLoad={onLoad}
                        loadEmailRef={loadEmailRef}
                    />
                </>
            )}
        </div>
    )
}