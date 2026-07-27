import AppError from "./AppError.js";

const noRouteHandler = (req,res) => {

    throw new AppError("This route does not exist",404)

}

export default noRouteHandler