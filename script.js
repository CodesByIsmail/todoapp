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

let todoContainer  =document.querySelector('.todos')


// todo.forEach(todo => {
//     const checkbtn = todo.querySelector('input')
//     console.log(checkbtn)
// });

const allTasks = [];     

const todoApp = function(){
newTaskInput.focus()

    const done = function(task){
        task.classList.toggle('checked')
         // Get closest task to the checkbox
        console.log(task.getAttribute('class'))

         // task.className.has('checked')
    }

    const numOfCheckedTask = function(tasks){
        tasks = Array.from(tasks)
        const checkedTasks = tasks.filter(task => {
            // [...task.getAttribute('class')].includes('checked')
            task.hasAttribute('class')
        })
        console.log(checkedTasks)
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

    const createNewTask = function(newTaskObj){
        const html = `
        <!-- <div class="todo__subwrapper" data-id="${newTaskObj.id}">
        <div class="todo">
              <input type="checkbox" name="" id="checkbox">
              <p class="task">${newTaskObj.task}</p>
          </div>
      
          <div class="">
          <i class="uil uil-edit-alt"></i>
              <i class="uil uil-trash-alt delete"></i>
              </div> 
      </div> -->
        `


        // create new div element with new task
        const div  = document.createElement('div');
      div.innerHTML =
         `
                    <div class="todo">
                        <input type="checkbox" name="" id"checkbox">
                        <p class="task">${newTaskObj.task}</p>
                    </div>
                    
                    <div class="task__icons">
                    <i class="uil uil-edit-alt edit"></i>
                        <i class="uil uil-trash-alt delete"></i>
                        </div>
                </div>
        `;
            
        div.className = 'todo__subwrapper' // add 'todo' class to div created
        // div.dataset('id') = newTaskObj.id
        // div.dataset('id') = newTaskObj.id
        div.setAttribute('data-id', newTaskObj.id)
        todoContainer.prepend(div)


    // todoContainer.innerHTML 

        allTasks.push(newTaskObj);
        console.log(allTasks, 'here');  

        clickCheckBtn(div) // receives the newly created div to get input checbox isnside it and make it effective
        

        console.log(todoContainer.querySelector('.todo__subwrapper'))  
    }

    const clickCheckBtn = function(div){
        const check = div.querySelector('input'); // Get the input checkbox inside the just created div

        // Add task when check input changes
        check.addEventListener('change', function(){
            todoDone(check) // call function to check the task done
            numOfCheckedTask(allTask)
        })
    }

    const getNewTask = function(){
        let newTaskObj = {};

        // create new task from new task input
        newTaskObj.task = newTaskInput.value;
        newTaskObj.id = +((Date.now() + '').slice(-10))

       createNewTask(newTaskObj);
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
        const elToEdit = e.target.parentElement.parentElement
allTasks.forEach(task => {
    console.log(task.id)
})
        const taskToEdit = allTasks.find(task => task.id === Number(elToEdit.getAttribute('data-id')))
        // console.log(task.id, Number(elToEdit.getAttribute('data-id')))
        console.log(taskToEdit, Number(elToEdit.getAttribute('data-id')))

        
        editOverlay.style.display = 'block';
        editInput.focus();
        
        editForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            taskToEdit.task = editInput.value;
            const curTaskEdit = elToEdit.querySelector('.task');
            console.log(curTaskEdit, 'hifojflkjsdfhadslfjalidfjadsfjkkljfgslkgf')
            curTaskEdit.textContent = taskToEdit.task
            editInput.value = ''
            editOverlay.style.display = 'none';
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
                            console.log(elToDelete.id)

                            const indexOfDeletedElement = allTasks.find(curTask => {
                                // elToDelete.dataset('id') = curTask.id
                                console.log(curTask)
                                console.log(+curTask.id, +elToDelete.id, allTasks)

                            })
                            console.log(indexOfDeletedElement)
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
        
    };

    newTaskForm.addEventListener('submit', function(e){
        e.preventDefault()
        if(!newTaskInput.value.trim()) return
        getNewTask()
        newTaskInput.value = ''
        newTaskInput.focus()
    });
}

todoApp()


// what i just learned:
// 1. if user is adding an new element to the dom, if the element needs interaction, you will have to add it after creation

