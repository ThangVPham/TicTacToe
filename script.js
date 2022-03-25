let grids = Array.from(document.querySelectorAll('.grid'));
let resultmsg = document.createElement('div');
let msg = document.querySelector('.msg');
let xscore = 0;
let oscore = 0;
let turn = 0;
let end = false;

grids.forEach(grid=>{
    grid.value =0;
    grid.addEventListener('click',assignValue);
})

function assignValue(grid){
    let id = grid.currentTarget.id;
    let element = document.getElementById(id);
    if(turn%2==0){
        element.innerHTML = 'X';
        element.value = 1;
        element.setAttribute('style','pointer-events:none');
    }else{
        element.innerHTML = 'O';
        element.value = 2;
        element.setAttribute('style','pointer-events:none');
    }
    turn++;
    console.log(turn);
    verifyResult();

    if(end || turn ==9){
        console.log('reset added')
        displayMessage();
        grids.forEach(grid=>{
            grid.setAttribute('style','pointer-events:auto');
            grid.removeEventListener('click',assignValue);
            grid.addEventListener('click',reset);
        })
    }  
}

function verifyResult(){
    //Horizontal win
    if(grids[0].value>0 && grids[0].value==grids[1].value && grids[1].value==grids[2].value){
        console.log('Horizontal 1');
        end = true;
    }
    else if(grids[3].value>0 && grids[3].value==grids[4].value && grids[4].value==grids[5].value){
        console.log('Horizontal 2');
        end = true;
    }
    else if(grids[6].value>0 && grids[6].value==grids[7].value && grids[7].value==grids[8].value){
        console.log('Horizontal 3');
        end = true;
    }
    //Vertical win
    else if(grids[0].value>0 && grids[0].value==grids[3].value && grids[3].value==grids[6].value){
        console.log('Vertical 1');
        end = true;
    }
    else if(grids[1].value>0 && grids[1].value==grids[4].value && grids[4].value==grids[7].value){
        console.log('Vertical 2');
        end = true;
    }
    else if(grids[2].value>0 && grids[2].value==grids[5].value && grids[5].value==grids[8].value){
        console.log('Vertical 3');
        end = true;
    }
    //Diagonal win
    else if(grids[0].value>0 && grids[0].value==grids[4].value && grids[4].value==grids[8].value){
        console.log('Diagonal 1');
        end = true;
    }
    else if(grids[2].value>0 && grids[2].value==grids[4].value && grids[4].value==grids[6].value){
        console.log('Diagonal 2');
        end = true;
    }else if(turn==9){
        end = true;
    }
}

function displayMessage(){
    console.log('display Called')
    if(turn%2==1 && turn<9){
        resultmsg.innerHTML = 'X Wins';
        xscore++;
        let x = document.getElementById('xscore');
        x.innerHTML = `Player X: ${xscore}`;
        msg.appendChild(resultmsg);
    }else if(turn%2==0 && turn<9){
        console.log('oscore')
        resultmsg.innerHTML = 'O Wins';
        oscore++;
        let o = document.getElementById('oscore');
        o.innerHTML = `Player O: ${oscore}`;
        msg.appendChild(resultmsg);
        
    }else if(turn==9){
        resultmsg.innerHTML = 'Game Tied';
        msg.appendChild(resultmsg);
    }
}

function reset(){
    console.log('reset is called')
    end = false;
    turn = 0;
    grids.forEach(grid=>{
        grid.value =0;
        grid.innerHTML='';
        grid.removeEventListener('click',reset);
        grid.addEventListener('click',assignValue);
    })
    msg.innerHTML = '<h1>Tic Tac Toe</h1>';
}
