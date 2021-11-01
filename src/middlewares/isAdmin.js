const Admin = true;
const isAdmin = (res, req, next) => {
    if(Admin){
        next()
    }else{
        res.status(401).json({
            error: '-1',
            descripcion: `ruta ${req.path} método ${req.method} no autorizada`,

        })
    }
}

module.exports = isAdmin