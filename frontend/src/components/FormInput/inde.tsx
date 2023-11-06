/* eslint-disable @typescript-eslint/no-explicit-any */
function FormInput(props: any){

    const { validation, ...inputProsp } = props;

    return(
        <input {...inputProsp} />
    );
}

export default FormInput;