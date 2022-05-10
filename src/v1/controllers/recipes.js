//@ts-check
const afrodite = require('../../../data/afrodite_treated.json');

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
			
				res.status(200).send({
					"recipes": afrodite
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

			const recipesName = afrodite.map(e => { return e.nome });

			res.status(200).send({
				"recipesName": recipesName
			});

		} catch (error) { res.status(500); }

	}

}
module.exports = recipesController;