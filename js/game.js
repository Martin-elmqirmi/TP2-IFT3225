let question = 0;
let game = 0;
let point = 0;

let question1 = false;
let question2 = false;
let question3 = false;

let answer1 = "";
let answer2 = "";
let answer3 = "";

/* Fonction main qui est la fonction principale du jeu. */
function main() {
    // Au chargement de la page on supprime les offset-lg-5 des
    // jeu 2 et 3
    $("div.game2 div.offset-lg-5").removeClass("offset-lg-5");
    $("div.game3 div.offset-lg-5").removeClass("offset-lg-5");

    // On cache les questions et la div du résultat
    hide_game_questions();
    hide_result();

    // lorsqu'on clique pour jouer au jeu 1
    $(".menu_game1").click(function() {
        hide_game_menu();
        show_game_questions();
        game = 1;
        question = 1;
        start_game();
    });

    // lorsqu'on clique pour jouer au jeu 2
    $(".menu_game2").click(function() {
        hide_game_menu();
        show_game_questions();
        game = 2;
        question = 1;
        start_game();
    });

    // lorsqu'on clique pour jouer au jeu 3
    $(".menu_game3").click(function() {
        hide_game_menu();
        show_game_questions();
        game = 3;
        question = 1;
        start_game();
    });

    // lorsqu'on clique sur suivant on passe
    // à la prochaine question
    $("#next").click(function() {
        next_question();
    });

    // lorsqu'on clique pour revenir au menu
    $("#back-menu").click(function() {
        resetGames();
        hide_result();
        show_game_menu();
    });
}

/* Fonction qui reset les attributs du jeu */
function resetGames() {
    game = 0;
    question = 0;
    point = 0;
    question1 = false;
    question2 = false;
    question3 = false;
    answer1 = "";
    answer2 = "";
    answer3 = "";
}

/* Fonction qui passe à la prochaine question */
function next_question() {
    resetTimer();
    checkAnswer();
    if (question < 3) {
        question += 1;
        start_game();
    } else {
        complete_result();
        hide_game_questions();
        show_result();
        reset_forms();
    }
}

/* Fonction qui met à jour le contenu de la division result
*  après qu'un jeu ce soit terminé. */
function complete_result() {
    document.getElementById("nb-questions-answer").innerHTML = point;

    var elem_question1 = document.getElementById("result-question1");
    if (question1) {
        elem_question1.innerHTML = '<i class="fa fa-check text-success"></i>';
    } else {
        elem_question1.innerHTML = '<i class="fa fa-close text-danger"></i> ' +
            'La bonne réponse était <b>' + answer1 +'</b>';
    }

    var elem_question2 = document.getElementById("result-question2");
    if (question2) {
        elem_question2.innerHTML = '<i class="fa fa-check text-success"></i>';
    } else {
        elem_question2.innerHTML = '<i class="fa fa-close text-danger"></i> ' +
            'La bonne réponse était <b>' + answer2 +'</b>';
    }

    var elem_question3 = document.getElementById("result-question3");
    if (question3) {
        elem_question3.innerHTML = '<i class="fa fa-check text-success"></i>';
    } else {
        elem_question3.innerHTML = '<i class="fa fa-close text-danger"></i> ' +
            'La bonne réponse était <b>' + answer3 +'</b>';
    }
}

/* Fonction qui récupère les valeurs des balises <input>
 * sélectionnées. */
function getValuesChecked(nameElem, nbAnswer) {
    let goodAnswer = true;
    let input = $('input[type=checkbox][name='+nameElem+']:checked');
    if (input.length !== nbAnswer) {
        goodAnswer = false;
    } else if (input.length !== 0) {
        input.each(function (index) {
            if (input[index].value !== "1") {
                goodAnswer = false;
            }
        })
    }

    return goodAnswer;
}

/* Fonction qui récupère la valeur de la balise <option>
 * sélectionné dans une balise <select> */
function getValueSelected(nameElem) {
    return $('option[name='+nameElem+']:selected').val();
}

