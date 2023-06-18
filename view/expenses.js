


const prevDateBtn = document.getElementById('prevDateBtn');
    const nextDateBtn = document.getElementById('nextDateBtn');
    const dateDisplay = document.getElementById('dateDisplay');

    const prevMonth = document.getElementById('prevMonthBtn');
    const nextMonth = document.getElementById('nextMonthBtn');
    const monthDisplay = document.getElementById('monthDisplay');
    
     
    // Define the current date
    let currentDate = new Date();

    function printCurrentDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = currentDate.toLocaleDateString(undefined, options);

      }
      printCurrentDate();

    // Function to update the date display
   async function updateDateDisplay() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateDisplay.textContent = currentDate.toLocaleDateString(undefined, options);
      const token = localStorage.getItem('token')

      await axios.get('http://localhost:3000/data', {headers: {"Authorisation": token}, params: {date: currentDate.toISOString()}}).then((response) => {
        
       for(var i=0;i<response.data.newentry.length;i++){
        showOnScreen(response.data.newentry[i])

       }
       
      }).catch((err)=>{
        throw new Error(err);
      }
      )

    }

     

    // Function to navigate to the previous date
    function goToPreviousDate() {
      currentDate.setDate(currentDate.getDate() - 1);
      const firstNode = document.getElementById('list');
      firstNode.innerHTML=''
      updateDateDisplay();
    }

    // Function to navigate to the next date
    function goToNextDate() {
      currentDate.setDate(currentDate.getDate() + 1);
      const firstNode = document.getElementById('list');
      firstNode.innerHTML=''
      updateDateDisplay();
    }

    // Add click event listeners to the buttons
    prevDateBtn.addEventListener('click', goToPreviousDate);
    nextDateBtn.addEventListener('click', goToNextDate);

    prevMonthBtn.addEventListener('click', goToPreviousMonth);
    nextMonthBtn.addEventListener('click', goToNextMonth);

    function showForm(event) {
        try{
            event.preventDefault
            var formContainer = document.getElementById('formContainer');
        formContainer.classList.toggle('hidden');
    }
    catch(error){
        throw new Error(error)
    }
    };

    function showMenu(event) {
        try{
        event.preventDefault()
      var menuContainer = document.getElementById('menuContainer');
      menuContainer.classList.toggle('hidden');
        }
        catch(error){
            throw new Error(error)
        }
    };

    async function addexpense(event){
            try{
                event.preventDefault()
                const token_1= localStorage.getItem('token');
                
                const details={
                    price:event.target.form.cost.value,
                    description: event.target.form.description.value,
                    category: event.target.form.category.value,
                }
                const data = await axios.post('http://localhost:3000/expense', details,{headers: {"Authorisation": token_1}})
                console.log("@#@#@#@##@#@###@#@",data.data.expense);
                    if(data.status===200){
                      showOnScreen(data.data.expense)
                    }
            }
            catch(err){
                console.log(err);
            }
        }

        function showOnScreen(data){
            console.log("###",data.id);
            user = {
                id:'',
                price:'',
                description:'',
                category:''
            }
            document.getElementById('cost').value="";
            document.getElementById('description').value="";
            document.getElementById('category').value="";

      const firstNode = document.getElementById('list');
      const inputData= `<li id=${data.id}> ${data.price} - ${data.description} - ${data.category} ====>
                          <button class="bg-slate-500 border text-red-100 w-36 rounded-xl hover:bg-blue-600 mb-2" onclick="deleteUser('${data.id}', '${data.price}')">Delete user</button>
                             </li>`
       
  firstNode.innerHTML = firstNode.innerHTML + inputData; 
        }

        window.addEventListener('DOMContentLoaded', async()=>{
            const firstNode = document.getElementById('list');
            firstNode.innerHTML= " ";

            const token= localStorage.getItem('token');
            console.log("!!!", currentDate);
           await axios.get("http://localhost:3000/data", {headers: {"Authorisation": token}, params:{date:currentDate}}).then(async(response)=>{
           
            console.log("##################",response.data);
            if(response.data.ispremiumuser=== true){
        
            premiumFeatures();
        }
           // console.log("&777777", response);
           for(var i =0;i<response.data.newentry.length;i++){
           showOnScreen(response.data.newentry[i])
              }

    }).catch(err=>console.log(err))
  })

  async function deleteUser(id, price){
        console.log("******************", price);
        const token = localStorage.getItem('token');
       await axios.delete(`http://localhost:3000/delete/${id}?price=${price}`, {headers: {"Authorisation": token}})
          removeuserfromScreen(id);

    }

    function removeuserfromScreen(listid){
       // console.log(,listid);
        const list= document.getElementById('list');
        const deletelist = document.getElementById(listid);
        console.log("~~~~~~~~~~~~~~~~~~~~", deletelist);
            list.removeChild(deletelist)
    }


    document.getElementById('premium').onclick = async function(e){
    const token = localStorage.getItem('token')
    console.log("%^%%^", token)
    //const response = await axios.get('http://localhost:3000/purchasepremiumship');
                                                            

   const response = await axios.get('http://localhost:3000/purchase/purchasepremiumship', {headers: {"Authorisation": token}});
    console.log(response);
    var options= {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function(response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },{headers: {"Authorisation": token} })
          
           // alert('You are a premium user now')
            premiumFeatures();
           

           
        }
    }
    const rzrpay1 = new Razorpay(options);
    rzrpay1.open();
    e.preventDefault()

    rzrpay1.on('payment.failed', async function(response){
        await axios.post('http://localhost:3000/purchase/updatefailedtransaction',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },{headers: {"Authorisation": token} })
       alert('something went wrong')

    });

}
     

