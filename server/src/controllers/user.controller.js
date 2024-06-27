import sql from '../db/db.js'


async function handleRegister(req, res){
    var userData = req.body;
    console.log(userData);
    var username = userData.username;
    var email = userData.email;
    var userrole = userData.userrole;
    var password = userData.password;
    try {
        const ret = await sql`INSERT INTO users
        VALUES(${username},
        ${email},
        ${userrole},
        ${password})`

        res.json({
            status:200,
            message:ret
        })

    } catch (error) {
        res.json({
            status:500,
            message:error.message
        })
    }

}

function handleLogin(req,res){

    console.log(req.body);
    if(req.isAuthenticated()){
        res.json({
            status:200,
            message:req.body.username
        })
    } else {
        res.json({
            status:401,
            message:"unauthorized"
        })
    }
    
    
}

export async function isAdmin(req, res){

    const email = req.query.email;
    try {

        const result = await sql`SELECT userrole,username from users where email =${email}`
        if(result.length === 0){
            res.json({
                status:204,
                message:"User Dose Not Exists"
            })
        } else if(result[0].userrole === "admin") {
            res.json({
                status:201,
                admin:true,
                username:result[0].username
            })
        } else {
            res.json({
                status:201,
                admin:false,
                username:result[0].username
            })
        }
        
    } catch (error) {

        res.json({
            status:500,
            message:error.message
        })
        
    }
}

export async function getAllUsers(req, res){

    try {

        const result = await sql`SELECT email, username from users where userrole = 'user'`
        if(result.length === 0){
            res.json({
                status:204,
                message:"No User"
            })
        } else {
            res.json({
                status:201,
                result:result
            })
        }
        
    } catch (error) {

        res.json({
            status:500,
            message:error.message
        })
        
    }
}

export {handleRegister, handleLogin};