/* eslint-disable @typescript-eslint/no-explicit-any */
function FormTextArea(props: any){

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { validation, invalid = "false", dirty = "false", onTurnDirty, ...textAreaProspProsp } = props;

    function handleBlur(){
        onTurnDirty(props.name);
    }

    return(
        <textarea 
            {...textAreaProspProsp} 
            onBlur={handleBlur} 
            data-dirty={dirty}
            data-invalid={invalid}
        />
    );
}

export default FormTextArea;