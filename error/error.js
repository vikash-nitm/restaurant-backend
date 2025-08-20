//message jo hai error ke class mai exist krte hai means
//super class mai exist krte hai.

//or statusCode exist nhi krta error mai to
class ErrorHandler extends Error{
    constructor(message,statusCode){
       super(message);
        this.statusCode=statusCode;
    }
}
//above we create errorhandler then how we use this
//so we can create middleware.

export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message||"Internal Server Error!";
    err.statusCode=err.statusCode||500;
    return res.status(err.statusCode).json({
      success:false,
      message:err.message,


    });
};
export default ErrorHandler;