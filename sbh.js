







var chats;               // it store all chats

var chat_count;          // for chat counting
          
var req_count=[];           // req count is also used for res count
var active_chat=-1;                 // flag fow knowing active chat

  //chats=[];
   // chat_count=-1;


window.onload=function(){

    history_list_bar.innerHTML='';                  // onlode the history list bar is empty

   get_all_chats();

    new_chat();

    document.getElementById('cammand_input').addEventListener('keydown',function(e){if(!e.shiftKey && e.key=='Enter'){send()}});
}



// for getting old chats if availble
function get_all_chats(){
try{
const c=localStorage.getItem("sbh_chats")
     chats=JSON.parse(c);

    chat_count=chats.length-1;

    for(let i=0;i<chats.length;i++){
        req_count[i]=chats[i].reqs.length-1;
        save_history(i);

  }
}
catch(e){
    chats=[];
    chat_count=-1;

}

}


function save_chats(){
    localStorage.setItem("sbh_chats",JSON.stringify(chats));
}




function clear_history(){
    localStorage.clear();
     history_list_bar.innerHTML="";
    chats=[];
    req_count=[];
    chat_count=-1;
    new_chat();  
}



function new_chat(){


 //  to clean the chat page 
 chat_page.innerHTML="";
 cammand_input.value="";

    if(chat_count!=-1&&chats[chat_count].reqs[0]==null)return;          // if there is new chat is empty then no new chat will create

   
    // increase the chat count
    chat_count++;

    // for storing  chat
    chats[chat_count]={reqs:[],ress:[]}


    // flag for active chat
    active_chat=chat_count;
    req_count[chat_count]=-1;

   
}



function save_history(chat_no){

const h=`
                    <div class="history_list"  style="width:100%; display:flex;"> <div style="width:80%"  onclick="chat_on(`+chat_no+`)">chat `+chat_no+`</div>  <span class="history_option_btn" style="width:20%;visibility:hidden;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-ellipsis-icon lucide-circle-ellipsis"><circle cx="12" cy="12" r="10"/><path d="M17 12h.01"/><path d="M12 12h.01"/><path d="M7 12h.01"/><title>option</title></svg></span>
                        </div>
                                        `
 // for showing  chat in history bar
 history_list_bar.innerHTML=h+history_list_bar.innerHTML;
 


}

function chat_on(chat_no){
    chat_page.innerHTML="";
    cammand_input.value="";
    active_chat=chat_no;

for(let i=0;i<chats[chat_no].reqs.length;i++){

    req1=chats[active_chat].reqs[i];
    res1=chats[active_chat].ress[i];
    chat_page.innerHTML+=req1+res1;
    
}



}


function send(){



    const req_input=cammand_input.value;
    cammand_input.value="";    // to clean the input area

req_count[active_chat]++;           // increase the response count


// to create the  chat display
const _req=req_show(req_input,active_chat,req_count);                    // to get the request html div
//const _res=res_show(get_response(req_input),active_chat,req_count);             // get response will return the response string,  to get the response html div

const _res=res_show("how can i help you",active_chat,req_count);             // get response will return the response string,  to get the response html div


// storing the request and response in the chat history
chats[active_chat].reqs.push(_req);             // to add the request to the chats list
chats[active_chat].ress.push(_res);             // to add the response in chats list

save_chats();                                   // to save the chats in local storage 

if(req_count[active_chat]==0)save_history(active_chat);     // to add the chat in history bar

chat_page.innerHTML+=_req+_res;             // for displaying the chat in chat page

}




function req_show(req_,chat_no,r_no){

const r=`

<div class="req">

                    <div class="req_cammand">
                        
                        <!-- for your cammand displaying -->
                        `+req_+`

                    </div>
                    <div class="req_option">

                        <!--  edit btn-->
                        <span> <svg onclick="edit_req(`+chat_no+`,`+r_no+`)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil">
                                <path
                                    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                <path d="m15 5 4 4" />
                                <title>edit</title>
                            </svg></span>

                            <!--  copy btn -->
                        <span><svg onclick="copy_req(`+chat_no+`,`+r_no+`)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                <title>copy</title>
                            </svg></span>
                    </div>

                </div>


`
return r;



}


function res_show(res_,chat_no,r_no){


    const r=`
   <div class="res">

                <div class="res_output ch`+chat_count+`">
                 
                    <!-- for ai  response displaying  -->
                    `+res_+`
                </div>

                <div class="res_option">

                    <!--  copy btn -->
                    <span><svg onclick="copy_res(`+chat_no+`,`+r_no+`)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-copy-icon lucide-copy">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            <title>copy</title>
                        </svg></span>

                        <!--  like btn -->
                    <span><svg onclick="like_res(`+chat_no+`,`+r_no+`)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-thumbs-up-icon lucide-thumbs-up">
                            <path d="M7 10v12" />
                            <path
                                d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                     <title>like</title>
                                </svg></span>

                        <!-- dislike btn -->
                    <span><svg onclick="dislike_res(`+chat_no+`,`+r_no+`)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-thumbs-down-icon lucide-thumbs-down">
                            <path d="M17 14V2" />
                            <path
                                d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                       <title>dislike</title>
                                </svg></span>


                        <!-- regenerate btn -->
                    <span><svg onclick="regenrate_res(`+chat_no+`,`+r_no+`)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-refresh-ccw-dot-icon lucide-refresh-ccw-dot">
                            <path d="M3 2v6h6" />
                            <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
                            <path d="M21 22v-6h-6" />
                            <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
                            <circle cx="12" cy="12" r="1" />
                        <title>regenerate</title>
                            </svg></span>

                </div>

            </div>
    `


return r;

}






function edit_req(chat_no,r_no){
    

}

function copy_req(chat_no,r_no){
    
}


function copy_res(chat_no,r_no){
    
}
function like_res(chat_no,r_no){
    
}

function dislike_res(chat_no,r_no){
    
}

function regenrate_res(chat_no,r_no){



}
