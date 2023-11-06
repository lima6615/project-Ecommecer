import ButtonPrimary from "../ButtonPrimary";


type Props = {
    message: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onDialogClose: Function;
}
function DialogInfo({message, onDialogClose} : Props){
    return(
        <div className="dsc-dialog-backgroud" onClick={() => onDialogClose()}>
            <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dsc-dialog-btn-container" onClick={() => onDialogClose()}>
                    <ButtonPrimary name="OK" />
                </div>
               
            </div>
        </div>
    );
}

export default DialogInfo;