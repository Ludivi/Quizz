//Mise en place de mes constantes et variables
const form = document.querySelector(".form-quizz");
let tableauResultats = [];
const reponses = ["c", "a", "b", "b", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];//green mark emoj les emojis sont comptes comme une chaine de caracteres
const titreResultat = document.querySelector(".resultats h2");
const noteResultat = document.querySelector(".note");
const aideResultat = document.querySelector(".aide");
const toutesLesQuestions = document.querySelectorAll(".question-block");
let verifTableau = [];

/*Pour soumettre le formulaire sans actualiser la page a chaque fois*/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(document.querySelector('input[name="q1"]:checked').value);

  /*Pour reiterer 5 fois car il y a 5 questions*/
  for (i = 1; i < 6; i++) {
    tableauResultats.push(
      document.querySelector(`input[name="q${i}"]:checked`).value
    );
  }
  // console.log(tableauResultats);
  verifFunc(tableauResultats);
  tableauResultats = [];
});
//Pour verifier les resultats des questions true false
function verifFunc(tabResultats) {
  for (let a = 0; a < 5; a++) {
    if (tabResultats[a] === reponses[a]) {
      verifTableau.push(true);
    } else {
      verifTableau.push(false);
    }
  }

  // console.log(verifTableau);
  afficherResultats(verifTableau);
  couleursFonction(verifTableau);
  //remettre le tableau a zero
  verifTableau = [];
}
//Verifier notre tableau qui est en style check
//fonction filter pour filtrer le tableau et retourner les elements false qui ont été filtré
function afficherResultats(tabCheck) {
  const nbDeFautes = tabCheck.filter((el) => el !== true).length;
  // console.log(nbDeFautes);


  //Pour renvoyer un message a chaque nombre de fautes
  switch (nbDeFautes) {
    case 0://0 faute
      titreResultat.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`;
      aideResultat.innerText = "";
      noteResultat.innerText = "5/5";//Note pour le resultat
      break;//Pour passer a un autre cas
    case 1://1 faute
      titreResultat.innerText = `✨ Vous y êtes presque ! ✨`;
      aideResultat.innerText =
        "Retentez une autre réponse dans la case rouge, puis re-validez !";
      noteResultat.innerText = "4/5";
      break;
    case 2://2 fautes
      titreResultat.innerText = `✨ Encore un effort ... 👀`;
      aideResultat.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      noteResultat.innerText = "3/5";
      break;
    case 3://3fautes
      titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`;
      aideResultat.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      noteResultat.innerText = "2/5";
      break;
    case 4://4 fautes
      titreResultat.innerText = `😭 Peux mieux faire ! 😭`;
      aideResultat.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      noteResultat.innerText = "1/5";
      break;
    case 5://Tout faux
      titreResultat.innerText = `👎 Peux mieux faire ! 👎`;
      aideResultat.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      noteResultat.innerText = "0/5";
      break;

      //message par defaut pour une erreur qui ne depend pas du quizz
    default:
      "Oups, cas innatendu.";
  }
}
//Pour afficher les couleurs suivant le resultat des reponses du quizz
function couleursFonction(tabValBool) {
  for (let j = 0; j < tabValBool.length; j++) {
    if (tabValBool[j] === true) {
      toutesLesQuestions[j].style.background = "lightgreen";//bonne reponse
    } else {
      toutesLesQuestions[j].style.background = "#ffb8b8";//mauvaise reponse
      toutesLesQuestions[j].classList.add("echec");

      setTimeout(() => {
        toutesLesQuestions[j].classList.remove("echec");
      }, 500);//temps entre 2 animations d echec
    }
  }
}
//Pour enlever la couleur de la case quand on retente une reponse
toutesLesQuestions.forEach((item) => {
  item.addEventListener("click", () => {
    item.style.background = "white";
  });
}); 
