//@ts-check
const afrodite = require('../../../data/afrodite_treated.json');
const fuzzySearch = require('fuzzy-search');

class recipesController {


	/**
	 * Return recipes
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	getRecipes(req, res) {

		try {
			const { recipe } = req.query;

			if (recipe) {

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
	getRecipesNames(req, res) {

		try {

			const recipesName = afrodite.map(e => { return e.nome });

			res.status(200).send({
				"recipesName": recipesName
			});

		} catch (error) { res.status(500); }

	}

	/**
	 * Return with fuzzy search
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	fuzzySearch(req, res) {

		try {

			const { name } = req.query;

			if (name) {

				const fuzzy = new fuzzySearch(afrodite, ['nome'], { caseSensitive: false, sort: true });
				const result = fuzzy.search(name);

				// Filtering duplicate recipes
				const resultFiltered = result.reduce((thing, current) => {
					const x = thing.find(item => item.nome === current.nome);
					if (!x) {
					  return thing.concat([current]);
					} else {
					  return thing;
					}
				}, []);

				res.status(200).send({
					"results": resultFiltered.length,
					"recipes": resultFiltered
				});
			}

		} catch (error) { res.status(500); }

	}

}
module.exports = recipesController;