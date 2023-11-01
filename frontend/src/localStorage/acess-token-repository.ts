
export function save(token: string){
    localStorage.setItem("token", token);
}


export function get() : string | null{
    return localStorage.getItem("token")
}


export function remove(){
    localStorage.removeItem("token");
}