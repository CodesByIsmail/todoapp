const addBtn = document.querySelector('button')
const allChecks =  document.querySelectorAll('input[type="checkbox"]')

const allTask = document.querySelectorAll('p')
const todo = document.querySelectorAll('.todo')

const newTaskInput = document.querySelector('.new__task')

const deleteOverlay = document.querySelector('.delete__overlay')
const deleteEnquiry = document.querySelector('.delete__enquiry')
const deleteEnquiryInputs = document.querySelectorAll('input[type="submit"]')

let todoContainer  =document.querySelector('.todos')


// todo.forEach(todo => {
//     const checkbtn = todo.querySelector('input')
//     console.log(checkbtn)
// });


const todoApp = function(){
   const allTasks = [];

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
        // create new div element with new task
        const div  = document.createElement('div')
      

        div.innerHTML = `
                    <div class="todo">
                        <input type="checkbox" name="" id="checkbox">
                        <p class="task">${newTaskObj.task}</p>
                    </div>
                
                    <div class="">
                    <i class="uil uil-edit-alt"></i>
                        <i class="uil uil-trash-alt delete"></i>
                        </div>
                </div>
        `

            
        div.className = 'todo__subwrapper' // add 'todo' class to div created
        todoContainer.prepend(div)

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

       createNewTask(newTaskObj)


        const deleteBtn = document.querySelector('.delete')
            deleteBtn.addEventListener('click', function(e){
                const elToDelete = e.target.closest('.todo__subwrapper')
                console.log('delete', elToDelete)

                setTimeout(function(){
                    deleteOverlay.style.display = 'block';

deleteEnquiry.style.opacity = '1'
deleteEnquiry.style.transform = 'translate(-50%, -50%)'



deleteEnquiryInputs.forEach(deleteb => {
    
    deleteb.addEventListener('click', function(){
        let ask = deleteb.value;
        ask = ask.toLowerCase();
        
        if(ask === 'yes') {
            elToDelete.style.transform = 'translateX(100%)'
        elToDelete.style.opacity = 0
            setTimeout(function(){
                elToDelete.style.display = 'none'
                deleteOverlay.style.display = 'none';

            }, 200)
        }
        if(ask === 'no') {
            deleteOverlay.style.display = 'none';

        }
    
        console.log(deleteb)
    })

  
                    })


                }, 100)



            })

        // console.log(check);
    }

    addBtn.addEventListener('click', function(e){
        e.preventDefault()
        if(!newTaskInput.value.trim()) return
        getNewTask()
        newTaskInput.value = ''
        newTaskInput.focus()


    })

   
}

todoApp()


// what i just learned:
// 1. if user is adding an new element to the dom, if the element needs interaction, you will have to add it after creatioonkbo