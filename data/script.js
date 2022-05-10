//@ts-check
const afrodite = require('./afrodite.json');
const fs = require('fs/promises');

let newRecipes = [];
let recipe = {
	id: "",
	nome: "",
	ingredientes: [""],
	preparo: [""],
	informacoes: [""]

}


for (const recipe of afrodite) {

	let ingredient = [];
	let preparation = [];
	let information = [];

	for (const sec of recipe.secao) {

		//Getting recipes that have ingredients
		if(sec.conteudo.length > 0 && sec.nome === 'Ingredientes') {
			
			let splitted;

			//Recipe have ingredients in 1 line only, we should split...
			if(sec.conteudo.length === 1) {

				sec.conteudo[0] = `${sec.conteudo[0]}0`
				splitted = sec.conteudo[0].match(/\d{1,3}(\/\d{1,3})?.*?(?=\d)/gm);
				splitted = splitted ? splitted.map(entry => { return entry.replace(/^ /,'')}) : null;
				splitted = splitted ? splitted.map(entry => { return entry.replace(/^• /,'')}) : null;
				ingredient = splitted;
			
			} else {
				sec.conteudo = sec.conteudo ? sec.conteudo.map(entry => { return entry.replace(/^• /,'')}) : null;
				sec.conteudo = sec.conteudo ? sec.conteudo.filter(entry => { if(entry !== ' ') return true }) : null;
				ingredient = sec.conteudo;

			}

		} else if (sec.conteudo.length > 0 && sec.nome === 'Modo de Preparo') {

			let splitted;

			//Recipe have preparation methods in 1 line only, we should split...
			if(sec.conteudo.length === 1) {
				console.log(sec.conteudo);
				sec.conteudo[0] = `${sec.conteudo[0]}0`
				splitted = sec.conteudo[0].match(/.*?(?=\.)\./gm);
				
				//This can for sure be better, but for now it will stay as it is...
				splitted = splitted ? splitted.map(entry => { return entry.replace(/^ /,'')}) : null;
				splitted = splitted ? splitted.map(entry => { return entry.replace(/^- /,'')}) : null;
				
				preparation = splitted;
			
			} else {

				sec.conteudo = sec.conteudo ? sec.conteudo.filter(entry => { if(entry !== ' ') return true }) : null;
				preparation = sec.conteudo;

			}

		} else if (sec.conteudo.length > 0 && sec.nome === 'Outras informações') {

			sec.conteudo = sec.conteudo ? sec.conteudo.filter(entry => { if(entry !== ' ') return true }) : null;
			information = sec.conteudo;
		}
		
	};

	if(ingredient && ingredient.length > 0 && preparation && preparation.length > 0) {

		newRecipes.push({
			"id":recipe._id.$oid,
			"nome":recipe.nome,
			"ingredientes": ingredient,
			"preparo": preparation,
			"informacoes": information
		});
	};

};


fs.writeFile('./afrodite_treated.json',JSON.stringify(newRecipes),{encoding: 'utf-8'})
console.log(newRecipes)