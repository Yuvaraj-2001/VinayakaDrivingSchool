var firebaseConfig = {
    apiKey: "AIzaSyBfzVWTUubovptlLNu7tbEkP8Rnt21sceA",
    authDomain: "angular-5b97d.firebaseapp.com",
    databaseURL: "https://angular-5b97d-default-rtdb.firebaseio.com",
    projectId: "angular-5b97d",
    storageBucket: "angular-5b97d.appspot.com",
    messagingSenderId: "72718290592",
    appId: "1:72718290592:web:cd50fdb5cbd9ad7b1243c5",
    measurementId: "G-3JHEZ9PC5Y"
  };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
  function sending(){
    if(document.getElementById("applicant").value == "" ){
        alert("Enter applicant name");
        return
    }
    if(document.getElementById("pay").value == "" ){
        alert("Enter payment amount");
        return
    }
    if(document.getElementById("token").value == "" ){
        alert("Enter token ");
        return
    }
    var applicant = document.getElementById("applicant").value;
    var pay = document.getElementById("pay").value;
    var token = document.getElementById("token").value;
    // console.log(applicant, pay, token, )
    sent(applicant, pay, token);
}

function sent(applicant, pay, token){
    debugger
    var register = {
        aplicant: applicant,
        payment: pay,
        token: token,
        status: "Registered"
    }
    let db = firebase.firestore().collection("VinayakaDL/");
    db.add(register).then(()=>{
      Swal.fire({
        imageUrl: 'catadd.jpg',
        title: 'Appplicant added',
        imageHeight: 300,
        imageAlt: 'Cat image',
        footer: '<a href="applicants.html">Added, Go to all aplicant</a>'
      })
  });
    document.getElementById("applicant").value = "";
    document.getElementById("pay").value = ""
    document.getElementById("token").value = "" 
    document.getElementById("added-alert").style.display = "block";
}

function read(){
    document.getElementById("loader").style.display = "block";
    firebase.firestore().collection("VinayakaDL").onSnapshot(function(snapshot){
        document.getElementById("card-sec").innerHTML="";
        snapshot.forEach(function(taskValue){
            document.getElementById("card-sec").innerHTML +=`
          <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${taskValue.data().aplicant}</h5>
                <p class="card-test">${taskValue.data().payment}</p>
                <p class="card-test">${taskValue.data().token}</p>
                <p class="card-test float-right">${taskValue.data().status}</p>
                <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(
                    '${taskValue.id}','${taskValue.data().aplicant}', '${taskValue.data().payment}', '${taskValue.data().token}', '${taskValue.data().status}'
                )">Edit Task</button>
                <button type="submit" class="btn btn-danger" onclick="deleteTask('${taskValue.id}')">
                delete</button>
            </div>
           </div>`
        });
        document.getElementById("loader").style.display = "none";
    });
}

