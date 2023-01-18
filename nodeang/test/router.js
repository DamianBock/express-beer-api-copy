module.exports =function(router){
const router = express.Router = express.Router()
router.post('/Haus', MidWar.CreateHaus);
router.get('/HausAll', MidWar.GetHausAll);
router.get('/Haus/:ID', Midwar.GetHaus);
router.get('/Interessenten/:ID', Midwar.GetInteressenten);
router.get('/HausATyp/:Typ', Midwar.GetHausByTyp);
router.get('/HausAAdresse/:Adresse', Midwar.GetHausByAddresse);
router.delete('/Haus/:ID', Midwar.DeleteHaus);
router.put('/Haus/:ID', Midwar.ChangeHaus);
router.put('/InteressentenP/:ID', Midwar.ChangeInteressentenAmountP);
router.put('/InteressentenM/:ID', Midwar.ChangeInteressentenAmountM);
}