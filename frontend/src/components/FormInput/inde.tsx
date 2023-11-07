/* eslint-disable @typescript-eslint/no-explicit-any */
function FormInput(props: any){

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { validation, invalid = "false", dirty = "false", onTurnDirty, ...inputProsp } = props;

    function handleBlur(){
        onTurnDirty(props.name);
    }

    return(
        <input 
            {...inputProsp} 
            onBlur={handleBlur} 
            data-dirty={dirty}
            data-invalid={invalid}
        />
    );
}

export default FormInput;