/* Fonction qui s'occupe de récupérer les réponses aux
*  questions et qui ajoute des points si la réponse est bonne. */
function checkAnswer() {
    if (game === 1) {
        if (question === 1) {
            if (getValueSelected("question11") === "1") {
                point += 1;
                question1 = true;
            } else {
                answer1 = $("option[name=question11][value='1']").text();
            }
        }
        if (question === 2) {
            if (getValueSelected("question12") === "1") {
                point += 1;
                question2 = true;
            } else {
                answer2 = $("option[name=question12][value='1']").text();
            }
        }
        if (question === 3) {
            if (getValueSelected("question13") === "1") {
                point += 1;
                question3 = true;
            } else {
                answer3 = $("option[name=question13][value='1']").text();
            }
        }
    } else if (game === 2) {
        if (question === 1) {
            if (getValueSelected("question21") === "1") {
                point += 1;
                question1 = true;
            } else {
                answer1 = $("option[name=question21][value='1']").text();
            }
        }
        if (question === 2) {
            if (getValuesChecked("question22", 2)) {
                point += 1;
                question2 = true;
            } else {
                let input = $("input[name=question22][value='1']");
                input.each(function (index) {
                    answer2 += $("label[for="+input[index].id+"]").text() + ', ';
                });
                answer2 = answer2.substring(0, answer2.length - 2);
            }
        }
        if (question === 3) {
            if (getValueSelected("question23") === "1") {
                point += 1;
                question3 = true;
            } else {
                answer3 = $("option[name=question23][value='1']").text();
            }
        }
    }
}

/* Fonction qui gère l'affichage du jeu.
*  Elle intéragit avec la fonction timer()
*  qui gère le temps de chaque questions. */
function start_game() {
    if (game === 1) {
        if (question === 1) {
            show_game_question(1, 1);
            hide_game(2);
            hide_game(3);
            hide_game_question(1,2);
            hide_game_question(1,3);
            startTimer();
        } else if (question === 2) {
            show_game_question(1, 2);
            hide_game(2);
            hide_game(3);
            hide_game_question(1,1);
            hide_game_question(1,3);
            startTimer();
        } else if (question === 3) {
            show_game_question(1, 3);
            hide_game(2);
            hide_game(3);
            hide_game_question(1,1);
            hide_game_question(1,2);
            startTimer();
        }
    } else if (game === 2) {
        if (question === 1) {
            show_game_question(2, 1);
            hide_game(1);
            hide_game(3);
            hide_game_question(2,2);
            hide_game_question(2,3);
            startTimer();
        } else if (question === 2) {
            show_game_question(2, 2);
            hide_game(1);
            hide_game(3);
            hide_game_question(2,1);
            hide_game_question(2,3);
            startTimer();
        } else if (question === 3) {
            show_game_question(2, 3);
            hide_game(1);
            hide_game(3);
            hide_game_question(2,1);
            hide_game_question(2,2);
            startTimer();
        }
    } else if (game === 3) {
        if (question === 1) {
            show_game_question(3, 1);
            hide_game(1);
            hide_game(2);
            hide_game_question(3,2);
            hide_game_question(3,3);
            startTimer();
        } else if (question === 2) {
            show_game_question(3, 2);
            hide_game(1);
            hide_game(2);
            hide_game_question(3,1);
            hide_game_question(3,3);
            startTimer();
        } else if (question === 3) {
            show_game_question(3, 3);
            hide_game(1);
            hide_game(2);
            hide_game_question(3,1);
            hide_game_question(3,2);
            startTimer();
        }
    }
}

function reset_forms() {
    $(":checked").prop('checked', false);
    $(":selected").prop('selected', false);
}

/**********************************************
 * Fonctions pour l'affichage des éléments
 **********************************************/

/* Affiche le résultat d'un joueur après un jeu */
function show_result() {
    $("#result").show();
}

/* Cache la divisions qui affiche les résultats */
function hide_result() {
    $("#result").hide();
}

/* Cache une question d'un jeu particulier */
function hide_game_question(game, question) {
    $("#question-" + game + "_" + question).hide();
}

/* Affiche une question d'un jeu particulier */
function show_game_question(game, question) {
    $("#question-" + game + "_" + question).show();
}

/* Cache un jeu entier */
function hide_game(game) {
    $(".game" + game).hide();
}

/* Affiche un jeu entier */
function show_game(game) {
    $(".game" + game).show();
}

/* Cache le menu des jeux */
function hide_game_menu() {
    $(".game-menu").hide();
}

/* Affiche le menu des jeux */
function show_game_menu() {
    $(".game-menu").show();
}

/* Affiche toutes les questions de tout les jeux */
function show_game_questions() {
    $(".game-questions").show();
    for(let question = 1; question <= 3; question++) {
        show_game(question);
        for(let sousQuestion = 1; sousQuestion <= 3; sousQuestion++) {
            show_game_question(question, sousQuestion);
        }
    }
}

/* Cache toutes les questions de tout les jeux */
function hide_game_questions() {
    $(".game-questions").hide();
}


$(main);