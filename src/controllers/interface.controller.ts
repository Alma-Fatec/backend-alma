interface IController {
    find(req: Request, res: Response): Promise<Response>;
    list(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
}

export default IController;
