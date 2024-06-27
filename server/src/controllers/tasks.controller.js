import sql from '../db/db.js'

export async function getAdminProjects(req, res) { 

    const email = req.query.email;
    try {

        const result = await sql`SELECT * FROM projects
                        WHERE createdby = ${email}`;
        if(result.length === 0){
            res.json({
                status:204,
                message:"No Projects"
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

export async function getSingleAdminProjects(req, res) { 

    const projectid = req.query.projectid;
    try {

        const result = await sql`SELECT * FROM projects
                        WHERE projectid = ${projectid}`;
        if(result.length === 0){
            res.json({
                status:204,
                message:"No Projects"
            })
        } else {
            res.json({
                status:201,
                result:result[0]
            })
        }
        
    } catch (error) {

        res.json({
            status:500,
            message:error.message
        })
        
    }
    

}


export async function getUserProject(req, res){

    const email = req.query.email;
    try {

        const result = await sql`SELECT DISTINCT
                        p.projectid,
                        p.projectname,
                        p.createdby,
                        p.createdon
                        FROM projects p
                        CROSS JOIN LATERAL unnest(p.tasks) AS t
                        WHERE t.touser = ${email}`;
        if(result.length === 0){
            res.json({
                status:204,
                message:"No Projects"
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

export async function getUserTasks(req, res){

    const email = req.query.email;
    const project = req.query.project;
    try {

        const result = await sql`SELECT
                            t.touser,
                            t.content,
                            t.createdon,
                            t.iscompleted
                            FROM projects p
                            CROSS JOIN LATERAL unnest(p.tasks) AS t
                            WHERE t.touser = ${email}
                            AND p.projectname = ${project}`;
        if(result.length === 0){
            res.json({
                status:204,
                message:"No Tasks"
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

export async function createProject(req, res){

    const email = req.body.email;
    const project = req.body.project;
    try {

        const result = await sql`INSERT INTO projects (projectname, createdon, createdby) 
                        VALUES(${project},${new Date().toISOString().split('T')[0]},
                        ${email}) 
                        RETURNING *`
        if(result.length === 0){
            res.json({
                status:204,
                message:"User Dose Not Exist"
            })
        } else {
            res.json({
                status:201,
                result:result[0]
            })
        }
        
    } catch (error) {

        res.json({
            status:500,
            message:error.message
        })
        
    }

    
}

export async function addTask(req,res){

    const email = req.body.email;
    const content = req.body.content;
    const projectid = req.body.projectid;


    try {
        const result = await sql`UPDATE projects SET tasks = tasks || Array [Row(
            ${email},
            ${content},
            ${new Date().toISOString().split('T')[0]},
            FALSE
            )]::tasks[]
            WHERE projectid = ${projectid} RETURNING *`
        
        if(result.length === 0){
            res.json({
                status:204,
                message:"User Dose Not Exist"
            })
        } else {
            res.json({
                status:201,
                result:result[0]
            })
        }
   
    } catch (error) {

        res.json({
            status:500,
            message:error.message
        })
        
    }


}

export async function taskDone(req,res){

    const email = req.body.email;
    const content = req.body.content;
    const projectid = req.body.projectid;


    try {
        const result = await sql`UPDATE projects
                                SET tasks = array(
                                    SELECT (CASE
                                            WHEN (t).touser = ${email} AND (t).content LIKE ${"%"+content+"%"} THEN
                                                ROW((t).touser, (t).content, (t).createdon, true)::tasks
                                            ELSE
                                                (t)
                                        END)
                                    FROM unnest(tasks) AS t
                                )
                                WHERE projectid = ${projectid}
                                AND EXISTS (
                                    SELECT 1
                                    FROM unnest(tasks) AS t
                                    WHERE (t).touser = ${email} AND (t).content LIKE ${"%"+content+"%"}
                                ) RETURNING *;
                                `
        
        if(result.length === 0){
            res.json({
                status:204,
                message:"User Dose Not Exist"
            })
        } else {
            res.json({
                status:201,
                result:"updated"
            })
        }
   
    } catch (error) {

        res.json({
            status:500,
            message:error.message
        })
        
    }


}

