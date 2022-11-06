import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prismaInstance";


const findUser = async()=>{
    const result = await prisma.users.findFirst({
        where: {
            email: {
                
            }
        }
    });
    return result;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // http://localhost:3000/api/user?email=joke@email.com
    const user = req.query["email"];

    if(!user || typeof(user) !== "string"){
        return res.status(422).json({
            status: 422,
            message: "Please provide an user email as string as param ?email='funnyguy@gma*l.com' "
        });
        
    }
    // const users = await findUser();

}