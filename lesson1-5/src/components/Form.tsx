import { useCallback, useRef, useState, useEffect } from "react";
import { Input } from "./Input";
import { Card, CardHeader, CardTitle } from "./ui/card";
import {
    Field,
    FieldGroup,
    FieldSet,
} from "./ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./Button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import useDebounce from "@/hooks/useDebounce";

type FormValuesType = {
    firstName: string
    lastName: string
    email: string
    mobileNumber: string
    selectedFruit: string
    radioButton: string | null
}

export function Form() {

  

    const [values, setValues] = useState<FormValuesType>({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        selectedFruit: '',
        radioButton: null,
    })

    const onInputChange = useCallback((key: keyof FormValuesType, value: string) => {
        setValues(prev => ({ ...prev, [key]: value }))
    }, [])

    const onSubmit = () => {
        const { firstName, email } = values
        localStorage.setItem(email, JSON.stringify(values))
        window.alert(`Hello ${firstName}; email address ${email}`)
    }

    const loadEmailRef = useRef<HTMLInputElement>(null)

    const onLoad = useCallback(() => {
        if (loadEmailRef.current && loadEmailRef.current.value) {
            const localStorageValue = localStorage.getItem(loadEmailRef.current?.value)
            if (localStorageValue) {
                const parsedLocalStorageValue: FormValuesType = JSON.parse(localStorageValue)
                window.alert(parsedLocalStorageValue.firstName)
                loadEmailRef.current.value = ''
                setValues(parsedLocalStorageValue)
            } else {
                window.alert('Email not found')
            }
        } else {
            window.alert('Some bug was found!')
        }
    }, [])

   

    
    const debouncedSearchTerm = useDebounce(JSON.stringify(values), 1000);

    useEffect(() => {
        if (values.email) {
            localStorage.setItem(values.email, JSON.stringify(values))
        }
    }, [debouncedSearchTerm])

    
    return (
        
            <div className="flex flex-col items-center">
            {!values.email ? (
                <Card className="w-3/4 max-w-7xl bg-gray-300">
                    <CardHeader>
                        <CardTitle className="text-gray-500">Please enter your email to continue</CardTitle>
                    </CardHeader>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <Input
                                    className="bg-white"
                                    autoComplete="off"
                                    type="email"
                                    placeholder="example@mail.com"
                                    value={values.email}
                                    onChange={(e) => onInputChange('email', e.target.value)}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </Card>
            ) : (
                <>
                    <Card className="w-3/4 max-w-7xl bg-gray-300">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="grow border h-0"></div>
                                <CardTitle className="text-white">Example</CardTitle>
                                <div className="grow border h-0"></div>
                            </div>
                        </CardHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                onSubmit()
                            }}
                            className="w-full"
                        >
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <Input
                                            className="bg-white"
                                            id="firstName"
                                            autoComplete="off"
                                            placeholder="First Name"
                                            value={values.firstName}
                                            onChange={(e) => {
                                                onInputChange('firstName', e.target.value)
                                            }}
                                        />
                                    </Field>
                                    <Field>
                                        <Input
                                            className="bg-white"
                                            id="lastName"
                                            autoComplete="off"
                                            placeholder="Last Name"
                                            value={values.lastName}
                                            onChange={(e) => {
                                                onInputChange('lastName', e.target.value)
                                            }}
                                        />
                                    </Field>
                                    <Field>
                                        <Input
                                            className="bg-white"
                                            id="email"
                                            disabled
                                            autoComplete="off"
                                            type="email"
                                            placeholder="example@mail.com"
                                            value={values.email}
                                            onChange={(e) => {
                                                onInputChange('email', e.target.value)
                                            }}
                                        />
                                    </Field>
                                    <Field>
                                        <Input
                                            className="bg-white"
                                            id="mobileNumber"
                                            autoComplete="off"
                                            type="number"
                                            placeholder="Mobile number"
                                            value={values.mobileNumber}
                                            onChange={(e) => {
                                                onInputChange('mobileNumber', e.target.value)
                                            }}
                                        />
                                    </Field>
                                </FieldGroup>
                                <FieldGroup>
                                    <Select
                                        onValueChange={(e) => {
                                            onInputChange('mobileNumber', e)
                                        }}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FieldGroup>
                                <FieldGroup>
                                    <RadioGroup defaultValue="comfortable" className="w-fit flex" onValueChange={(e) => {
                                        onInputChange('mobileNumber', e)
                                    }}>
                                        <RadioGroupItem className="bg-white" value="yes" id="yes" />
                                        <Label className="text-white" htmlFor="yes">Yes</Label>
                                        <RadioGroupItem className="bg-white" value="no" id="no" />
                                        <Label className="text-white" htmlFor="no">No</Label>
                                    </RadioGroup>
                                </FieldGroup>
                            </FieldSet>
                            <div className="flex flex-col py-4 gap-4">
                            <Button value="Submit" type="submit" className="bg-pink-500 p-4 rounded text-white uppercase" />                                <div className="flex items-center gap-2">
                                    <div className="grow border h-0"></div>
                                    <CardTitle className="text-white">or</CardTitle>
                                    <div className="grow border h-0"></div>
                                </div>
                                <Button value="Clear" type="submit" className="bg-gray-500 p-4 rounded text-white uppercase border-gray-500 border" />                            </div>
                        </form>
                    </Card>
                    <Card className="my-4 w-3/4 max-w-7xl bg-gray-300">
                        <CardHeader>
                            <div>
                                <div className="grow border h-0 "></div>
                                <CardTitle className="text-white">Already filled out form?</CardTitle>
                                <div className="grow border h-0"></div>
                            </div>
                        </CardHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                onLoad()
                            }}
                            className="w-full"
                        >
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <Input
                                            className="bg-white"
                                            id="email"
                                            autoComplete="off"
                                            type="email"
                                            ref={loadEmailRef}
                                            placeholder="example@mail.com"
                                        />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                            <div className="flex flex-col py-4 gap-4">
                            <Button value="Load" type="submit" className="bg-pink-500 p-4 rounded text-white uppercase" />
                            <Button value="Create New" type="submit" className="bg-gray-500 p-4 rounded text-white uppercase" />                            </div>
                        </form>
                    </Card>
                </>
            )}
        </div>
    );
}