function updateTask(id, aplicant, payment, token, status){
    debugger
   document.getElementById("formsection").style.display = "block";
   document.getElementById("cardSection").style.display = "none";
   document.getElementById("token-no").innerHTML = token ;
   document.getElementById("applicant-edit").value = aplicant;
   document.getElementById("payment-edit").value = payment;
   document.getElementById("unique").value = id;
   var mySelect = document.getElementById('move');

    for(var i, j = 0; i = mySelect.options[j]; j++) {
        if(i.value == status) {
            mySelect.selectedIndex = j;
            break;
        }
}

}
function updateNow(){
    var token = document.getElementById("token-no").innerHTML;
    var application =  document.getElementById("applicant-edit").value;
    var payment = document.getElementById("payment-edit").value;
    var id = document.getElementById("unique").value;
    var status = document.getElementById('move').value;
    debugger
    var taskUpdated = {
        aplicant: application,
        payment: payment,
        token: token,
        status: status
    }
    let db = firebase.firestore().collection("VinayakaDL").doc(id);
    db.set(taskUpdated).then(()=>{
        swal.fire(
            'Good',
            'Task Updated',
            'Success'
        )
    })
    document.getElementById("formsection").style.display = "none";
    document.getElementById("cardSection").style.display = "block";
    debugger
    admin();showReg();

    
}
function admin(){
   document.getElementById("loader").style.display = "block";
    firebase.firestore().collection("VinayakaDL").onSnapshot(function(snapshot){
        var mode = [];
        snapshot.forEach(function(taskValue){
            var switchmode = {
                id: taskValue.id,
                aplicant: taskValue.data().aplicant,
                payment: taskValue.data().payment,
                token: taskValue.data().token,
                status: taskValue.data().status
            }
            mode.push(switchmode);
            console.log("3")
        })
        console.log(mode)
        debugger
        var registered = [];
        var llissue = [];
        var dlissue = [];
        for(i=0; i < mode.length; i++){
            if(mode[i].status == "LL issued"){
                llissue.push(mode[i]);
            }else if(mode[i].status == "Registered"){
                registered.push(mode[i]); 
            }else{
                dlissue.push(mode[i]); 
            }
        }
        document.getElementById("reg").innerHTML = "";
        for(i=0; i < registered.length; i++){
        document.getElementById("reg").innerHTML +=`
          <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Applicant name : ${registered[i].aplicant}</h5>
                <p class="card-test">Paid amount : ${registered[i].payment}</p>
                <p class="card-test">Token no : ${registered[i].token}</p>
                <p class="card-test blue float-right">Status : ${registered[i].status}</p>
                <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(
                    '${registered[i].id}','${registered[i].aplicant}', '${registered[i].payment}', '${registered[i].token}', '${registered[i].status}'
                )">Edit Task</button>
                <button type="submit" class="btn btn-danger" onclick="deleteTask('${registered[i].id}')">
                delete</button>
            </div>
           </div>`;
        }
        document.getElementById("ll").innerHTML = "";
        for(i=0; i < llissue.length; i++){
            document.getElementById("ll").innerHTML +=`
              <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">Applicant name : ${llissue[i].aplicant}</h5>
                    <p class="card-test">Paid amount : ${llissue[i].payment}</p>
                    <p class="card-test">Token no : ${llissue[i].token}</p>
                    <p class="card-test green float-right">Status : ${llissue[i].status}</p>
                    <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(
                        '${llissue[i].id}','${llissue[i].aplicant}', '${llissue[i].payment}', '${llissue[i].token}', '${llissue[i].status}'
                    )">Edit Task</button>
                    <button type="submit" class="btn btn-danger" onclick="deleteTask('${llissue[i].id}')">
                    delete</button>
                </div>
               </div>`;
            }
        document.getElementById("dl").innerHTML = "";
        for(i=0; i < dlissue.length; i++){
            document.getElementById("dl").innerHTML +=`
                <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${dlissue[i].aplicant}</h5>
                    <p class="card-test">${dlissue[i].payment}</p>
                    <p class="card-test">${dlissue[i].token}</p>
                    <p class="card-test red float-right">${dlissue[i].status}</p>
                    <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(
                        '${dlissue[i].id}','${dlissue[i].aplicant}', '${dlissue[i].payment}', '${dlissue[i].token}', '${dlissue[i].status}'
                    )">Edit Task</button>
                    <button type="submit" class="btn btn-danger" onclick="deleteTask('${dlissue[i].id}')">
                    delete</button>
                </div>
                </div>`;
        }
        document.getElementById("loader").style.display = "none";
    })
}
function showReg(){
    
    document.getElementById("reg").style.display = "block";
    document.getElementById("ll").style.display = "none";
    document.getElementById("dl").style.display = "none";
    document.getElementsByClassName('label-primary')[0].style.padding = "5px 10px 30px 10px";
    document.getElementsByClassName('label-info')[0].style.padding = "5px 10px 5px 10px";
    document.getElementsByClassName('label-success')[0].style.padding = "5px 10px 5px 10px";
    document.getElementsByClassName('well')[0].style.background = "blue";
}
function showLl(){
    document.getElementById("ll").style.display = "block";
    document.getElementById("reg").style.display = "none";
    document.getElementById("dl").style.display = "none";
    document.getElementsByClassName('label-info')[0].style.padding = "5px 10px 30px 10px";
    document.getElementsByClassName('label-primary')[0].style.padding = "5px 10px 5px 10px";
    document.getElementsByClassName('label-success')[0].style.padding = "5px 10px 5px 10px";
    document.getElementsByClassName('well')[0].style.background = "blueviolet";
}
function showDl(){
    document.getElementById("dl").style.display = "block";
    document.getElementById("ll").style.display = "none";
    document.getElementById("reg").style.display = "none";
    document.getElementsByClassName('label-success')[0].style.padding = "5px 10px 30px 10px";
    document.getElementsByClassName('label-info')[0].style.padding = "5px 10px 5px 10px";
    document.getElementsByClassName('label-primary')[0].style.padding = "5px 10px 5px 10px";
    document.getElementsByClassName('well')[0].style.background = "green";
}

function adminGoback(){
    document.getElementById("formsection").style.display = "none";
    document.getElementById("cardSection").style.display = "block";
}
function deleteTask(id){
    firebase.firestore().collection("VinayakaDL").doc(id).delete().then(()=>{
        swal.fire({
        imageUrl: 'catrem.jpg',
        title: 'Candidate Removed',
        imageHeight: 200,
        imageAlt: 'Cat image',
        })
        
    })
}
function validateIndex(){
    
}
function appGoBack(){
    document.getElementById("formsection").style.display = "none";
    document.getElementById("cardSection").style.display = "block"; 
}