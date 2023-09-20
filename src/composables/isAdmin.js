const isAdmin = () => {
    if(JSON.parse(localStorage.getItem('user_type')) != 'ADMIN'){
        return 0
    }
}

export default isAdmin