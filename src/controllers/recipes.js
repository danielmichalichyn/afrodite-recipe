//@ts-check
const afrodite = require('../../data/afrodite.json');

class recipesController {


	/**
	 * Return recipes
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	getRecipes(req,res) {

		try {
			const { recipe } = req.query;

			if(recipe) {

				const recipes = afrodite.filter(e => { return e.nome === recipe });
				
				res.status(200).send({
					"recipes": recipes[0]
				});

			} else {
			
				const recipes = afrodite.filter(e => { return e.secao.filter(entry => {return entry.nome == "Ingredientes" && entry.conteudo.length > 0 })});
				res.status(200).send({
					"recipes": recipes
				});
			}

		} catch (error) { res.status(500); }
	}

	/**
	 * Return only recipes names
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	getRecipesNames(req,res) {

		try {

			const recipes = afrodite.filter(e => { return e.secao.filter(entry => {return entry.nome == "Ingredientes" && entry.conteudo.length > 0 })});
			const recipesName = recipes.map(e => { return e.nome });

			res.status(200).send({
				"recipesName": recipesName
			});

		} catch (error) { res.status(500); }

	}

}
module.exports = recipesController;