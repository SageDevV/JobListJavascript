function main() {
    const inputJob = document.querySelector('.input-nova-tarefa');
    const btnJob = document.querySelector('.btn-add-tarefa');
    const joblist = document.querySelector('.tarefas');

    function createClearButton(li) {
        li.innerText += ' ';
        const buttonHtml = document.createElement('button');
        buttonHtml.innerText = 'Apagar';
        buttonHtml.classList.add('apagar');
        li.appendChild(buttonHtml);
    }

    function createliHtml() {
        const liHtml = document.createElement('li');
        return liHtml;
    }

    function saveJobs(){
        const jobs = joblist.querySelectorAll('li');
        const jobsArray = [];
        for (let job of jobs){
            let jobText = job.innerText.replace('Apagar', '').trim();
            jobsArray.push(jobText);
        }
        const jobsJSON = JSON.stringify(jobsArray);
        localStorage.setItem('tarefas', jobsJSON);
        console.log(jobsArray);
    }
    function createJob(textInput) {
        const liHtml = createliHtml();
        liHtml.innerText = textInput;
        joblist.appendChild(liHtml);
        cleanInput();
        createClearButton(liHtml);
    }
    function cleanInput() {
        inputJob.value = '';
        inputJob.focus();
    }

    inputJob.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            if (!inputJob.value) {
                return;
            }
            createJob(inputJob.value);
            saveJobs();
        }
    });

    btnJob.addEventListener('click', function () {
        if (!inputJob.value) {
            return;
        }
        createJob(inputJob.value);
        saveJobs();
    });

    document.addEventListener('click', function(e){
        const targetHtml = e.target;
        if(targetHtml.classList.contains('apagar')){
            targetHtml.parentElement.remove();
        };
    });
}
main();