function monthlyexpenses(event){

    const divElement = document.getElementById('monthlyexpenses')
    divElement.style.display = 'flex';
    var dailyexpenses = document.getElementById('dailyExpenses');
    dailyexpenses .classList.add('hidden');
    var menuContainer = document.getElementById('menuContainer');
    menuContainer.classList.add('hidden');

   

    const options = { year: 'numeric', month: 'long' };
    monthDisplay.textContent = currentDate.toLocaleDateString(undefined, options);

    console.log(monthDisplay.textContent);


}


function goToPreviousMonth(){
    const currentMonth = currentDate.getMonth();

    currentDate.setMonth(currentDate.getMonth() - 1);
    const firstNode = document.getElementById('list');
    firstNode.innerHTML=''
    updateMonth()


}

function goToNextMonth(){
    const currentMonth = currentDate.getMonth();

    currentDate.setMonth(currentDate.getMonth() + 1);
    const firstNode = document.getElementById('list');
    firstNode.innerHTML=''
    updateMonth()


}
async function updateMonth(){
    const options = { year: 'numeric', month: 'long' };
    monthDisplay.textContent = currentDate.toLocaleDateString(undefined, options);

    const options1 = { year: 'numeric', month: 'numeric' };
    var test = monthDisplay.textContent
    test = currentDate.toLocaleDateString(undefined, options1);
    console.log("month val",test);
    const token = localStorage.getItem('token');

    await axios.get('http://localhost:3000/monthlydata', {headers: {"Authorisation": token}, params: {month: test}}).then((response) => {
        

    console.log("response of request", response);
    //    for(var i=0;i<response.data.newentry.length;i++){
    //     showOnScreen(response.data.newentry[i])

    //    }
       
      }).catch((err)=>{
        throw new Error(err);
      }
      )

}

   function premiumFeatures(){
   // e.preventDefault()
    const token = localStorage.getItem('token');
        const userbar = document.getElementById('premium');
        const premButton = document.getElementById('SubmitButton');
            const span = document.createElement('span');
            span.style.color = 'black';
            const premium = document.createTextNode('You are a premium User');
            span.append(premium);
            userbar.parentNode.replaceChild(span,userbar)

            const btn = document.createElement('button');
            btn.className = 'bg-slate-500 text-red-100 w-30 rounded-xl hover:bg-blue-600 mr-2';
            btn.id = 'leaderboard';

            const text = document.createTextNode('ShowLeaderboard');
            btn.appendChild(text);

            //premButton.innerHTML= '';
            premButton.appendChild(btn);
            // //userbar.appendChild(btn);

            const downloadButton = document.getElementById('download-button');
            downloadButton.removeAttribute('disabled');

            document.getElementById('leaderboard').onclick = async function(e){
                e.preventDefault()

                const response = await axios.get('http://localhost:3000/purchase/premiumuserdata', {headers: {"Authorisation": token}});
                console.log("hello daarlingssss", response);
                const firstNode = document.getElementById('leaders');
                
               const heading = document.createElement('div');
               heading.textContent= "Expenses Leaderboard";
               heading.style.fontWeight= "bold"
              
                

                for(var i=0;i<response.data.entry.length;i++){
                    if(i==0){
                        
                        firstNode.append(heading)
                    }
                   
      const inputData= `<li id=${response.data.entry[i].id}> ${response.data.entry[i].name} - ${response.data.entry[i].total_price}  </li>`
    
  firstNode.innerHTML = firstNode.innerHTML + inputData; 

  
                }
                console.log("helloooo ");
            }

   }

  async function download(event){
    const token = localStorage.getItem('token')
    //console.log("@#@#@#@#",token)
    await axios.get('http://localhost:3000/premiumfeatures/download', { headers: {"Authorisation" : token}})
    .then(async (response)=>{
        if(response.status===200){
            var a= document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpenses.csv';
            a.click();
            await axios.get('http://localhost:3000/premiumfeatures/getData', {headers : {"Authorisation": token}})
            .then((response)=>{
                console.log("&*&*&*&*", response.data.newentry[0]);
                showOnScreen(response.data.newentry[0].fileUrl)

            })
            
        }else{
            throw new Error(response.data.message)
        }
    
    })
    .catch((err)=>{
        throw new Error(err);
    })
   }

