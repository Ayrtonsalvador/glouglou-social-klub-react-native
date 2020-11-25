var app = require("./app")
var request = require("supertest")
var uniqid = require('uniqid');
var uid2 = require('uid2')

// TESTS TOKEN & STATUS UTILISATEUR
describe('sign-up', () => {

    test('sign-up caviste', async (done) => {
        var aleatoire = uid2(32)
        var test = await request(app).post("/sign-up")
            .send({
                "usernameFromFront": "Juliette", "emailFromFront": `ju@g.com${aleatoire}`,
                "statusFromFront": "Caviste"
            })
            .expect(200)

        expect(test.body.result).toBeTruthy()
        expect(test.body.saveCaviste.Status).toBe("Caviste")
        expect(test.body.saveCaviste.token).toBeDefined()

        done()
    });

    test('sign-up vigneron', async (done) => {
        var aleatoire = uid2(32)
        var test = await request(app).post("/sign-up")
            .send({
                "usernameFromFront": "Marco", "emailFromFront": `Paulo@g.com${aleatoire}`,
                "statusFromFront": "Vigneron"
            })
            .expect(200)

        expect(test.body.result).toBeTruthy()
        expect(test.body.saveVigneron.Status).toBe("Vigneron")
        expect(test.body.saveVigneron.token).toBeDefined()

        done()
    });
})

// TESTS CHAMPS VIDES SIGN-IN
describe('erreur champs vide sign-in', () => {

    test('email vide', async (done) => {
        await request(app).post("/sign-in")
            .send({ "emailFromFront": "" })
            .expect({ result: false, error: ['veuillez compléter les champs vides !'], token: null, status: null })
            .expect(200)

        done()
    })

    test('password vide', async (done) => {
        await request(app).post("/sign-in")
            .send({ "passwordFromFront": "" })
            .expect({ result: false, error: ['veuillez compléter les champs vides !'], token: null, status: null })
            .expect(200)

        done()
    })

});


// TESTS CAVE VIGNERON
describe('gestion de la cave', () => {

    test('ajouter une référence', async (done) => {
        var test = await request(app).post("/AddVin")
            .send({
                "bottleinfos": `{"NomRef": "Test", "Couleur": "Test", "AOC": "Test", 
            "Desc": "Test", "Cepage": "Test", "Millesime": "Test", "token": "6r0oJJ3l1NL811RQIZNUaQs4aaLTfg1r"}` })
            .expect(200)

        expect(test.body.result).toBeTruthy()

        done()
    })

    test('supprimer une référence', async (done) => {
        var test = await request(app)
            .delete("/delete-ref/Test")
            .expect(200)

        expect(test.body.result).toBeTruthy()

        done()
    })
})

describe('favoris caviste', () => {
    test("ajouter aux favoris", async (done) => {
        var test = await request(app).post("/add-favoris")
            .send({
                "NomFF": "Test", "CouleurFF": "Test", "AOCFF": "Test", "DescFF": "Test", "CepageFF": "Test",
                "MillesimeFF": "Test", "idFF": "5fa3cc475be7b514a1234b95", "tokenFF": "0DM0ez8dOrDjw7Cj5t9he2OddrVONMKl"
            })
            .expect(200)

        expect(test.body.result).toBeTruthy()

        done()
    })

    test('supprimer des favoris', async (done) => {
        var test = await request(app)
            .delete("/delete-favoris/Test/0DM0ez8dOrDjw7Cj5t9he2OddrVONMKl")
            .expect(200)

        expect(test.body.result).toBeTruthy()

        done()
    })
})
