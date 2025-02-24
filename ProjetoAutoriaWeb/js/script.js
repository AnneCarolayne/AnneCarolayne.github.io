/*Seleciona o elemento HTML pelo seu id e o armazena*/
const form = document.getElementById("form");
const disciplina = document.getElementById("disciplina");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

/*Impede o comportamento padrão do formulário ao ser enviado e 
chama a função de checagem de erros do form*/
form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkForm();
});

/*Faz com que uma função de verificação seja chamado quando o campo
 perde o foco */

disciplina.addEventListener("blur", () => {
    checkInputDisciplina();
})

username.addEventListener("blur", () => {
    checkInputUsername();
})
email.addEventListener("blur", () => {
    checkInputEmail();
})
password.addEventListener("blur", () => {
    checkInputPassword();
})
passwordConfirmation.addEventListener("blur", () => {
    checkInputPasswordConfirmation();
})

function checkInputDisciplina() {
    const disciplinaValue = disciplina.value;

    if (disciplinaValue === "") {
        errorInput(disciplina, "O nome da disciplina é obrigatório!")
    }else{
        const formItem = disciplina.parentElement;
        formItem.className = "form-content";
    }

};



/*Checa se o nome do usuário foi preenchido*/
function checkInputUsername() {
    const usernameValue = username.value;

    if (usernameValue === "") {
        errorInput(username, "O nome de usuário é obrigatório!");

    } else {
        const formItem = username.parentElement;
        formItem.className = "form-content";
    }

};

/*Checa se o email foi preenchido*/
function checkInputEmail() {
    const emailValue = email.value;

    if (emailValue === "") {
        errorInput(email, "O email é obrigatório!");

    } else {
        const formItem = email.parentElement;
        formItem.className = "form-content";

    }
};

/*Checagem de erros na senha*/
function checkInputPassword() {
    const passwordValue = password.value;

    if (passwordValue === "") {
        errorInput(password, "A senha é obrigatória!");

    } else if (passwordValue.length < 8) {
        errorInput(password, "A senha precisa ter no mínimo 8 caracteres.");
    } else {
        const formItem = password.parentElement;
        formItem.className = "form-content";
    }

};

/*Checagem de erros na confirmação da senha*/
function checkInputPasswordConfirmation() {
    const passwordValue = password.value;
    const confirmationPasswordValue = passwordConfirmation.value;

    if (confirmationPasswordValue === "") {
        errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.");

    } else if (confirmationPasswordValue !== passwordValue) {
        errorInput(passwordConfirmation, "Senha inválida");
    } else {
        const formItem = passwordConfirmation.parentElement;
        formItem.className = "form-content";
    }

};

/*Checagem de erros no preenchimento do formulário */
function checkForm() {
    checkInputDisciplina();
    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputPasswordConfirmation();

    const formItens = form.querySelectorAll(".form-content");

    const isValid = [...formItens].every((item) => {
        return item.className === "form-content";
    })

    if (isValid) {
        alert("Login concluído com sucesso!")
    } else {
        alert("Preencha todos os campos corretamente.")
    }

}

/*Exibe uma mensagem de erro na âncora <a> e permite dar estilo a ela 
por meio da classe error aplicada*/
function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");

    textMessage.innerText = message;
    formItem.className = "form-content error";
};