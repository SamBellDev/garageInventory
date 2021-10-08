import express, {Application, Request, Response} from 'express';
import {AnyError, Collection, Db, MongoClient, ObjectId} from 'mongodb';


const mongoUrl: string = 'mongodb://root:password@localhost:27017'

function router(app: Application) {

    app.get('/', (req: Request, res: Response) => {
        MongoClient.connect(mongoUrl, async (error: AnyError | undefined, client: MongoClient | undefined) => {
            console.log('Connected to MongoDB!')
            if (client) {
                const db: Db = client.db('garageApp')
                const toolsCollection: Collection = db.collection('tools')
                const tools = await toolsCollection.find({}).toArray()
                res.render('homePage', {tools})
            } else {
                res.sendStatus(500)
            }
        })
    })

    app.delete('/tools/:id', (req: Request, res: Response) => {
        let id = new ObjectId(req.params.id)
        MongoClient.connect(mongoUrl, async (error, client) => {
            if (client) {
                let toolsCollection = client.db('garageApp').collection('tools')
                await toolsCollection.deleteOne({_id: id})
            } else {
              res.sendStatus(500)
            }
        })
    })

}

module.exports = router;