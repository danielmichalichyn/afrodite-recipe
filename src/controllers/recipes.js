//@ts-check
const afrodite = require('../../data/afrodite.json');

class recipesController {


	async getRecipes(req,res) {

		try {

			const recipes = afrodite.filter(e => { return e.secao.filter(entry => {return entry.nome == "Ingredientes" && entry.conteudo.length > 0 })});

			// console.log('recipes:',recipes);

			res.status(200).send({
				"recipes": recipes
			});

		} catch (error) {

			res.status(500);

		}

	}

}
module.exports = recipesController;