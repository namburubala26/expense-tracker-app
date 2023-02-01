function btnClicked(e){
    e.preventDefault()
    async function postingData (){
        try{
            const fromData = await axios.post('http://localhost:3000/post',{
                expenseamount:document.getElementById('expenseamount').value,
                description:document.getElementById('description').value,
                category:document.getElementById('category').value
        })
        console.log(`logging here --> `,fromData.config.data)
        showExpenseList(fromData.config.data)

    }      
        catch(err){
            console.log(err)
        }     
    }
    postingData()
}

function showExpenseList(data) {
    console.log(data)
	// creating li to display on the UI
	const li = document.createElement("li")
    const br = document.createElement("BR")
	li.id = `${data.id}`
	li.appendChild(document.createTextNode(`${data.expenseamount}- ${data.description}- ${data.category}    `))
	itemList.appendChild(li)
    itemList.appendChild(br)
    

    let delBtn = document.createElement("button")
	delBtn.id = "delete";
	delBtn.appendChild(document.createTextNode("delete"));
	delBtn.onclick = function () {
		deleteUser(data.id)
	};
	li.appendChild(delBtn)
	itemList.appendChild(li)

    // creating edit button
	let editbtn = document.createElement("button");
	editbtn.id = "edit"
	editbtn.appendChild(document.createTextNode("edit"));
	editbtn.onclick = function () {
		editUser(data.expenseamount,data.description,data.category,data.id)
	};
	li.appendChild(editbtn)
    itemList.appendChild(li)
}

async function deleteUser(userID) {
    try{
        await axios.delete(`http://localhost:3000/delData/${userID}`)
        removeUser(userID)
        }catch(err){
			console.log(err);
		};		
}

async function editUser(expenseamount,description,category,dataId){

    try{
        document.getElementById("expenseamount").value = expenseamount
	    document.getElementById("description").value = description
	    document.getElementById("category").value = category
        await removeUser(dataId)
        let btn = document.createElement("button")
        btn.id='update'
        btn.innerHTML = "Update Details"  
        document.body.appendChild(btn)
        await updateDetails(dataId)
        
    }
    catch(err){
        console.log(err);
    };	
}

async function updateDetails(dataId){
    try{
        console.log(`logging at update details --> ${dataId}`)
        document.getElementById("update").addEventListener("click", updateFunc)
        async function updateFunc() {
        console.log('inside update func')   
        
        await axios.put(
            `http://localhost:3000/editData/${dataId}`,
            {
                expenseamount:document.getElementById("expenseamount").value,
                description : document.getElementById("description").value,
                category : document.getElementById("category").value,
            }
        ) 
          await document.getElementById("update").remove()
          location.reload()
    }
          
        
    }
    catch(err){
        console.log(err)
    }
}

function removeUser(userID) {
	let ul = document.getElementById("itemList");
	let li = document.getElementById(userID);
	return ul.removeChild(li);
}

window.addEventListener("DOMContentLoaded", async function(){
    try{
        const onDomLoad = await axios.get("http://localhost:3000/getData")
        console.log(onDomLoad.data.fullData)
        data = onDomLoad.data.fullData
        for (let i = 0; i < data.length; i++) {
            showExpenseList(data[i]);
    }
    }catch(err){
        console.log(err);
    }
})
