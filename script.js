const addBtn = document.querySelector('button')
const allChecks =  document.querySelectorAll('input[type="checkbox"]')

const newTaskForm = document.querySelector('.todo__task__form')

const allTask = document.querySelectorAll('p')
const todo = document.querySelectorAll('.todo')

const newTaskInput = document.querySelector('.new__task')

const deleteOverlay = document.querySelector('.delete__overlay')
const deleteEnquiry = document.querySelector('.delete__enquiry')
const deleteEnquiryInputs = document.querySelectorAll('input[type="submit"]')


const editOverlay = document.querySelector('.edit__overlay')
const editForm = document.querySelector('.edit__form')
const editInput = document.querySelector('.edit__input')

let todoContainer  = document.querySelector('.todos')
const completedContainer = document.querySelector('.completed__tasks')

// todo.forEach(todo => {
//     const checkbtn = todo.querySelector('input')
//     console.log(checkbtn)
// });

const allTasks = [];     
let allCompletedTasks = [];

const todoApp = function(){
newTaskInput.focus()

    const done = function(task){
        task.classList.toggle('checked')
        // Get closest task to the checkbox
        console.log(task.getAttribute('class'))
        
        // task.className.has('checked')
    }
    
    const numOfCheckedTask = function(){
        const totalTask = allTasks.length;
        const totalCompleted = allCompletedTasks.length;
        
        const numTaskCompleted = document.querySelector('.num__task__completed')
        numTaskCompleted.textContent = `${totalCompleted} / ${totalTask}`
    }

    const getClosestTask = function(check){
        return task = check.closest('.todo').querySelector('p')
    }

    

    const todoDone = function(checkbox){
            // Get task closest to the clicked checbox
            getClosestTask(checkbox)

            // Add 'checked' class to the clicked task
            done(task)

            // Increase the number of checked class
    }

    const createNewTask = function(container, newTaskObj, className){
        // create new div element with new task
        const div  = document.createElement('div');
        div.innerHTML =
         `
                    <div class="todo">
                        <input type="checkbox" id"checkbox">
                        <p class="task">${newTaskObj.task}</p>
                    </div>
                    
                    <div class="task__icons">
                    <i class="uil uil-edit-alt edit"></i>
                        <i class="uil uil-trash-alt delete"></i>
                        </div>
                </div>
        `;
            
        div.classList.add(className) // add 'todo' class to div created
        // div.dataset('id') = newTaskObj.id
        // div.dataset('id') = newTaskObj.id
        div.setAttribute('data-id', newTaskObj.id)
        container.prepend(div)


    // todoContainer.innerHTML 

        // allTasks.push(newTaskObj);
        console.log(allTasks, 'here');  

        clickCheckBtn(div) // receives the newly created div to get input checbox isnside it and make it effective
        

        console.log(todoContainer.querySelector('.todo__subwrapper'));
        trimTask(div)
        return div;
    }

    const clickCheckBtn = function(div){
        const checkBox = div.querySelector('input'); // Get the input checkbox inside the just created div

        // Add task when check input changes
        checkBox.addEventListener('change', function(){
            todoDone(checkBox) // call function to check the task done
            
        const checkedTaskId = div.getAttribute('data-id')
        const checkedTaskObj = allTasks.find(task => +checkedTaskId === task.id)
        let curTaskStatus = checkedTaskObj.completed;
        checkedTaskObj.completed = !curTaskStatus;
        setTimeout(()=>{
            div.remove()
        }, 300)
        console.log(checkedTaskObj)
        console.log(checkedTaskId)
            addTaskToCompleted(checkedTaskObj);
numOfCheckedTask(); 
            // numOfCheckedTask(allTask)
        })
    }

    const addTaskToCompleted = function(checkedTask){
        
        allCompletedTasks = allTasks.filter(task => task.completed === true);
        console.log(allCompletedTasks, 'ALL COMPLETED TASKS')

        // createNewTask(completedContainer, checkedTask, 'todo__subwrapper__checked').querySelector('input').remove()
        const checkedTaskDiv = createNewTask(completedContainer, checkedTask, 'todo__subwrapper__checked')
        checkedTaskDiv.querySelector('input').remove()
        checkedTaskDiv.querySelector('.task__icons').innerHTML = '<i class="uil uil-check-circle"></i>'
        checkedTaskDiv.querySelector('.task').classList.add('checked')

        // allCompletedTasks.forEach(task => {
        //     createNewTask(completedContainer, task, 'todo__subwrapper__checked').querySelector('input').remove()
        // })        
    }

    const getNewTask = function(){
        let newTaskObj = {};

        // create new task from new task input
        newTaskObj.task = newTaskInput.value;
        newTaskObj.id = +((Date.now() + '').slice(-10))
        newTaskObj.completed = false;
        allTasks.push(newTaskObj);

       createNewTask(todoContainer, newTaskObj, 'todo__subwrapper');
        const taskIcons = document.querySelector('.task__icons')
        taskIcons.addEventListener('click', function(e){

            if(e.target.className.split(' ').includes('edit')){
                editTask(e)
            }

            if(e.target.className.split(' ').includes('delete')){
                deleteTask(e)
            }
        })
    }


    const editTask = function(e){
        // const taskToEdit = e.target.parentElement.parentElement.querySelector('.task') // element to edit
        let elToEdit = e.target.parentElement.parentElement
        
        const taskToEdit = allTasks.find(task => task.id === Number(elToEdit.getAttribute('data-id')))
        
        editOverlay.style.display = 'block';
        editInput.focus();
        
        editForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            taskToEdit.task = editInput.value;
            let curTaskEdit = elToEdit.querySelector('.task');
            console.log(curTaskEdit, 'hifojflkjsdfhadslfjalidfjadsfjkkljfgslkgf')
            curTaskEdit.textContent = taskToEdit.task
            editOverlay.style.display = 'none';
            console.log(elToEdit)
            elToEdit = ''
            console.log(elToEdit)
            editInput.value = ''
        })
    }
    

    const deleteTask = function(e){
        let elToDelete = e.target.closest('.todo__subwrapper')
        console.log('delete', elToDelete)

        setTimeout(function(){

            deleteOverlay.style.display = 'block';

            deleteEnquiry.style.opacity = 1
            deleteEnquiry.style.transform = 'translate(-50%, -50%)';


            deleteEnquiryInputs.forEach(delSubmit => {
                delSubmit.addEventListener('click', function(){
                    let ask = delSubmit.value;
                    ask = ask.toLowerCase();
    
                    if(ask === 'yes') {
                        elToDelete.style.transform = 'translateX(100%)'
                        elToDelete.style.opacity = 0;
                        const taskIdToDelete = +(elToDelete.getAttribute('data-id'))
                        const indexOfDeletedElement = allTasks.findIndex(curTask => curTask.id === taskIdToDelete)
                        console.log(indexOfDeletedElement)
                        allTasks.splice(indexOfDeletedElement, 1)
                        setTimeout(function(){
                            elToDelete.style.display = 'none'
                            deleteOverlay.style.display = 'none';

                        }, 200)
                    };

                    if(ask === 'no') {
                        deleteOverlay.style.display = 'none';
                        elToDelete = ''
                        return
                    };
                })
                    
            })

        }, 100)
        
    }

    function trimTask (div){
        const taskWord = div.querySelector('.task')
        let taskWordLength = taskWord.textContent.length;
        console.log(taskWordLength, 'hdfkafdkhakfhasdfhkajsdjhfkjadh')
        const maxLength = 10;
        if (taskWordLength > maxLength) {
            taskWord.textContent = `${taskWord.textContent.slice(0, maxLength)}...`
        }
    }

    newTaskForm.addEventListener('submit', function(e){
        e.preventDefault()
        if(!newTaskInput.value.trim()) return
        getNewTask()
        newTaskInput.value = ''
        newTaskInput.focus()
        numOfCheckedTask();
    })
}

todoApp()


// what i just learned:
// 1. if user is adding an new element to the dom, if the element needs interaction, you will have to add it after creation
